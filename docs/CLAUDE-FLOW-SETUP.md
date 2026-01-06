# Claude-Flow Setup for WIPO Projects

This document describes the claude-flow configuration for the WIPO data pipeline, which includes:
- **wipo-scraper**: Playwright-based scraper for WIPO Madrid Monitor documents
- **wipo-pdf-viewer**: Next.js application for viewing scraped PDFs

## Overview

Claude-flow provides multi-agent orchestration capabilities that can coordinate complex workflows across both projects.

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

## Quick Start

### 1. Initialize Claude-Flow (Already Done)

```bash
cd /Users/akorinek/Programming/wipo-pdf-viewer
npx claude-flow@alpha init --force
```

### 2. Add MCP Servers to Claude Code

```bash
claude mcp add claude-flow npx claude-flow@alpha mcp start
```

### 3. Run WIPO Pipeline

Using natural language with Claude:
- "Run the WIPO pipeline"
- "Scrape new WIPO documents"
- "Check WIPO data status"

Or using CLI:
```bash
# Run scraper with R2 upload
cd /Users/akorinek/Programming/wipo-scraper && npm run scrape:r2

# Start viewer
cd /Users/akorinek/Programming/wipo-pdf-viewer && npm run dev
```

## Configuration Files

### Custom WIPO Agents

| Agent | Location | Purpose |
|-------|----------|---------|
| `wipo/scraper-coordinator` | `.claude/agents/wipo/scraper-coordinator.md` | Manages scraping operations |
| `wipo/viewer-manager` | `.claude/agents/wipo/viewer-manager.md` | Manages Next.js application |
| `wipo/data-pipeline-orchestrator` | `.claude/agents/wipo/data-pipeline-orchestrator.md` | Coordinates full pipeline |

### Workflow Configuration

- **Pipeline Definition**: `.claude/workflows/wipo-pipeline.json`
- **WIPO Skill**: `.claude/skills/wipo-pipeline.md`

### Hive-Mind Workers

| Worker | Location | Purpose |
|--------|----------|---------|
| `wipo-scraper-worker` | `.hive-mind/workers/wipo-scraper-worker.json` | Scraping task execution |
| `wipo-viewer-worker` | `.hive-mind/workers/wipo-viewer-worker.json` | Viewer management |

## Available Commands

### Swarm Operations
```bash
# Start a swarm for WIPO operations
npx claude-flow@alpha swarm "scrape WIPO documents and update viewer" --claude

# Use hive-mind coordination
npx claude-flow@alpha hive-mind spawn "update WIPO pipeline" --claude
```

### Memory Operations
```bash
# Store context in memory
npx claude-flow@alpha memory store "wipo/last-scrape" "2026-01-06"

# Retrieve from memory
npx claude-flow@alpha memory retrieve "wipo"

# Search memory
npx claude-flow@alpha memory search "wipo"
```

### Hooks
```bash
# Pre-task hook
npx claude-flow@alpha hooks pre-task --description "scrape WIPO documents"

# Post-task hook
npx claude-flow@alpha hooks post-task --task-id "wipo-scrape-001"
```

## Project Paths

| Project | Path | Purpose |
|---------|------|---------|
| wipo-scraper | `/Users/akorinek/Programming/wipo-scraper` | PDF scraping |
| wipo-pdf-viewer | `/Users/akorinek/Programming/wipo-pdf-viewer` | PDF viewing |

## Environment Variables

Both projects share R2 credentials:

```env
# Shared (R2 Storage)
R2_ACCOUNT_ID=xxx
R2_ACCESS_KEY_ID=xxx
R2_SECRET_ACCESS_KEY=xxx
R2_BUCKET=wipo

# Viewer Only (Authentication)
WORKOS_CLIENT_ID=xxx
WORKOS_API_KEY=xxx
WORKOS_COOKIE_PASSWORD=xxx
NEXT_PUBLIC_WORKOS_REDIRECT_URI=xxx

# Scraper Only (Optional - Google Drive)
GOOGLE_ACCESS_TOKEN=xxx
GOOGLE_REFRESH_TOKEN=xxx
GOOGLE_FOLDER_ID=xxx
```

## Using Claude-Flow with WIPO

### Example: Full Pipeline Run

```
User: "Run the complete WIPO pipeline to scrape new documents"

Claude will:
1. Navigate to wipo-scraper directory
2. Execute npm run scrape:r2
3. Monitor progress and handle errors
4. Verify uploads to R2
5. Test viewer accessibility
6. Report results
```

### Example: Parallel Agent Execution

```javascript
// Claude Code Task tool spawns agents concurrently
Task("Scraper Agent", "Run WIPO scraper with R2 upload, max 50 IRNs", "wipo/scraper-coordinator")
Task("Viewer Agent", "Build and validate viewer", "wipo/viewer-manager")
Task("Monitor Agent", "Track progress and report metrics", "wipo/data-pipeline-orchestrator")
```

### Example: Swarm Coordination

```bash
# Initialize mesh swarm for WIPO operations
npx claude-flow@alpha swarm "coordinate WIPO scraping across 3 agents" --topology mesh --claude
```

## Troubleshooting

### Scraper Issues

1. **Website not loading**: Check proxy settings, increase delays
2. **PDFs not downloading**: Verify popup handling, check selectors
3. **Upload failures**: Verify R2 credentials, check bucket permissions

### Viewer Issues

1. **PDFs not appearing**: Wait for 5-min cache TTL or restart dev server
2. **Auth errors**: Check WorkOS configuration
3. **Download failures**: Verify pre-signed URL generation

### Claude-Flow Issues

1. **MCP not connecting**: Run `claude mcp list` to verify servers
2. **Hooks not firing**: Check `.claude/settings.json` permissions
3. **Memory errors**: Initialize with `npx claude-flow@alpha memory init`

## File Structure

```
wipo-pdf-viewer/
├── .claude/
│   ├── agents/
│   │   └── wipo/
│   │       ├── scraper-coordinator.md
│   │       ├── viewer-manager.md
│   │       └── data-pipeline-orchestrator.md
│   ├── commands/
│   ├── skills/
│   │   └── wipo-pipeline.md
│   ├── workflows/
│   │   └── wipo-pipeline.json
│   └── settings.json
├── .hive-mind/
│   └── workers/
│       ├── wipo-scraper-worker.json
│       └── wipo-viewer-worker.json
├── .mcp.json
├── CLAUDE.md
└── docs/
    └── CLAUDE-FLOW-SETUP.md
```

## Additional Resources

- [Claude-Flow Documentation](https://github.com/ruvnet/claude-flow)
- [wipo-scraper README](/Users/akorinek/Programming/wipo-scraper/README.md)
- [wipo-pdf-viewer README](/Users/akorinek/Programming/wipo-pdf-viewer/README.md)
