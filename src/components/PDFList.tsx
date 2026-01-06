"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Search,
  X,
  FileText,
  FolderOpen,
  Download,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface PDFFile {
  key: string;
  irn: string;
  page: string;
  name: string;
  size: number;
  lastModified: Date;
}

interface PDFListProps {
  initialFiles: PDFFile[];
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PDFList({ initialFiles }: PDFListProps) {
  const [search, setSearch] = useState("");
  const [downloading, setDownloading] = useState<string | null>(null);

  const filteredFiles = useMemo(() => {
    if (!search.trim()) return initialFiles;

    const searchLower = search.toLowerCase();
    return initialFiles.filter(
      (f) =>
        f.key.toLowerCase().includes(searchLower) ||
        f.irn.includes(searchLower) ||
        f.name.toLowerCase().includes(searchLower)
    );
  }, [initialFiles, search]);

  const filesByIRN = useMemo(() => {
    return filteredFiles.reduce(
      (acc, file) => {
        if (!acc[file.irn]) {
          acc[file.irn] = [];
        }
        acc[file.irn].push(file);
        return acc;
      },
      {} as Record<string, PDFFile[]>
    );
  }, [filteredFiles]);

  const handleDownload = async (file: PDFFile) => {
    setDownloading(file.key);
    try {
      const res = await fetch(
        `/api/download?key=${encodeURIComponent(file.key)}`
      );
      const data = await res.json();
      if (data.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(null);
    }
  };

  const irnCount = Object.keys(filesByIRN).length;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by IRN or filename..."
          className="h-12 pl-11 pr-10"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="gap-2">
            <FileText className="h-4 w-4" />
            {filteredFiles.length} PDFs
          </Badge>
          <Badge variant="outline" className="gap-2">
            <FolderOpen className="h-4 w-4" />
            {irnCount} IRNs
          </Badge>
        </div>
        {search && (
          <span className="text-sm text-muted-foreground">
            Filtered from {initialFiles.length} total
          </span>
        )}
      </div>

      {/* Empty State */}
      {irnCount === 0 ? (
        <div className="py-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-1 text-lg font-medium text-foreground">
            No PDFs found
          </h3>
          <p className="text-muted-foreground">
            {search
              ? "Try adjusting your search terms"
              : "No documents have been uploaded yet"}
          </p>
        </div>
      ) : (
        /* File List */
        <div className="space-y-4">
          {Object.entries(filesByIRN).map(([irn, irnFiles]) => (
            <Card key={irn}>
              <CardHeader className="bg-muted/50 px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <span className="text-sm font-bold text-primary">IR</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        IRN {irn}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {irnFiles.length}{" "}
                        {irnFiles.length === 1 ? "document" : "documents"}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://www3.wipo.int/madrid/monitor/en/showData.jsp?ID=ROM.${irn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    View on WIPO
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {irnFiles.map((file) => (
                    <div
                      key={file.key}
                      className="group flex items-center justify-between px-5 py-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                          <FileText className="h-5 w-5 text-destructive" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-foreground">
                            Page {parseInt(file.page) + 1}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {formatFileSize(file.size)} ·{" "}
                            {formatDate(file.lastModified)}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDownload(file)}
                        disabled={downloading === file.key}
                        variant="secondary"
                        size="sm"
                        className="ml-4"
                      >
                        {downloading === file.key ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
