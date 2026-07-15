# Performance Optimization Plan — Portfolio Website

## Overview
Address all image loading, animation, and rendering performance issues to achieve instant image loads and smooth 60 FPS animations.

---

## CRITICAL FIX 1: AnimatedText Scroll Jank (~1200 spans re-rendering per frame)

**File:** `components/AnimatedText.tsx`

**Problem:** Every scroll frame triggers `setProgress()`, which causes React to re-render ~1200+ `<span>` elements (each character = 2 spans). This is the #1 scroll performance killer.

**Solution:** Replace React state with refs + direct DOM manipulation. Use `requestAnimationFrame` to batch scroll updates and directly set `opacity` via `element.style` instead of React state.

```
- Remove useState for progress
- Use useRef for progress value
- Use requestAnimationFrame to throttle scroll handler
- Directly set opacity via inline style on each span ref
- Use a single scroll listener that updates DOM without React re-renders
```

**Approach:** Store character elements in an array of refs. On scroll, calculate progress with rAF, then loop through refs and set `el.style.opacity` directly. Zero React re-renders.

---

## CRITICAL FIX 2: Marquee GIF Loading (~5-15MB total)

**File:** `components/MarqueeSection.tsx`

**Problem:** 21 animated GIFs from `motionsites.ai` are loaded as `<Image>` components. GIFs are massive (200KB-1MB each). Total payload: ~5-15MB. `next/image` converts GIF to WebP but the source GIFs are still huge.

**Solution:** Replace `next/image` with native `<video>` elements for animated content. Videos are 5-10x smaller than equivalent GIFs.

```
- Replace <Image> with <video autoPlay loop muted playsInline>
- Keep the same CSS sizing and rounded corners
- Remove loading="lazy" (video has its own loading behavior)
- Add proper alt text via aria-label
```

---

## CRITICAL FIX 3: Magnet Continuous RAF Loop

**File:** `components/Magnet.tsx`

**Problem:** `requestAnimationFrame` loop runs 60fps continuously even when element is idle (mouse far away). Global `mousemove` listener fires `getBoundingClientRect()` on every mouse move.

**Solution:** Add idle detection. Stop RAF when converged. Restart on mouse proximity.

```
- Add idle check: if both pos and target are < 0.01, stop RAF
- Restart loop on next mousemove when mouse enters proximity
- Scope mousemove listener to parent element instead of window
- Remove permanent willChange: transform, apply only during animation
```

---

## CRITICAL FIX 4: FloatingParticles Math.random() Instability

**File:** `components/HeroSection.tsx` (lines 95-130)

**Problem:** `Math.random()` called inline in JSX. Any re-render of `FloatingParticles` gives all 8 particles new random positions/sizes, causing visual jumps.

**Solution:** Memoize particle data with `useMemo` so random values are computed once.

```
- Create a useMemo that generates 8 particle configs once
- Store as const particleData = useMemo(() => Array.from(...), [])
- Map over particleData instead of calling Math.random() inline
```

---

## CRITICAL FIX 5: No Blur Placeholders on Any Image

**Files:** All components using `next/image`

**Problem:** Zero images have `placeholder="blur"`. Every image shows blank space until loaded, causing CLS and poor perceived performance.

**Solution:** Add `placeholder="blur"` with a tiny base64 `blurDataURL` to all images.

```
- Create a reusable tiny transparent gray base64 placeholder:
  "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"
- Add placeholder="blur" and blurDataURL={tinyPlaceholder} to every <Image>
- For the hero image (priority), use a slightly more visible placeholder
```

---

## HIGH PRIORITY FIX 6: Hero Section CSS Blur Bottleneck

**File:** `components/HeroSection.tsx` (lines 176-177, 271-273)

**Problem:** 5 simultaneous `blur-[60px]` to `blur-[120px]` CSS elements. Large CSS blur filters are GPU-intensive, especially on mobile.

**Solution:** Reduce blur radius and replace large blurs with pre-rendered gradient images or reduce opacity.

```
- Reduce blur-[120px] to blur-[80px] on background blobs (lines 176-177)
- Reduce hero image glow blurs from blur-[60px]/blur-[80px] to blur-[40px]/blur-[60px]
- Consider replacing CSS blurs with static gradient SVG/PNG for the most expensive ones
```

---

## HIGH PRIORITY FIX 7: ServicesSection `layout` Prop

**File:** `components/ServicesSection.tsx` (line 58)

**Problem:** `layout` prop on `motion.div` with `whileHover` triggers Framer Motion layout animations on every hover, causing layout thrashing.

