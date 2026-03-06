# thabetamer.com

Personal portfolio website for Thabet Amer — built with Astro, React, and Tailwind CSS, deployed on Cloudflare.

## Tech Stack

- **Framework:** [Astro](https://astro.build) with SSR via Cloudflare adapter
- **UI:** [React](https://react.dev) interactive components + Astro static components
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
- **i18n:** Bilingual English/Arabic with RTL support
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com) via Wrangler

## Project Structure

```
src/
├── components/     # Astro + React components (Portfolio, GlobalMap, Hero, etc.)
├── data/           # Static data (work, experience, credentials, brands, writing)
├── i18n/           # Translations and locale utilities
├── layouts/        # Page layouts
├── pages/
│   ├── index.astro # English (default locale)
│   └── ar/         # Arabic locale
└── styles/         # Global styles
```

## Commands

| Command           | Action                                  |
| :---------------- | :-------------------------------------- |
| `npm install`     | Install dependencies                    |
| `npm run dev`     | Start dev server at `localhost:4321`    |
| `npm run build`   | Build production site to `./dist/`      |
| `npm run preview` | Preview production build locally        |

## Features

- Dark/light theme toggle
- Interactive world map showing project locations
- Filterable portfolio grid with lightbox modals
- Grayscale-to-color image hover effects
- Responsive, mobile-first design
- SEO optimized with sitemap generation
