import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export interface PDFFile {
  key: string;
  name: string;
  size: number;
  lastModified: Date;
  irn: string;
  page: string;
}

// Singleton R2 client
let r2Client: S3Client | null = null;

// In-memory cache for PDF list
interface CacheEntry {
  files: PDFFile[];
  timestamp: number;
}

let pdfCache: CacheEntry | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function isCacheValid(): boolean {
  if (!pdfCache) return false;
  return Date.now() - pdfCache.timestamp < CACHE_TTL_MS;
}

function getR2Client(): S3Client {
  if (!r2Client) {
    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

    if (!accountId || !accessKeyId || !secretAccessKey) {
      throw new Error("R2 credentials not configured");
    }

    r2Client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }
  return r2Client;
}

/**
 * Parse PDF filename to extract metadata
 * Format: {IRN}__p{page}__{docId}.pdf or {IRN}__p{page}__{docId}__{suffix}.pdf
 */
function parsePDFFileName(key: string): { irn: string; page: string } | null {
  const fileName = key.split("/").pop() || key;
  const match = fileName.match(/^(\d+)__p(\d+)__/);
  if (match) {
    return { irn: match[1], page: match[2] };
  }
  return null;
}

/**
 * Fetch all PDF files from R2 (internal, uncached)
 */
async function fetchPDFsFromR2(): Promise<PDFFile[]> {
  const client = getR2Client();
  const bucket = process.env.R2_BUCKET;

  if (!bucket) {
    throw new Error("R2_BUCKET not configured");
  }

  const files: PDFFile[] = [];
  let continuationToken: string | undefined;

  do {
    const response = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        ContinuationToken: continuationToken,
        MaxKeys: 1000,
      })
    );

    for (const obj of response.Contents || []) {
      if (!obj.Key || !obj.Key.endsWith(".pdf")) continue;

      const parsed = parsePDFFileName(obj.Key);
      if (!parsed) continue;

      files.push({
        key: obj.Key,
        name: obj.Key.split("/").pop() || obj.Key,
        size: obj.Size || 0,
        lastModified: obj.LastModified || new Date(),
        irn: parsed.irn,
        page: parsed.page,
      });
    }

    continuationToken = response.IsTruncated
      ? response.NextContinuationToken
      : undefined;
  } while (continuationToken);

  // Sort by IRN and page number
  files.sort((a, b) => {
    const irnCompare = a.irn.localeCompare(b.irn);
    if (irnCompare !== 0) return irnCompare;
    return parseInt(a.page) - parseInt(b.page);
  });

  return files;
}

/**
 * List PDF files with caching (5 min TTL)
 * Search filtering is done in-memory on cached data
 */
export async function listPDFs(options?: {
  search?: string;
}): Promise<PDFFile[]> {
  // Return cached data if valid
  if (!isCacheValid()) {
    const files = await fetchPDFsFromR2();
    pdfCache = { files, timestamp: Date.now() };
    console.log(`[R2] Fetched ${files.length} PDFs from R2, cached for 5 min`);
  } else {
    console.log(`[R2] Using cached data (${pdfCache!.files.length} PDFs)`);
  }

  let files = pdfCache!.files;

  // Apply search filter in-memory (no R2 call needed)
  if (options?.search) {
    const searchLower = options.search.toLowerCase();
    files = files.filter(
      (f) =>
        f.key.toLowerCase().includes(searchLower) ||
        f.irn.includes(searchLower)
    );
  }

  return files;
}

/**
 * Invalidate the PDF cache (call after uploads)
 */
export function invalidatePDFCache(): void {
  pdfCache = null;
  console.log("[R2] Cache invalidated");
}

/**
 * Generate a pre-signed URL for downloading a PDF
 */
export async function getSignedDownloadUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const client = getR2Client();
  const bucket = process.env.R2_BUCKET;

  if (!bucket) {
    throw new Error("R2_BUCKET not configured");
  }

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return getSignedUrl(client, command, { expiresIn });
}

/**
 * Get unique IRNs from the bucket
 */
export async function getUniqueIRNs(): Promise<string[]> {
  const files = await listPDFs();
  const irns = new Set(files.map((f) => f.irn));
  return Array.from(irns).sort();
}
