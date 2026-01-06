# WIPO Pipeline Skill

## Description
Manage the complete WIPO data pipeline - from scraping WIPO Madrid Monitor provisional refusals to serving them through the PDF viewer.

## Activation
Activate this skill by saying:
- "Run the WIPO pipeline"
- "Scrape new WIPO documents"
- "Update WIPO PDFs"
- "Check WIPO data status"

## Capabilities

### Full Pipeline Execution
Run the complete pipeline: scrape, upload, and validate.

```bash
# From viewer project root
cd /Users/akorinek/Programming/wipo-scraper && npm run scrape:r2 -- --max 50
```

### Scraping Only
Just scrape without uploading (local storage):

```bash
cd /Users/akorinek/Programming/wipo-scraper && npm run scrape -- --max 10
```

### Check Viewer Status
Verify the viewer is working:

```bash
cd /Users/akorinek/Programming/wipo-pdf-viewer && npm run build
```

### Development Mode
Run both projects in development:

```bash
# Terminal 1: Viewer
cd /Users/akorinek/Programming/wipo-pdf-viewer && npm run dev

# Terminal 2: Scraper (when needed)
cd /Users/akorinek/Programming/wipo-scraper && npm run scrape:head -- --max 5
```

## Project Locations
- **Scraper**: `/Users/akorinek/Programming/wipo-scraper`
- **Viewer**: `/Users/akorinek/Programming/wipo-pdf-viewer`

## Common Tasks

### Add New IRNs
1. Run scraper to fetch latest documents
2. PDFs automatically upload to R2
3. Viewer cache refreshes within 5 minutes

### Debug Scraping Issues
1. Run with `--headless false` to see browser
2. Check screenshots in downloads folder
3. Review logs for error details

### Update Viewer Code
1. Make changes in `src/` directory
2. Run `npm run dev` for hot reload
3. Test PDF listing and downloads
4. Build with `npm run build`

## Environment Requirements

### Scraper
```env
R2_ACCOUNT_ID=xxx
R2_ACCESS_KEY_ID=xxx
R2_SECRET_ACCESS_KEY=xxx
R2_BUCKET=wipo
```

### Viewer
```env
R2_ACCOUNT_ID=xxx
R2_ACCESS_KEY_ID=xxx
R2_SECRET_ACCESS_KEY=xxx
R2_BUCKET=wipo
WORKOS_CLIENT_ID=xxx
WORKOS_API_KEY=xxx
WORKOS_COOKIE_PASSWORD=xxx
NEXT_PUBLIC_WORKOS_REDIRECT_URI=xxx
```

## Workflow Agents
- `wipo/scraper-coordinator` - Manages scraping operations
- `wipo/viewer-manager` - Manages Next.js application
- `wipo/data-pipeline-orchestrator` - Coordinates full pipeline

## Related Commands
- `/swarm "scrape WIPO documents"` - Spawn swarm for scraping
- `/hive-mind "update WIPO pipeline"` - Use hive-mind coordination
- `/memory search "wipo"` - Search memory for WIPO context
