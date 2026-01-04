# WIPO PDF Viewer

A Next.js application for viewing and downloading WIPO provisional refusal PDFs stored in Cloudflare R2.

## Features

- **Authentication**: WorkOS AuthKit for secure access
- **PDF Listing**: Browse PDFs grouped by IRN (International Registration Number)
- **Search**: Filter PDFs by IRN or filename
- **Direct Downloads**: Pre-signed URLs for efficient downloads directly from R2
- **Zero Egress Costs**: PDFs served directly from Cloudflare R2 (free egress)

## Setup

### 1. Clone and Install

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

#### Cloudflare R2

Get your R2 credentials from the [Cloudflare Dashboard](https://dash.cloudflare.com):
- Go to R2 Object Storage → Manage R2 API Tokens
- Create a token with Object Read permissions

```env
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET=wipo
```

#### WorkOS AuthKit

Get your WorkOS credentials from the [WorkOS Dashboard](https://dashboard.workos.com):
1. Create a new project
2. Enable AuthKit
3. Add your redirect URI: `http://localhost:3000/api/auth/callback` (dev) or your production URL

```env
WORKOS_CLIENT_ID=client_xxx
WORKOS_API_KEY=sk_xxx
WORKOS_COOKIE_PASSWORD=a_32_character_or_longer_random_string
NEXT_PUBLIC_WORKOS_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Update `NEXT_PUBLIC_WORKOS_REDIRECT_URI` to your production URL

```
NEXT_PUBLIC_WORKOS_REDIRECT_URI=https://your-app.vercel.app/api/auth/callback
```

5. Add the callback URL to WorkOS dashboard

## Architecture

```
┌──────────┐   1. List files    ┌──────────┐
│  Vercel  │◀──────────────────▶│    R2    │
│ (Next.js)│   (metadata only)  │  (PDFs)  │
└────┬─────┘                    └─────▲────┘
     │                                │
     │ 2. Signed URL                  │ 3. Direct download
     ▼                                │
┌──────────┐──────────────────────────┘
│  Browser │
└──────────┘
```

- **Vercel**: Hosts the Next.js app, handles auth, generates signed URLs
- **R2**: Stores and serves PDFs directly to users (no bandwidth through Vercel)

## Tech Stack

- [Next.js 14+](https://nextjs.org/) - React framework
- [WorkOS AuthKit](https://workos.com/docs/user-management) - Authentication
- [Cloudflare R2](https://developers.cloudflare.com/r2/) - Object storage
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Deployment
