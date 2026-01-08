// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false // English at /, Arabic at /ar/
    }
  },

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});