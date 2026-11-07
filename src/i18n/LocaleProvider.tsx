import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { detectLocale, fmtMonth, HTML_LANG, pick, saveLocale, type L, type Locale } from './locales';
import { ui, type UiStrings } from './ui';

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Strings de interface do idioma atual. */
  t: UiStrings;
  /** Escolhe a versão do idioma atual de um texto do conteúdo. */
  l: <T>(x: T | L<T>) => T;
  /** Formata `YYYY-MM` como mês/ano no idioma atual. */
  month: (ym: string) => string;
};

const LocaleCtx = createContext<Ctx | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { document.documentElement.lang = HTML_LANG[locale]; }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    saveLocale(next);
    // A escolha manual prevalece sobre o ?lang= do link.
    const params = new URLSearchParams(location.search);
    if (params.has('lang')) {
      params.delete('lang');
      const search = params.toString();
      navigate({ pathname: location.pathname, search: search ? `?${search}` : '', hash: location.hash }, { replace: true });
    }
  }, [location, navigate]);

  const value = useMemo<Ctx>(() => ({
    locale, setLocale, t: ui[locale],
    l: <T,>(x: T | L<T>) => pick(x, locale),
    month: (ym: string) => fmtMonth(ym, locale),
  }), [locale, setLocale]);

  return <LocaleCtx.Provider value={value}>{children}</LocaleCtx.Provider>;
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleCtx);
  if (!ctx) throw new Error('useLocale precisa de <LocaleProvider>');
  return ctx;
}
