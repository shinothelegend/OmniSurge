# OmniSurge — "Ink, Quill & Current" Design System

## 1. Overview
OmniSurge has been redesigned according to `DESIGN.md` into **"Ink, Quill & Current"** — an editorial, dark, high-craft interface fusing:
1. **Loud type as architecture**: Stacked mega display type (`Unbounded` 900) with outlined echo words behind (`-webkit-text-stroke: 1.5px var(--pink); color: transparent;`).
2. **Print-to-pixel texture**: Grayscale imagery on tilted grids (`rotate(-26deg)`), scanlines (2px, 5%), animated noise grain, halftone radial dither, and a vermilion blurred glow blob (`#E0342B`, blur 60px).
3. **A living line**: Continuous curved SVG line (`CurveLine.tsx`) that draws itself with scroll progress, carrying a glowing tip marker and lighting up hollow square nodes (`□` -> `■`).

---

## 2. Core Tokens & Motion Engine
- **Tokens (`frontend/src/app/tokens.css`)**:
  - Base: `--ink: #070707`, `--ink-2: #121212`, `--ink-3: #1C1C1C`, `--paper: #EDE8E0`, `--white: #FFFFFF`
  - Accents: `--pink: #D9A8CB` (huge type, curve line, buttons), `--vermilion: #E0342B` (rare hot accent: active dots, key metrics, emergency zone)
  - Typography Scale: `--fs-mega` (`clamp(3.5rem, 13vw, 12rem)`), `--fs-title`, `--fs-h2`, `--fs-h3`, `--fs-body`, `--fs-micro: 0.6875rem`
- **Motion (`frontend/src/lib/motion.ts`)**:
  - Lenis smooth scrolling (lerp 0.085) synchronized strictly with the GSAP ticker (`gsap.ticker.add((time) => lenis.raf(time * 1000))`) so there is ONE single rAF loop.
  - Zero lag smoothing (`gsap.ticker.lagSmoothing(0)`).
  - Respects `prefers-reduced-motion`.

---

## 3. Signature Components
- **`Loader.tsx`**:
  - Outlined "OMNISURGE" project title filled bottom-to-top with pink as progress rises.
  - Non-linear eased counter with realistic stalls at 37% and 84%.
  - Local clock and sub-second reactive finality labels.
  - 8 diagonal black slats exit (`skewX(-26deg)`, 60ms stagger) on completion.
  - Persisted per session (`sessionStorage`).
- **`CurveLine.tsx`**:
  - Full-viewport SVG layer generating a smooth cubic Bezier path.
  - Stroke 2px, `--pink` on dark, `--vermilion` on paper.
  - Lerped scroll progress driving `stroke-dashoffset`.
- **`GrainOverlay.tsx`**:
  - 5% animated noise grain + 2px scanlines + slow drifting vermilion glow blob.
- **`ScriptWord.tsx`**:
  - Italic serif accent word (`NT Ubuntu Serif`) with SVG write-on underline and fade-in.
- **`Header.tsx`**:
  - 64px fixed header, display wordmark, monogram mark, square-bullet nav (`□ PROTOCOL`, `□ ANALYTICS`, `□ PRICING`, `□ SETTINGS`), 32px square mode toggle, paper/ink pill CTA.
  - Hides on scroll down, returns on scroll up, frosted glass effect after 80px.
- **`Footer.tsx`**:
  - Giant width-spanning "OMNISURGE" wordmark, live local clock, verified network links, "SCROLL ↑" smooth back-to-top button.
- **`Marquee.tsx`**:
  - Infinite horizontal ticker with `( 01 )`, `( 02 )` indices, pauses on hover.
- **`Counter.tsx`**:
  - Tabular display numbers counting up on inView with easeOutExpo.
- **`Hero3DVisual.tsx`**:
  - Original 3D black chrome card artwork with pink specular rim lighting and interactive mouse-tilt effect.
- **`TiltedWall.tsx`**:
  - Grayscale image grid rotated at -26 degrees with opposing column drift.

---

## 4. Pages Restyled
1. **Landing (`/`)**: Full signature sequence (Loader, 3-line MEGA display type with outlined echo, black chrome hero object, halftone dither, tilted wall, marquee, architecture 01/06 list, real-time proof telemetry, 4K Remotion player, and closing CTA).
2. **Pricing (`/pricing`)**: Display title with script word, square-bullet billing cycle toggle (Monthly / Annual), 3 glass cards (middle taller, pink rim highlight, "MOST POPULAR" pill), hollow-square feature checks, and animated FAQ accordion.
3. **Dashboard (`/dashboard`)**: Paper/ink split contrast, square-bullet channel rail, 2x2 data cards (concentrated pool dynamics histogram, volume tiers), live JIT deployment & withdrawal queue, and manual flash rebalance simulation.
4. **Settings (`/settings`)**: Calm paper layout, boxed inputs, compact black spring toggles, and vermilion emergency drain danger zone.

---

## 5. Asset Placeholders & Customization
- Artwork is rendered via bespoke SVG and CSS shaders in `Hero3DVisual.tsx` and `TiltedWall.tsx`.
- To swap with external 3D WebGL (Three.js/Spline) or custom renders, drop assets into `frontend/public/` and update the image tags in `Hero3DVisual.tsx`.

