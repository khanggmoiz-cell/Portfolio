# Admin Panel Implementation Plan

## Approach: Vercel Blob (user selected)

## Files to Create (4 files)

### 1. `lib/vercelBlob.ts`
Helper to read/write `projects.json` from Vercel Blob storage.
- `getProjectsBlob<T>()` - fetch and parse blob
- `saveProjectsBlob<T>(data)` - stringify and upload blob
- `deleteProjectsBlob()` - remove blob

### 2. `app/api/upload/route.ts`
POST endpoint for file uploads (images + MP4) to Vercel Blob.
- Accepts `multipart/form-data` with `file` field
- Validates extension (jpg, jpeg, png, gif, webp, mp4, svg)
- Size limits: 10MB images, 100MB MP4
- Saves with timestamp prefix to avoid collisions
- Returns `{ url: "/uploads/filename.ext" }`

## Files to Modify (6 files)

### 3. `data/projects.json`
Migrate to new schema with all new fields:
- `title`, `description`, `projectType`, `mediaSource`
- `imageCount`, `images[]`, `youtubeUrl`, `mp4Url`
- `liveUrl`, `facebookUrl`, `instagramUrl`, `tiktokUrl`, `linkedinUrl`, `googleBusinessUrl`

### 4. `app/api/projects/route.ts`
- GET: Try Vercel Blob first, fallback to static JSON
- POST: Save new project to Vercel Blob, accept all new fields

### 5. `app/api/projects/[id]/route.ts`
- PUT: Update project in Vercel Blob
- DELETE: Remove project from Vercel Blob

### 6. `app/api/auth/route.ts`
- No changes needed (already works)

### 7. `components/AdminPanel.tsx` (MAJOR REWRITE)
Complete rebuild with 3-card form structure:

**Card 1: Project Details**
- Title input, Description textarea, Project Type toggle (Live Website | Media/Design)

**Card 2: Media Source** (3 tabs)
- Images: count selector (1/2/3) → URL input + Upload + Preview per image
- YouTube: URL input → auto-embed preview
- MP4: Drag & drop upload zone

**Card 3: Links & Social**
- Live URL with Preview button
- Facebook, Instagram, TikTok, LinkedIn, Google Business inputs with lucide icons

**Save & Publish button** at bottom

### 8. `components/ProjectsSection.tsx`
- Adapt card layout to handle `images[]`, `youtubeUrl`, `mp4Url`
- Show description, projectType badge
- YouTube: render iframe
- MP4: render video player
- Images: dynamic 1-3 image layout

### 9. `.env.local.example`
Add `BLOB_READ_WRITE_TOKEN=`

## Deploy Commands
```bash
git add .
git commit -m "admin panel with vercel blob storage"
git push
```
