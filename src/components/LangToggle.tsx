import { motion } from 'framer-motion';
import { useLocale } from '../i18n/LocaleProvider';
import { LOCALES, HTML_LANG } from '../i18n/locales';
import { ui } from '../i18n/ui';
import { SPRING_SNAPPY } from './motion';

/** Seletor de idioma no mesmo segmented control do tema (PT / EN / ES). */
export function LangToggle() {
  const { locale, setLocale, t } = useLocale();
  return (
    <div className="seg" role="radiogroup" aria-label={t.prefs.language}>
      {LOCALES.map((code) => (
        <button key={code} type="button" role="radio" aria-checked={locale === code}
          aria-label={ui[code].langName} title={ui[code].langName} lang={HTML_LANG[code]}
          className="seg-opt seg-txt" onClick={() => setLocale(code)}>
          {locale === code && <motion.span layoutId="lang-pill" className="seg-pill" transition={SPRING_SNAPPY} />}
          <span>{code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
