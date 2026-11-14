# OmniSurge — Frontend

## Structure
```
frontend/
  src/
    app/
      layout.tsx        — Root layout, Vantablack theme, Unbounded + JetBrains Mono
      globals.css       — Single color theme (#000 / #FFF / #00F5FF), hard 1px borders
      page.tsx          — Landing page: Preloader + ScrollLine + Hero + Docs link
      docs/
        page.tsx        — Documentation page: what it is, how it works, contracts, local dev
    components/
      InsanePreloader.tsx — Vantablack curtain, 000→100 counter in 1.2s, glitch + split exit
      HeroSection.tsx     — Screen-spanning capital bold type, floating geometric element, one CTA
      ScrollLine.tsx      — Curving neon SVG line drawn in sync with scroll depth
    lib/
      motion.ts         — Lenis + GSAP single RAF loop, ScrollTrigger
```

## Design Rules
- Background: pure `#000000`
- Text: `#FFFFFF` primary, `#555555` secondary
- Single accent: `#00F5FF` electric cyan
- Borders: hard 1px `#111111`, accent `#00F5FF` on hover
- No soft drop shadows, no gradients, no Inter/Roboto/Open Sans fonts
- Headers: capital, bold, high quality, large text
- No feature-card rows, no "transform your workflow" copy, no small filler text
- Everything animated via GSAP + Lenis single RAF loop

## Scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run build:video` — render Remotion demo video
