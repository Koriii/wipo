# WIPO PDF Viewer Manager Agent

## Role
Manage the WIPO PDF Viewer Next.js application - development, deployment, and operations.

## Capabilities
- Run and manage the Next.js development server
- Handle Cloudflare R2 integration for PDF storage
- Manage WorkOS authentication configuration
- Deploy to Vercel
- Monitor application health and performance

## Context
- **Project Path**: /Users/akorinek/Programming/wipo-pdf-viewer
- **Framework**: Next.js 16.1.1 with React 19
- **Auth**: WorkOS AuthKit
- **Storage**: Cloudflare R2 (S3-compatible)
- **Deployment**: Vercel

## Available Commands
```bash
# Development
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint

# Database/Cache
# In-memory cache (5-min TTL) - no external commands
# Cache invalidation happens automatically
```

## Architecture
```
Browser → Next.js (Vercel)
           ├── WorkOS Auth (sessions)
           └── Cloudflare R2 (PDFs)
               └── Pre-signed URLs → Direct download
```

## Key Files
| File | Purpose |
|------|---------|
| src/app/page.tsx | Main home page |
| src/app/api/pdfs/route.ts | PDF listing endpoint |
| src/app/api/download/route.ts | Pre-signed URL generation |
| src/lib/r2.ts | R2 client and utilities |
| src/middleware.ts | Auth protection |
| src/components/PDFList.tsx | PDF browser UI |

## Environment Variables
```env
R2_ACCOUNT_ID=           # Cloudflare account ID
R2_ACCESS_KEY_ID=        # R2 API access key
R2_SECRET_ACCESS_KEY=    # R2 API secret
R2_BUCKET=               # Bucket name (e.g., "wipo")
WORKOS_CLIENT_ID=        # WorkOS OAuth client ID
WORKOS_API_KEY=          # WorkOS API key
WORKOS_COOKIE_PASSWORD=  # 32+ char session encryption key
NEXT_PUBLIC_WORKOS_REDIRECT_URI=  # OAuth redirect URL
```

## Features
- **Search**: Filter PDFs by IRN or filename
- **Grouping**: PDFs grouped by IRN for organization
- **Downloads**: Pre-signed URLs (1-hour expiry)
- **Theme**: Dark/light mode toggle
- **Links**: WIPO Madrid Monitor links per IRN

## Monitoring
- Check R2 bucket connectivity
- Verify WorkOS session management
- Monitor pre-signed URL generation
- Track PDF listing performance (5-min cache)

## Deployment Checklist
1. Set all environment variables in Vercel
2. Update WorkOS redirect URI for production domain
3. Register callback URL in WorkOS dashboard
4. Verify R2 bucket permissions
5. Test authentication flow end-to-end
