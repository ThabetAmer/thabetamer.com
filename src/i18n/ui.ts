import en from './en.json';
import ar from './ar.json';

export type Lang = 'en' | 'ar';

const translations: Record<Lang, typeof en> = { en, ar };

/**
 * Get a translated string by key path (e.g., 'hero.name')
 */
export function t(lang: Lang, key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key; // Return key if not found
    }
  }

  return typeof value === 'string' ? value : key;
}

/**
 * Get the text direction for a language
 */
export function getDir(lang: Lang): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

/**
 * Get the opposite language for toggle
 */
export function getOtherLang(lang: Lang): Lang {
  return lang === 'en' ? 'ar' : 'en';
}

/**
 * Get the path for the other language
 */
export function getOtherLangPath(lang: Lang, currentPath: string): string {
  if (lang === 'en') {
    // Currently English, link to Arabic
    return '/ar' + (currentPath === '/' ? '/' : currentPath);
  } else {
    // Currently Arabic, link to English
    return currentPath.replace(/^\/ar\/?/, '/') || '/';
  }
}

/**
 * Get the full translation object for a section
 */
export function getSection<K extends keyof typeof en>(lang: Lang, section: K): typeof en[K] {
  return translations[lang][section];
}
