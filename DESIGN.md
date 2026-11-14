<USER_REQUEST>
# DESIGN.md — [OmniSurge] Design System

> Single source of truth for look, layout and motion. Every page, component and animation MUST follow this file.
> If a page conflicts with this file, the page is wrong. Replace [OmniSurge] and [One force. Every direction] before building.

---

## 0. CONCEPT

**Name of the look:** "Ink, Quill & Current"
A dark, editorial, slightly rebellious interface that mixes three ideas:
1. **Loud type as architecture.** Giant chunky display words, stacked, with outlined echoes behind them (scrib3 energy).
2. **Print-to-pixel texture.** Grayscale imagery on tilted grids, grain, scanlines, halftone dither, one hot red glow (4C's AD energy).
3. **A living line.** One continuous curved line that draws itself as the user scrolls and guides the eye down the page (Marble energy).

One-line brief: *a site that feels printed, inked and alive, not templated.*

Every page must show at least TWO of the three ideas. The landing page shows all three.

---

## 1. NON-NEGOTIABLE PRINCIPLES

1. One focal point per viewport. Everything else supports it.
2. Type is the main graphic. Imagery is secondary and always treated (grayscale, grain, tint).
3. Motion is smooth or it does not ship. 60fps target on mid-range phones, 120fps on capable displays.
4. Only `transform` and `opacity` (plus `clip-path` and `filter` on small layers) are animated.
5. Layout is strict: 12-column grid, thin rules, tiny mono labels. Chaos lives in the type and images, never in the grid.
6. Every layout shares the same shell (Section 5) so pages feel like one product.
7. Nothing generic: no default fonts, no stock icons, no template gradients, no emoji.
8. Accessibility is part of the design: AA contrast, keyboard use, reduced-motion fallbacks.

---

## 2. COLOR TOKENS

```css
:root {
  /* Base */
  --ink:        #070707;   /* page background (dark) */
  --ink-2:      #121212;   /* raised surface */
  --ink-3:      #1C1C1C;   /* cards on dark */
  --paper:      #EDE8E0;   /* light sections, warm off-white */
  --paper-2:    #DDD6CB;
  --white:      #FFFFFF;   /* only for tiny highlights */

  /* Signature */
  --pink:       #D9A8CB;   /* primary accent: huge type, curve line, buttons */
  --pink-deep:  #B97BAA;
  --vermilion:  #E0342B;   /* hot accent: glow, active dot, key numbers */
  --vermilion-glow: rgba(224, 52, 43, 0.55);

  /* Greys for treated imagery and text */
  --g-90: #E6E6E6;  --g-60: #9A9A9A;  --g-40: #6B6B6B;  --g-20: #2A2A2A;

  /* Lines */
  --rule:       rgba(237, 232, 224, 0.18);   /* hairline on dark */
  --rule-ink:   rgba(7, 7, 7, 0.2);          /* hairline on paper */
}
```

Rules:
- Default page is dark (`--ink`). Light (`--paper`) sections are used as contrast breaks, max one per page.
- Pink is for the biggest type and the scroll line. Vermilion is rare: glows, active states, one number per section.
- Never use pink and vermilion as large fills side by side.
- Text on dark: `--paper` at 100% for headlines, 72% for body, 48% for captions (never lower).

---

## 3. TYPOGRAPHY

### 3.1 Families
| Role | Font | Notes |
|---|---|---|
| Display (giant words) | A heavy, wide, blocky display face. Recommended: **Dela Gothic One** or **Unbounded 900**. Self-host. | Used ONLY for hero/section titles, big numbers. |
| UI + body | **NT Ubuntu Sans Mini Edition** (the uploaded TTF) | Primary text face everywhere else. Load from `/public/fonts/NT_Ubuntu_Sans_Mini_Edition_.ttf`. |
| Micro labels | Same TTF, uppercase, letter-spacing 0.08em | Used like scrib3's tiny captions. |
| Accent script | A flowing italic serif or brush-like script (Instrument Serif Italic, or a brush script of your choice) | 1–2 key words per heading, written-on animation. |

- Max 3 families total (display, TTF, script). No Inter, Roboto, Arial, system-ui as visible faces.
- If the TTF has a single weight, build hierarchy with size, case and tracking. Never fake bold.
- `font-display: swap`, preload display + TTF, subset where possible.

### 3.2 Scale (fluid)
```css
--fs-mega:   clamp(4rem, 15vw, 15rem);     /* hero stacks, line-height .86 */
--fs-title:  clamp(2.75rem, 8vw, 8rem);    /* section titles, line-height .92 */
--fs-h2:     clamp(1.75rem, 3.4vw, 3rem);  /* line-height 1.05 */
--fs-h3:     clamp(1.25rem, 1.8vw, 1.75rem);
--fs-body:   clamp(1rem, 1.05vw, 1.125rem);/* line-height 1.6 */
--fs-small:  0.875rem;
--fs-micro:  0.6875rem;                    /* 11px, uppercase, tracking .08em, min size allowed */
```
- Display type is uppercase, tight (`letter-spacing: -0.02em`), stacked in 2–4 lines.
- Outline echo: duplicate the word behind with `-webkit-text-stroke: 1.5px var(--pink); color: transparent;`, offset 0.35em, 40% opacity.
- Body copy max-width 52ch. Micro labels max-width 34ch.

### 3.3 Accent script words
- 1–2 words per title in the script face, 1.15x size, color `--pink` (on paper: `--vermilion`).
- Always animated with a write-on (SVG stroke-dashoffset, then fill fades in). Real text stays in DOM for accessibility.
- Component: `<ScriptWord>`.

---

## 4. LAYOUT SYSTEM

- **Grid:** 12 columns, 24px gutters, outer margin `clamp(16px, 3vw, 48px)`. Max width 1600px, hero may bleed full width.
- **Rules:** every section starts with a 1px `--rule` line spanning the full inner width. Section header sits directly under it: micro label left, short sentence centered or right, arrow/index far right.
- **Section index:** `( 01 )`, `01/06`, `+` markers as in editorial agency sites. Use them for every list.
- **Bullets:** tiny hollow squares `□` (filled `■` when active) instead of dots.
- **Vertical rhythm:** section padding `clamp(96px, 14vw, 220px)`. Between related blocks 48–80px.
- **Asymmetry:** place text on col 1–5 and visuals on col 6–12 (or reverse) and shift by one column for variety. Never perfectly centered stacks except the hero and closing CTA.
- **Tilted layers:** image walls rotate `-24deg to -30deg` and are clipped by the section (4C's AD style). Rotation only on image layers, never on text blocks.
- **Z-order:** background texture < tilted images < curve line < text < nav < loader.

---

## 5. SHARED PAGE SHELL (EVERY PAGE USES THIS)

```
┌────────────────────────────────────────────────────────────┐
│ LOGO   (tiny tagline)     [mark]     □Link □Link □Link  [■][CTA] │  ← fixed header, 64px
├────────────────────────────────────────────────────────────┤
│ ─────────────── 1px rule ───────────────                    │
│ micro title (left)     micro sentence (center)      ↓       │  ← section header strip
│                                                            │
│                   PAGE CONTENT                             │
│                                                            │
├────────────────────────────────────────────────────────────┤
│ footer: big wordmark, micro links, local time, ©           │
└────────────────────────────────────────────────────────────┘
 + Curve line overlay (fixed, behind content)
 + Grain + scanline overlay (fixed, pointer-events none)
 + Page-transition layer (diagonal slats)
```
- Header: logo left (wordmark in display face), tiny tagline in mono, center mark, nav links as square-bullet list (stacked in 2 columns on desktop like scrib3), a square toggle button and a pill CTA (paper background, ink text).
- Header turns into a frosted bar after 80px scroll, hides on scroll down, returns on scroll up.
- Footer: giant wordmark filling the width, tiny local-time clock, socials as micro links, "SCROLL ↑" back-to-top.

---

## 6. SIGNATURE ELEMENTS

### 6.1 Loading screen (every first visit)
See REDESIGN_PROMPT.md section "Loader" for the full sequence. Summary: black screen, giant percentage counter, outlined project name that fills with pink as progress rises, halftone noise, then a diagonal slat wipe reveals the hero.

### 6.2 Scroll curve line
- One continuous SVG path, fixed behind content, winds left to right between section anchors.
- Draws with scroll (`stroke-dashoffset`), tip has a small glowing dot (or a tiny quill/mascot) that follows `getPointAtLength`.
- Stroke 2px, `--pink` on dark, `--vermilion` on paper, `mix-blend-mode: screen` on dark.
- Path is rebuilt from section positions on load and resize (debounced). On mobile: simpler path with fewer curves.

### 6.3 Texture stack
- **Grain:** animated noise PNG/canvas at 4–6% opacity, `steps(8)` jitter at 12fps, pointer-events none.
- **Scanlines:** repeating-linear-gradient 2px at 6% opacity over images only.
- **Halftone dither:** radial dot gradient fading to transparent on one side of the hero (right edge). Canvas or SVG pattern, static.
- **Red glow:** one blurred vermilion blob (filter: blur(60px)) per page, placed behind a key image, slow drift.

### 6.4 Image treatment
- All photos and illustrations: grayscale + contrast 1.1 + grain. Color only on hover/active (transition 500ms).
- Hero object: one custom 3D-ish or illustrated object (your mascot, product shape or quill-like symbol) in black chrome with pink rim light, overlapping the big type. Original artwork only.
- Image walls: tilted grid of 8–14 tiles with slow opposing drift.

---

## 7. COMPONENTS

| Component | Spec |
|---|---|
| Button (primary) | Pill, `--paper` bg, `--ink` text, 12px 20px, micro-uppercase label, hover: bg → pink, label slides up and duplicates in (text roll). |
| Button (ghost) | 1px `--rule` border, hover fills from bottom with clip-path. |
| Square toggle | 32px square, 1px border, inner filled square scales on active. |
| Nav link | `□` + uppercase micro label, hover: square fills, label shifts 6px. |
| Marquee | Infinite horizontal logo/word strip with `( 01 )` indices, 40s linear, pauses on hover. |
| Card (dark) | `--ink-3`, 1px rule border, radius 4px (sharp, not bubbly), hover lifts 6px and shows pink rim. |
| Card (glass, pricing) | blur 24px, white 10% fill, 1px 30% white border, radius 24px. |
| Data card | Paper or ink, radius 20px, chunky gradient bars, active value in a black pill. |
| Input | Underline-only on dark pages (1px rule, pink on focus). Boxed 1px on settings. |
| Counter | Display face, tabular numbers, counts up on view, suffix `% UP` in micro. |
| Tag | Micro uppercase, hollow square bullet, no fill. |
| Toast | Small ink bar bottom-left, slides in with clip-path. |

Radius scale: 0 / 4 / 12 / 20 / 24 / 999. Editorial pages favor 0–4. App pages (dashboard, settings) favor 12–24.

---

## 8. MOTION SYSTEM (SMOOTHEST POSSIBLE)

### 8.1 Engine
- **Lenis** for smooth scroll (lerp 0.085, `smoothWheel: true`, `syncTouch: false`).
- **GSAP + ScrollTrigger** driven by Lenis via `gsap.ticker` so there is ONE requestAnimationFrame loop.
- **View Transitions API** for page navigation where supported, with a GSAP slat-wipe fallback.
- Optional: **Three.js / OGL** for the hero object and dither shader, capped at devicePixelRatio 1.75 and paused when off-screen.

### 8.2 Easing and duration tokens
```js
export const ease = {
  out:    'expo.out',                       // reveals
  inOut:  'power3.inOut',                   // wipes, transitions
  soft:   'power2.out',                     // hovers
  curve:  'cubic-bezier(0.22, 1, 0.36, 1)'  // CSS fallback
};
export const dur = { micro: .18, ui: .35, reveal: .9, hero: 1.4, wipe: 1.1, page: .9 };
```

### 8.3 Performance rules
1. Animate `transform` and `opacity` only. Use `clip-path` for wipes on small to medium layers.
2. Use `will-change: transform` only on actively animating layers; remove after.
3. No layout reads inside scroll callbacks. Cache measurements; refresh on resize.
4. Use `gsap.quickTo` / `quickSetter` for mouse-follow effects.
5. Split text once, reuse spans. Never re-split on scroll.
6. Pause WebGL, marquees and videos when off-screen (IntersectionObserver).
7. Images: `decoding="async"`, `loading="lazy"` (except hero), modern formats, explicit width/height.
8. Keep DOM nodes under 1500 per page. Virtualize long lists.
9. Test with Chrome Performance panel: no long tasks over 50ms during scroll, no layout thrash.
10. Reduced motion: disable Lenis smoothing, curve-line tip animation, parallax, write-on. Keep opacity fades only.

### 8.4 Signature transitions
- **Slat wipe:** 6–8 diagonal black slats (skewX -28deg) slide across, staggered 60ms, reveal next page. 900ms total.
- **Image mask reveal:** `clip-path: inset(100% 0 0 0)` → `inset(0)` with inner image scale 1.2 → 1.
- **Line reveal:** each title line sits in an overflow-hidden wrapper, line translates up 110% → 0, stagger 80ms.
- **Pinned scrub:** pinned sections scrub text from outline to filled as scroll progresses.
- **Horizontal gallery:** vertical scroll drives a horizontal track (scrub 1), with tilt-in-place tiles.

---

## 9. PAGE LAYOUT TEMPLATES (ADAPT TO YOUR ACTUAL PAGES)

All pages: shared shell + one of these skeletons.

### 9.1 Landing (dark)
1. Loader → hero.
2. Hero: thin rule, header strip (micro title left, micro sentence center, arrow right). Then 3-line stacked MEGA type with outlined echo word behind, hero object overlapping, halftone on right, tilted grayscale wall faint in background.
3. Marquee strip (indices `( 01 )`).
4. Services / features: sticky left title, right column list with `01/06` counters, each item reveals on scroll.
5. Proof/press list: row list with hover image preview following cursor.
6. Horizontal gallery of cases (pinned).
7. Numbers: two big counters with `% UP` and short text.
8. Team or story: asymmetrical grid, grayscale to color on hover.
9. CTA: giant script-word headline, form with underline inputs, footer wordmark.

### 9.2 Pricing (glass over dark gradient or sky)
- Title in display type with script word, billing toggle (square-bullet segmented), 3 glass cards (middle taller, MOST POPULAR micro tag), feature rows with hollow-square checks, FAQ accordion with line-draw dividers.

### 9.3 Dashboard (paper + ink contrast)
- Left rail with square-bullet nav, top strip with micro breadcrumb, 2x2 data cards, chunky gradient shapes, black pill for active value, counters on view.

### 9.4 Settings (calm)
- Paper background, two-column layout (secondary nav + content), thin rules between groups, boxed inputs, black toggles, destructive text in vermilion.

### 9.5 Content / detail pages
- Big title stack, 12-col body with sticky micro index, pull-quotes in script, image masks, next-page link as giant hover word.

---

## 10. ACCESSIBILITY AND RESPONSIVE

- Breakpoints: 360, 480, 768, 1024, 1280, 1600.
- Mobile: header collapses to logo + square toggle, full-screen menu with line-reveal links. Tilted walls reduce to 6 tiles. Curve line simplified. MEGA type scales via clamp and may wrap to 4 lines.
- Contrast AA min. Focus-visible ring: 2px `--pink` offset 3px.
- Keyboard: all interactive elements reachable, menu focus-trapped, skip link present.
- `prefers-reduced-motion`: see 8.3 rule 10.
- Never hide content behind hover only; provide tap equivalents.

---

## 11. COPY VOICE

- Short, confident, specific. Lowercase micro, UPPERCASE display.
- Patterns to use: "We build + grow…", "Tools change. [Truth] stays.", "Now it's your turn."
- Banned: "Welcome to", "Unlock", "Revolutionize", "Seamless", "Cutting-edge" (unless ironic), lorem ipsum, fake names.

---

## 12. DEFINITION OF DONE

- [ ] Loader runs, counts, wipes, and hands off to hero without a jump.
- [ ] Curve line draws smoothly with scroll on all pages and degrades gracefully on mobile.
- [ ] All pages use the shared shell, tokens and components from this file.
- [ ] Every title uses display type + a written-on script word.
- [ ] No default fonts visible. No animation drops below 55fps in profiling.
- [ ] Reduced-motion and keyboard paths verified.
- [ ] No assets copied from reference sites. All imagery original or properly licensed/public domain.




# REDESIGN PROMPT — Transform the existing UI to match DESIGN.md

You are a senior creative developer. You are redesigning the existing website for [PROJECT_NAME].
First read `DESIGN.md` in the project root. It is the source of truth. Follow it exactly.
Then restyle and re-animate the whole site according to this prompt. Do not rebuild the business logic or routes.
Keep existing content, data and functionality. Change visuals, layout, motion and structure of presentation.

## 1. WHAT TO DO FIRST
1. Read the current codebase and list every page and shared component.
2. Install and set up: `lenis`, `gsap` (with ScrollTrigger), optionally `three` or `ogl`.
3. Add fonts: the uploaded TTF (NT Ubuntu Sans Mini Edition) as primary, a heavy wide display face, and an italic or brush script face for accent words. Self-host all.
4. Create `tokens.css` from DESIGN.md (colors, type scale, radii, durations, easings).
5. Create the shared shell: Header, Footer, GrainOverlay, CurveLine, PageTransition, Loader.
6. Restyle pages one by one using the skeletons in DESIGN.md section 9.
7. Profile performance and fix anything under 55fps before finishing.

## 2. REFERENCES AND WHAT TO TAKE FROM EACH
Do not copy their assets, text, logos or code. Take the ideas only.

### scrib3.co (loader + attached image elements)
Loader: black screen, tiny "loading" label, a huge percentage counter.
Hero: giant stacked chunky uppercase type in dusty pink on black.
Outlined (stroke-only) duplicate words sit behind and between the filled words.
A black illustrated object with white outline overlaps the type, breaking its letters.
Halftone / dither gradient fades in on the right side of the hero.
Tiny uppercase micro text, wide-spaced, in the header strip and under rules.
Header strip: logo left, tiny tagline, center mark, nav list with hollow square bullets, round-cornered pill CTA.
A single thin horizontal rule separates the header from the hero content.
Numbered lists with `( 01 )` and `+` markers, plus `01/06` counters.
Marquee strips and big "MEET THE TEAM" style repeated titles.

### branding.4cs-ad.co.jp (transitions + layout placements + attached image)
Counter loader ("1%") with a local clock and a poetic time label.
Tilted wall of grayscale images at about -28 degrees, with scanlines, grain and one red glow.
Huge brush-written headline with a small English line under it.
Bilingual or two-tier text: big line plus smaller supporting line, placed in offset columns.
Section numbering `01 / 03`, "SCROLL ↓" and "SCROLL → GALLERY" hints.
Pinned sections that scrub, horizontal gallery driven by vertical scroll.
Counters like "0% UP" that count when visible.
Strong section transitions: wipes, masks, scale-in images, text lines rising.
Footer closing line "Tools change. Where will you go next?" style: a large two-line closing statement.

### withmarble.com (curving scroll line)
A continuous curved line that follows the scroll and draws itself down the page.
Section content is arranged around the line so the line feels like a path through the story.
Smooth, playful, never jittery.
Numbered step sections ("01 / 02 / 03") with content that reveals as the line reaches it.

## 3. LOADER (BUILD THIS EXACTLY)
Duration: min 2.4s, max 4s, tied to real asset loading but never shorter than the minimum.
1. Full-screen `--ink` layer, grain on top.
2. Top-left micro label "loading" with a blinking hollow square.
3. Center: the project name in display type, outlined only, very large (fit width).
4. A pink fill rises through the outlined word from bottom to top as progress increases (clip-path inset or mask).
5. Bottom-left: giant percentage counter in display type. It does NOT count linearly: it eases, stalls at 37 and 84 for 150ms, then rushes to 100.
6. Bottom-right: tiny local time and a tiny line "[PROJECT_NAME] — [TAGLINE]".
7. A halftone dot field on the right edge slowly pulses.
8. At 100%: counter slides up and out (line reveal), outlined word snaps filled for 200ms.
9. Slat wipe: 8 diagonal black slats exit in sequence (60ms stagger, 1.1s total), revealing the hero.
10. Hero headline lines rise from masked wrappers; accent script word writes itself; the hero object floats in; header fades down.
11. Show the loader once per session (sessionStorage). Skip with a short 400ms fade if reduced motion is on.
12. Block scroll while loading; release Lenis when the wipe starts.
13. All loader animation uses transforms and opacity. Counter text updates via a single rAF, not state re-renders.

## 4. SCROLL CURVE LINE (BUILD THIS EXACTLY)
1. Create a fixed full-viewport SVG layer behind content (`position: fixed; inset: 0; pointer-events: none`).
2. Build one tall SVG path (document height) with smooth cubic Bezier curves that snake left and right.
3. Generate control points from the positions of each major section (read once, recompute on resize, debounced 200ms).
4. Set `stroke-dasharray` to path length and drive `stroke-dashoffset` from scroll progress.
5. Smooth the progress with lerp (0.08) inside the shared GSAP ticker for buttery motion.
6. Place a small glowing dot (or a tiny mascot/quill) at the line tip using `getPointAtLength(progress * length)`.
7. Translate the whole SVG with scroll so the visible part stays in view (use a viewBox window, not a huge repaint).
8. Stroke: 2px, round caps, pink on dark sections, vermilion on paper sections (switch via ScrollTrigger and CSS variable).
9. Line passes behind text and images but above the grain. Content should visually "attach" to it with tiny hollow-square nodes at section starts that fill when the tip reaches them.
10. On mobile use fewer curves, 1.5px stroke, no glow.
11. Pause updates when the tab is hidden. Under reduced motion show the full line static at 25% opacity.

## 5. PAGE TRANSITIONS
1. Use the View Transitions API when available; otherwise use the GSAP slat wipe.
2. Outgoing page: content fades to 0 and translates -24px while slats cover the screen.
3. Incoming page: slats exit, headline lines rise, image masks reveal.
4. Keep the header persistent across transitions.
5. Preload next route data on link hover or focus.
6. Restore scroll position correctly on back/forward.
7. Total transition time at most 900ms. Interactions must remain responsive during it.

## 6. IMAGE AND TEXTURE WORK
1. Convert all photos to grayscale with CSS filter or pre-processed assets; color on hover with 500ms transition.
2. Add a tilted image wall (rotate -26deg) behind the landing hero at 18–25% opacity, tiles drifting in opposite directions at different speeds.
3. Add scanlines (2px, 6% opacity) and animated grain overlays.
4. Add a vermilion blurred glow blob behind one key tile, slow drift.
5. Add halftone dither on the hero's right side using a CSS radial dot pattern or small canvas.
6. Create or source an original hero object with black chrome look and pink rim light. Do not copy any reference artwork.
7. Provide a clear placeholder for artwork and mark where the user should drop final assets.
8. All imagery either original, licensed, or public domain with source credits in an "Assets" footer page.

## 7. TYPOGRAPHY WORK
1. Replace every visible font with the system in DESIGN.md.
2. Rebuild every page title as stacked uppercase display type with outlined echo words.
3. Pick 1–2 accent words per title and set them in the script face with the write-on animation.
4. Write-on: SVG text stroke draw (stroke-dashoffset 1.4s), then fill fades in; reduced motion shows text instantly.
5. Micro labels use the TTF, 11px uppercase, tracking 0.08em.
6. Fluid scale only; check mobile at 360px that nothing overflows.
7. Use `text-wrap: balance` on headings.

## 8. PAGE-BY-PAGE CHANGES
### Landing
Loader → hero stack → marquee → features list with counters → press/proof rows with cursor-follow preview → pinned horizontal cases gallery → counters → team/story → CTA with underline form → giant footer wordmark.
### Pricing
Dark gradient or sky background with grain, display-type title with script word, square-segmented billing toggle, 3 glass cards (middle taller and raised, pink rim), hollow-square check lists, FAQ accordion with animated rules, curve line passing behind cards.
### Dashboard
Paper/ink split, left rail with square bullets, 2x2 data cards, chunky gradient shapes that grow from baseline, black pill on active values, counters, subtle tilt on hover, kept calm (less texture than marketing pages).
### Settings
Calm paper layout, thin rules, boxed inputs, black toggles with spring, vermilion destructive text, same header and footer shell, minimal motion (fades and 12px rises).
### Any other pages
Use the "Content / detail" skeleton and the shared shell.

## 9. SMOOTH FPS REQUIREMENTS (HARD RULES)
1. One animation loop: Lenis `raf` called from `gsap.ticker`. No separate rAF loops for scroll effects.
2. `gsap.ticker.lagSmoothing(0)` and `ScrollTrigger.config({ ignoreMobileResize: true })`.
3. Only `transform`, `opacity`, `clip-path` (small layers) and `filter` (tiny layers) are animated.
4. No `box-shadow`, `width`, `height`, `top`, `left`, `margin` animation.
5. Use `quickTo` for cursor-follow elements.
6. Promote only active layers; remove `will-change` after animations finish.
7. Cap WebGL pixel ratio at 1.75; pause rendering off-screen.
8. Pause marquees, videos and canvas when not in view.
9. Avoid layout reads in scroll handlers; cache sizes.
10. Lazy-load below-the-fold images and heavy libraries (dynamic import for Three.js).
11. Keep total JS for first paint under 200KB gzipped where possible.
12. Test on throttled CPU (4x slowdown) in DevTools. Target steady 60fps; fix any frame over 20ms.
13. Disable heavy effects (grain animation, WebGL dither) on low-power devices or when `prefers-reduced-motion` is set.

## 10. DO
- Do follow DESIGN.md tokens for every value.
- Do keep one dominant focal element per viewport.
- Do make type huge, tight and confident.
- Do reveal content with masked line rises and clip-path image reveals.
- Do give every interactive element hover, focus and active states.
- Do keep the curve line subtle enough to never harm readability.
- Do keep forms usable: labels, errors, autofill, keyboard.
- Do test every page at 360, 768, 1280, 1920.
- Do keep the same header, footer, rules, labels and spacing on every page.
- Do write specific copy for [PROJECT_NAME], short and human.

## 11. DON'T
- Don't copy any text, images, SVGs, logos, layouts pixel-for-pixel or code from the reference sites.
- Don't use default fonts or more than 3 families.
- Don't use purple-blue gradients, glassy blobs, emoji icons or stock illustrations.
- Don't build identical card grids with an icon on top.
- Don't animate layout properties or use heavy box-shadow animations.
- Don't run multiple scroll libraries or multiple rAF loops.
- Don't block the main thread with large synchronous work during the loader.
- Don't autoplay audio.
- Don't hide key content behind hover only.
- Don't make the curve line cross text so it hurts legibility.
- Don't over-grain: noise must stay under 6% opacity.
- Don't use vermilion for large fills.
- Don't ship horizontal scrollbars on mobile.
- Don't leave console errors, warnings or layout shift.
- Don't make it look AI generated: no generic hero copy, no symmetrical template sections, no sparkle icons.

## 12. VERIFICATION CHECKLIST (RUN BEFORE FINISHING)
- [ ] Loader sequence works, wipes into hero, no flash of unstyled content.
- [ ] Curve line draws smoothly with scroll, tip dot follows, nodes fill on reach.
- [ ] Page transitions work in both directions and preserve scroll.
- [ ] Every title is display type with a written-on script word.
- [ ] Tilted grayscale image wall, grain, scanlines, glow and halftone present on landing.
- [ ] All pages share the same shell.
- [ ] Performance profile shows no long tasks during scroll or transitions.
- [ ] Reduced-motion mode verified.
- [ ] Keyboard navigation verified.
- [ ] README lists assumptions, asset placeholders and how to swap artwork.

## 13. OUTPUT
Deliver the full working code changes, `tokens.css`, motion config (`motion.ts`), components (Loader, CurveLine, PageTransition, ScriptWord, Header, Footer, GrainOverlay, Marquee, Counter), restyled pages, and a short README.
At the end, list what you changed per page and anything you could not verify.
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-11-09T12:03:28+04:00.

The user's current state is as follows:
Active Document: c:\Users\JAIBAJRANG\Desktop\Work\OmniSurge\contracts\hardhat.config.js (LANGUAGE_UNSPECIFIED)
Cursor is on line: 1
Other open documents:
- c:\Users\JAIBAJRANG\Desktop\Work\OmniSurge\frontend\src\components\ScriptWord.tsx (LANGUAGE_UNSPECIFIED)
- c:\Users\JAIBAJRANG\Desktop\Work\OmniSurge\frontend\src\components\OmniNav.tsx (LANGUAGE_UNSPECIFIED)
- c:\Users\JAIBAJRANG\Desktop\Work\OmniSurge\frontend\src\components\PricingView.tsx (LANGUAGE_UNSPECIFIED)
- c:\Users\JAIBAJRANG\Desktop\Work\OmniSurge\frontend\src\components\Hero3DVisual.tsx (LANGUAGE_UNSPECIFIED)
- c:\Users\JAIBAJRANG\Desktop\Work\OmniSurge\frontend\src\app\settings\page.tsx (LANGUAGE_UNSPECIFIED)
</ADDITIONAL_METADATA>