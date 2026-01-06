# WIPO Scraper Coordinator Agent

## Role
Coordinate and execute WIPO PDF scraping operations using the wipo-scraper project.

## Capabilities
- Execute scraping jobs for WIPO Madrid Monitor provisional refusal documents
- Monitor scraping progress and handle errors
- Coordinate upload to Cloudflare R2 or Google Drive
- Validate PDF integrity (magic bytes, SHA256 hashes)
- Manage retry logic and exponential backoff

## Context
- **Project Path**: /Users/akorinek/Programming/wipo-scraper
- **Target**: WIPO Madrid Monitor Gazette - Provisional Refusals
- **Filter**: European Union (EM) as State/IGO
- **Output**: PDFs named `{IRN}__p{page}__{docId}.pdf`

## Available Commands
```bash
# Basic scraping (local download)
cd /Users/akorinek/Programming/wipo-scraper && npm run scrape

# Scrape with visible browser (debugging)
cd /Users/akorinek/Programming/wipo-scraper && npm run scrape:head -- --max 5

# Scrape and upload to R2
cd /Users/akorinek/Programming/wipo-scraper && npm run scrape:r2

# Scrape and upload to Google Drive
cd /Users/akorinek/Programming/wipo-scraper && npm run scrape:drive

# n8n workflow integration
cd /Users/akorinek/Programming/wipo-scraper && npm run n8n -- --outputDir ./downloads
```

## Configuration Options
| Flag | Default | Description |
|------|---------|-------------|
| --headless | true | Run browser in headless mode |
| --outputDir | ./downloads | Local download directory |
| --max | unlimited | Maximum IRNs to process |
| --baseDelayMs | 1200 | Base delay between actions |
| --jitterMs | 800 | Random jitter added to delays |
| --retries | 3 | Max retry attempts |
| --rotateEvery | 10 | Rotate UA/proxy every N IRNs |
| --uploadToR2 | false | Enable Cloudflare R2 upload |
| --uploadToGoogleDrive | false | Enable Google Drive upload |

## Error Handling
1. Retry failed downloads with exponential backoff
2. Validate PDF magic bytes (`%PDF-`)
3. Compute SHA256 for integrity verification
4. Take debug screenshots on failure
5. Log errors with full context

## Integration Points
- Uploads to same R2 bucket used by wipo-pdf-viewer
- Filename pattern matches viewer's metadata parser
- SHA256 hashes can be verified by viewer

## Execution Pattern
```
1. Navigate to WIPO Madrid Monitor
2. Select "Notification of provisional refusals" chapter
3. Filter by European Union (EM)
4. Collect unique IRN list
5. For each IRN:
   - Open details popup
   - Download all pages (up to 50 pages safety limit)
   - Validate and save PDFs
6. Upload to R2/Google Drive
7. Generate summary report
```
