# Admin Panel Rewrite Plan

## Overview
Migrate the portfolio admin panel from old schema (name, category, 3 images) to new schema with media tabs (Images/YouTube), social links, and localStorage-based persistence. No Vercel blob, no database, no server-side writes.

---

## Step 1: Migrate `data/projects.json` to New Schema

**File:** `data/projects.json`

Replace entire content. New schema per project:
```json
{
  "id": "1",
  "num": "01",
  "title": "Nextlevel Studio",
  "description": "",
  "projectType": "live-website",      // "live-website" | "media-design"
  "mediaSource": "images",            // "images" | "youtube"
  "imageCount": 3,                    // 1 | 2 | 3
  "images": ["url1", "url2", "url3"], // URLs array, length = imageCount
  "youtubeUrl": "",
  "liveUrl": "",
  "facebookUrl": "",
  "instagramUrl": "",
  "tiktokUrl": "",
  "linkedinUrl": "",
  "googleBusinessUrl": ""
}
```

Migration mapping for existing 3 projects:
- `title` ← `name`
- `description` ← `""` (empty)
- `projectType` ← `"live-website"`
- `mediaSource` ← `"images"`
- `imageCount` ← `3`
- `images` ← `[col1img1, col1img2, col2img]`
- All URL fields ← `""` (empty)

---

## Step 2: Simplify `app/api/projects/route.ts`

**File:** `app/api/projects/route.ts`

- **Keep:** `GET` handler (reads `data/projects.json`, returns JSON)
- **Remove:** `POST` handler entirely
- **Remove:** `writeProjects` function (no longer needed)
- Keep `readProjects` helper

---

## Step 3: Delete `app/api/projects/[id]/route.ts`

**File:** `app/api/projects/[id]/route.ts`

Delete the entire file and directory.

---

## Step 4: Rewrite `components/AdminPanel.tsx`

**File:** `components/AdminPanel.tsx`

Complete rewrite. New component structure:

### Interface
```typescript
interface Project {
  id: string
  num: string
  title: string
  description: string
  projectType: "live-website" | "media-design"
  mediaSource: "images" | "youtube"
  imageCount: 1 | 2 | 3
  images: string[]
  youtubeUrl: string
  liveUrl: string
  facebookUrl: string
  instagramUrl: string
  tiktokUrl: string
  linkedinUrl: string
  googleBusinessUrl: string
}
```

### Login Screen
- Same design as current (dark theme, gradient button)
- Credentials: `admin` / `sastadeveloper`
- Uses `/api/auth` POST endpoint
- Stores token in `sessionStorage`

### Dashboard (after login)
- Same header with logout
- Stats cards: Total Projects, Live Website, Media/Design
- Tabs: All Projects | + Add Project

### Card 1 — Project Details
- **Title:** text input
- **Description:** textarea (3 rows)
- **Project Type:** toggle button group [Live Website | Media/Design]

### Card 2 — Media Source (2 tabs)
- **Tab: Images**
  - Count selector: 3 buttons [1] [2] [3]
  - Dynamically show 1/2/3 URL input fields based on count
  - Each input has image preview below it
- **Tab: YouTube**
  - URL input field
  - YouTube embed preview (extract video ID, show iframe)

### Card 3 — Links & Social
- **Live URL:** text input + Preview button (opens in new tab)
- **Facebook:** text input + `Facebook` lucide icon
- **Instagram:** text input + `Instagram` lucide icon
- **TikTok:** text input + `Music` lucide icon (or custom)
- **LinkedIn:** text input + `Linkedin` lucide icon
- **Google Business:** text input + `MapPin` lucide icon

### Save & Publish Button
- On click: generate `id` (timestamp-based), generate `num` (sequential from existing count)
- Save entire projects array to `localStorage` key `"portfolio-projects"`
- Show toast message "Project saved successfully!"
- Toast auto-dismiss after 3 seconds

### Data Flow
- **On mount:** Load from `localStorage("portfolio-projects")`. If empty, fetch from `/api/projects` as seed data, then save to localStorage.
- **On save:** Update `localStorage`. No API call needed.
- **Edit existing:** Load project data into form, on save update the specific index in localStorage array.
- **Delete:** Remove from localStorage array, re-render list.

### Imports Needed
- `lucide-react`: `Facebook`, `Instagram`, `Linkedin`, `MapPin`, `Music`, `ExternalLink`, `X`, `Image`, `Youtube`, `Plus`, `Trash2`

---

## Step 5: Update `components/ProjectsSection.tsx`

**File:** `components/ProjectsSection.tsx`

### Interface Update
```typescript
interface Project {
  id: string
  num: string
  title: string
  description: string
  projectType: "live-website" | "media-design"
  mediaSource: "images" | "youtube"
  imageCount: 1 | 2 | 3
  images: string[]
  youtubeUrl: string
  liveUrl: string
  facebookUrl: string
  instagramUrl: string
  tiktokUrl: string
  linkedinUrl: string
  googleBusinessUrl: string
}
```

### Data Loading
- First try `localStorage("portfolio-projects")`
- If empty/not found, fall back to `/api/projects` fetch
- If both empty, use `fallbackProjects` (migrated versions of current 3)

### Fallback Projects
Update `fallbackProjects` array to use new schema with same images.

### ProjectCard Changes

**Header section:**
- `project.title` instead of `project.name`
- `projectType` badge (styled pill/tag: "Live Website" or "Media/Design")
- `project.description` shown below title (truncated, 1-2 lines)

**Media section (conditional based on `mediaSource`):**

For `mediaSource === "images"`:
- `imageCount` = 1: Single full-width image
- `imageCount` = 2: Two images side by side (50/50)
- `imageCount` = 3: Current layout (40% left column with 2 stacked images, 60% right large image)

For `mediaSource === "youtube"`:
- Extract video ID from `youtubeUrl`
- Render responsive YouTube iframe (16:9 aspect ratio)

**Links section (below media):**
- If `liveUrl` exists: Show "Live Project" button (using existing `LiveProjectButton` component, now as a link)
- Social icons row: Show icons for each non-empty social URL (Facebook, Instagram, TikTok, LinkedIn, Google Business) — small clickable icons

---

## Step 6: Remove `@vercel/blob` from `package.json`

**File:** `package.json`

Remove `"@vercel/blob": "^2.6.1"` from `dependencies`.

---

## File Summary

| File | Action |
|------|--------|
| `data/projects.json` | Modify — new schema |
| `app/api/projects/route.ts` | Modify — GET only, remove POST |
| `app/api/projects/[id]/route.ts` | Delete |
| `components/AdminPanel.tsx` | Rewrite — 3-card layout |
| `components/ProjectsSection.tsx` | Update — new schema, media types |
| `package.json` | Remove `@vercel/blob` |

## Execution Order

1. `data/projects.json` (schema migration)
2. `app/api/projects/route.ts` (simplify to GET only)
3. Delete `app/api/projects/[id]/route.ts`
4. `components/AdminPanel.tsx` (full rewrite)
5. `components/ProjectsSection.tsx` (update for new schema)
6. `package.json` (remove @vercel/blob)
7. Run `npm install` to update lockfile
8. Run `npm run build` to verify no errors