**Solution:** Remove `layout` prop. `whileHover={{ x: 16, scale: 1.01 }}` works without layout animation.

```
- Remove `layout` from line 58
- Keep whileHover transform-only animation
```

---

## HIGH PRIORITY FIX 8: Dynamic Imports for Below-the-Fold Sections

**File:** `app/page.tsx`

**Problem:** All 6 sections are statically imported. Since all are `'use client'`, they're all bundled into one large JS file loaded on initial page load.

**Solution:** Use `next/dynamic` for below-the-fold sections.

```
- Keep HeroSection and MarqueeSection as static imports (above fold)
- Dynamic import: AboutSection, ServicesSection, ProjectsSection, ContactSection
- Add { ssr: false } or keep SSR for SEO
```

---

## MEDIUM PRIORITY FIX 9: Font Weight Reduction

**File:** `app/layout.tsx` (line 7)

**Problem:** 9 weights of Kanit loaded (300-900). Each weight is a separate network request (~100KB total extra).

**Solution:** Reduce to 5 essential weights.

```
- Change weight array from ['300','400','500','600','700','800','900']
  to ['300','400','500','700','900']
```

---

## MEDIUM PRIORITY FIX 10: MouseLight on Mobile

**File:** `components/HeroSection.tsx` (lines 132-164)

**Problem:** `MouseLight` component has a global `mousemove` listener that runs on all screen sizes, even though the element is `hidden sm:block` (only visible on desktop).

**Solution:** Conditionally render MouseLight and only attach listener on desktop.

```
- Add mounted state + media query check
- Only attach mousemove listener if screen >= 640px (sm breakpoint)
- Or conditionally render <MouseLight /> based on window width
```

---

## MEDIUM PRIORITY FIX 11: Noise Texture SVG Filter

**File:** `components/HeroSection.tsx` (lines 182-187)

**Problem:** Inline SVG `feTurbulence` filter causes expensive paint operations.

**Solution:** Replace with a pre-rendered noise PNG or reduce to a simpler CSS pattern.

```
- Option A: Replace with a static noise PNG image (256x256 tiled)
- Option B: Use CSS background with a subtle grain texture
- Option C: Keep but reduce opacity and size
```

---

## MEDIUM PRIORITY FIX 12: React.memo on ProjectCard

**File:** `components/ProjectsSection.tsx`

**Problem:** `ProjectCard` is not memoized. Any state change in `ProjectsSection` re-renders all cards.

**Solution:** Wrap `ProjectCard` with `React.memo`.

```
- Import memo from 'react'
- Wrap ProjectCard export with memo()
- Ensure props are stable (they already are — project objects from state)
```

---

## LOW PRIORITY FIX 13: Admin Panel Raw `<img>` Tags

**File:** `components/AdminPanel.tsx`

**Problem:** 6 raw `<img>` tags for admin image previews. No optimization.

**Solution:** Replace with `next/image` or leave as-is (admin-only, not crawled by Lighthouse).

```
- Low priority — admin panel is not user-facing
- Can replace with <Image> if desired
```

---

## Execution Order

1. AnimatedText.tsx — scroll jank fix (biggest impact)
2. MarqueeSection.tsx — GIF to video conversion
3. Magnet.tsx — idle RAF loop
4. HeroSection.tsx — particles memoize + blur reduction + noise fix + MouseLight conditional
5. All image components — blur placeholders
6. ServicesSection.tsx — remove layout prop
7. page.tsx — dynamic imports
8. layout.tsx — font weight reduction
9. ProjectsSection.tsx — React.memo on ProjectCard
10. AdminPanel.tsx — img to Image (optional)

## Files to Modify (10 files)

| # | File | Changes |
|---|------|---------|
| 1 | `components/AnimatedText.tsx` | Full rewrite — rAF + refs instead of state |
| 2 | `components/MarqueeSection.tsx` | Replace `<Image>` with `<video>` |
| 3 | `components/Magnet.tsx` | Idle detection + scoped listener |
| 4 | `components/HeroSection.tsx` | Memoize particles, reduce blur, fix noise, conditional MouseLight |
| 5 | `components/FadeIn.tsx` | Add blurDataURL placeholder pattern |
| 6 | `components/AboutSection.tsx` | Add placeholder="blur" to 4 images |
| 7 | `components/ProjectsSection.tsx` | Add placeholder="blur" + React.memo on ProjectCard |
| 8 | `components/ServicesSection.tsx` | Remove `layout` prop |
| 9 | `app/page.tsx` | Dynamic imports for below-fold sections |
| 10 | `app/layout.tsx` | Reduce Kanit weights |
