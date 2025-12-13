import { type Language } from './translations'

export const localeToLanguageMap: Record<string, Language> = {
  'ru': 'RU',
  'uk': 'UA',
}

export const languageToLocaleMap: Record<Language, string> = {
  'RU': 'ru',
  'UA': 'uk',
  'EN': 'en',
  'NL': 'nl',
  'DE': 'de',
  'FR': 'fr',
  'ES': 'es',
  'IT': 'it',
  'PT': 'pt',
  'PL': 'pl',
  'CZ': 'cs',
  'HU': 'hu',
  'RO': 'ro',
  'BG': 'bg',
  'HR': 'hr',
  'SK': 'sk',
  'SL': 'sl',
  'ET': 'et',
  'LV': 'lv',
  'LT': 'lt',
  'FI': 'fi',
  'SV': 'sv',
  'DA': 'da',
  'NO': 'no',
  'GR': 'el',
}

export const supportedLocales = ['ru', 'uk']

/**
 * Создает локализованный URL с учетом текущей локали
 * @param href - путь без локали (например, "/about")
 * @param currentPathname - текущий путь (например, "/ru/about")
 * @returns локализованный URL (например, "/ru/about")
 */
export function createLocalizedUrl(href: string, currentPathname: string): string {
  const locale = getLocaleFromPath(currentPathname) || 'nl'
  return `/${locale}${href}`
}

/**
 * Извлекает локаль из пути
 * @param pathname - путь (например, "/ru/about")
 * @returns локаль (например, "ru") или null если не найдена
 */
export function getLocaleFromPath(pathname: string): string | null {
  const pathSegments = pathname.split('/').filter(Boolean)
  const locale = pathSegments[0]
  
  if (locale && supportedLocales.includes(locale)) {
    return locale
  }
  
  return null
}

/**
 * Извлекает путь без локали
 * @param pathname - путь с локалью (например, "/ru/about")
 * @returns путь без локали (например, "/about")
 */
export function getPathWithoutLocale(pathname: string): string {
  const locale = getLocaleFromPath(pathname)
  
  if (locale) {
    return pathname.replace(`/${locale}`, '') || '/'
  }
  
  return pathname
}
