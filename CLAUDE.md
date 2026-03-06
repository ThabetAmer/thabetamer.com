# Project: thabetamer.com

Personal portfolio site for Thabet Amer — Technical Leader & Solutions Architect.

## Stack

- **Framework:** Astro 5 (SSR on Cloudflare via `@astrojs/cloudflare`)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin, no `tailwind.config` — config lives in `src/styles/global.css` under `@theme inline`)
- **Interactive islands:** React 19 (`@astrojs/react`), used sparingly with `client:visible` or `client:load`
- **Hosting:** Cloudflare Pages (Wrangler for dev/deploy)
- **Build:** `npx astro build` → verify with `npx astro dev`

## Architecture

### Dual-language, dual-rendering

| Route | Language | Components | Interactivity |
|-------|----------|------------|---------------|
| `/` (EN) | English | React `.tsx` for GlobalMap, Portfolio, Counter, ThemeToggle | Hydrated via `client:visible` / `client:load` |
| `/ar/` (AR) | Arabic | Static `.astro` versions of the same components | No React hydration — pure server-rendered HTML + `<script>` |

There is **no duplication on a single page**. EN uses React islands; AR uses Astro static components. Both share the same data layer and layout.

### Key directories

```
src/
├── components/     # .astro (static) + .tsx (React islands)
├── data/           # TypeScript data files (work, credentials, experience, brands, etc.)
├── i18n/           # en.json, ar.json, ui.ts (t() helper + Lang type)
├── layouts/        # BaseLayout.astro (single layout)
├── pages/          # index.astro (EN), ar/index.astro (AR)
└── styles/         # global.css (Tailwind v4 theme + animations)
public/images/      # Static assets (profile, project screenshots, credentials, world-map SVGs)
```

### i18n pattern

- `src/i18n/ui.ts` exports `t(lang, key)` and `type Lang = 'en' | 'ar'`
- Translations in `src/i18n/en.json` and `src/i18n/ar.json`
- `lang` prop is threaded through all components
- RTL handled via `dir={getDir(lang)}` on `<html>`

## Conventions

### Hydration directives
- `client:load` — only for above-fold interactive components (ThemeToggle)
- `client:visible` — for below-fold components (GlobalMap, Portfolio, Counter)
- AR page uses zero React hydration — everything is `.astro` + inline `<script>`

### Event listener cleanup pattern
Components with `astro:after-swap` re-init use a cleanup array pattern:
```js
let _cleanups: (() => void)[] = [];
function init() {
  _cleanups.forEach(fn => fn());
  _cleanups = [];
  // ... add listeners, push cleanup fns to _cleanups
}
init();
document.addEventListener('astro:after-swap', init);
```

### Fonts
- Google Fonts loaded via `<link rel="stylesheet">` in BaseLayout `<head>` (not CSS `@import`)
- Plus Jakarta Sans (EN), Noto Sans Arabic (AR, conditional)
- `display=swap` in the Google Fonts URL handles FOIT

### CSS / Tailwind v4
- Theme config in `src/styles/global.css` under `@theme inline { ... }`
- CSS variables for colors, spacing, typography in `:root` / `.dark`
- Dark mode via `.dark` class on `<html>`, toggled by ThemeToggle
- Custom variant: `@custom-variant dark (&:is(.dark *))`
- Scroll animations: `.animate-on-scroll` + IntersectionObserver adds `.is-visible`

### Images
- Project card images: use `width="640" height="360"` + `loading="lazy"`
- Profile image via Astro `<Image>` component with `width={320} height={320}` + `loading="eager"`
- Credential images via Astro `<Image>` with theme variants (light/dark)

## Performance guidelines

- Avoid CSS `@import` for external resources — use `<link>` tags
- Always clean up IntersectionObservers (`.disconnect()`) and event listeners before re-init
- React `useEffect` must return cleanup functions (not inside `.forEach`)
- Cancel `requestAnimationFrame` on component unmount
- Use `{ passive: true }` on scroll listeners that don't call `preventDefault()`
- Avoid layout thrashing: set `display: block` before animating opacity/transform; use `transitionend` or timeout for hide
- Add explicit `width`/`height` to `<img>` tags to prevent CLS

## Commands

```bash
npm run dev        # Local dev server (Astro)
npm run build      # Production build (npx astro build)
npm run preview    # Preview production build
```
