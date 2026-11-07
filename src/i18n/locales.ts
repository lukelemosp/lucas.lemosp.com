/**
 * Idiomas do site. A detecção usa o idioma do navegador (não a localização por IP):
 * 1. `?lang=xx` na URL (para links de currículo/LinkedIn em outro idioma);
 * 2. a escolha manual salva no aparelho;
 * 3. `navigator.languages` (pt* → pt, es* → es);
 * 4. inglês para todo o resto.
 * O mesmo algoritmo roda no script inline do index.html para evitar flash.
 */
export const LOCALES = ['pt', 'en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

/** Texto localizado. Uma string simples vale para todos os idiomas (nomes próprios, siglas). */
export type L<T = string> = Record<Locale, T>;
export type Text = string | L;

export const HTML_LANG: L = { pt: 'pt-BR', en: 'en', es: 'es' };
const KEY = 'lang';

const isLocale = (v: unknown): v is Locale => LOCALES.includes(v as Locale);

function fromTag(tag: string): Locale | null {
  const base = tag.toLowerCase().split('-')[0];
  return isLocale(base) ? base : null;
}

export function urlLocale(): Locale | null {
  const v = new URLSearchParams(window.location.search).get('lang');
  return v ? fromTag(v) : null;
}

export function detectLocale(): Locale {
  const fromUrl = urlLocale();
  if (fromUrl) return fromUrl;
  try {
    const saved = localStorage.getItem(KEY);
    if (isLocale(saved)) return saved;
  } catch { /* sem storage */ }
  for (const tag of navigator.languages ?? [navigator.language]) {
    const l = tag && fromTag(tag);
    if (l) return l;
  }
  return 'en';
}

export function saveLocale(l: Locale) {
  try { localStorage.setItem(KEY, l); } catch { /* sem storage */ }
}

export function pick<T>(x: T | L<T>, locale: Locale): T {
  return x !== null && typeof x === 'object' && !Array.isArray(x) && locale in (x as object) ? (x as L<T>)[locale] : (x as T);
}

/** `2025-08` → "ago. 2025" / "Aug 2025" / "ago 2025". Outros valores (ex.: "2026") passam direto. */
export function fmtMonth(ym: string, locale: Locale): string {
  const m = ym.match(/^(\d{4})-(\d{2})$/);
  if (!m) return ym;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, 1));
  const month = new Intl.DateTimeFormat(HTML_LANG[locale], { month: 'short', timeZone: 'UTC' }).format(d);
  return `${month} ${m[1]}`;
}

/** `2026-11-02` → data por extenso no idioma. */
export function fmtDate(iso: string, locale: Locale): string {
  const [y, mo, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(HTML_LANG[locale], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(y, mo - 1, d)));
}
