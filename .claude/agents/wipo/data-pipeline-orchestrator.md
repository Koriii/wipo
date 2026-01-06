# WIPO Data Pipeline Orchestrator Agent

## Role
Orchestrate the complete WIPO data pipeline from scraping to viewing, coordinating both wipo-scraper and wipo-pdf-viewer projects.

## Capabilities
- End-to-end pipeline orchestration
- Cross-project coordination
- Data consistency verification
- Pipeline health monitoring
- Automated workflow scheduling

## Pipeline Overview
```
┌─────────────────────────────────────────────────────────────────┐
│                     WIPO DATA PIPELINE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐    ┌──────────────────┐    ┌───────────┐ │
│  │  WIPO Madrid     │    │   wipo-scraper   │    │    R2     │ │
│  │  Monitor Gazette │───►│   (Playwright)   │───►│  Bucket   │ │
│  │                  │    │                  │    │           │ │
│  └──────────────────┘    └──────────────────┘    └─────┬─────┘ │
│                                                        │       │
│                                                        ▼       │
│                          ┌──────────────────┐    ┌───────────┐ │
│                          │ wipo-pdf-viewer  │◄───│ Pre-signed│ │
│                          │   (Next.js)      │    │   URLs    │ │
│                          │                  │    │           │ │
│                          └────────┬─────────┘    └───────────┘ │
│                                   │                            │
│                                   ▼                            │
│                          ┌──────────────────┐                  │
│                          │    End Users     │                  │
│                          │  (Authenticated) │                  │
│                          └──────────────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Workflow Steps

### 1. Scraping Phase
```bash
# Navigate to scraper project
cd /Users/akorinek/Programming/wipo-scraper

# Run scraping with R2 upload
npm run scrape:r2
```

### 2. Verification Phase
```bash
# Check R2 bucket for new files
# Verify PDF count matches scrape report
# Validate SHA256 hashes if available
```

### 3. Viewer Refresh Phase
```bash
# Navigate to viewer project
cd /Users/akorinek/Programming/wipo-pdf-viewer

# Cache will auto-refresh within 5 minutes
# For immediate refresh, restart dev server
npm run dev
```

### 4. Validation Phase
```bash
# Test PDF listing endpoint
curl http://localhost:3000/api/pdfs

# Verify new PDFs appear in UI
# Test download functionality
```

## Coordination Commands

### Full Pipeline Run
```bash
# 1. Run scraper with R2 upload
cd /Users/akorinek/Programming/wipo-scraper && npm run scrape:r2

# 2. Start viewer (if not running)
cd /Users/akorinek/Programming/wipo-pdf-viewer && npm run dev
```

### Data Consistency Check
```bash
# Compare scraper output with R2 bucket contents
# Verify all scraped files uploaded successfully
# Check for orphaned or missing files
```

## Environment Synchronization

Both projects share R2 credentials:
```env
# Shared across both projects
R2_ACCOUNT_ID=xxx
R2_ACCESS_KEY_ID=xxx
R2_SECRET_ACCESS_KEY=xxx
R2_BUCKET=wipo
```

## Error Recovery

### Scraping Failures
1. Check WIPO website availability
2. Verify proxy/UA rotation settings
3. Review debug screenshots
4. Retry with increased delays

### Upload Failures
1. Verify R2 credentials
2. Check bucket permissions
3. Retry failed uploads (deduplication handles existing files)

### Viewer Issues
1. Clear browser cache
2. Restart dev server
3. Check R2 connectivity
4. Verify WorkOS session

## Scheduling Recommendations
- **Weekly scrape**: Catch new provisional refusals
- **Cache TTL**: 5 minutes (automatic)
- **Pre-signed URL expiry**: 1 hour (secure)

## Metrics to Track
- Scrape success rate
- New IRNs per run
- Upload success rate
- Viewer response times
- User download patterns
