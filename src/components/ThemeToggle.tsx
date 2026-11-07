import { motion } from 'framer-motion';
import { useState, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { Icon, type IconName } from './Icon';
import { EASE_OUT, SPRING_SNAPPY } from './motion';
import { useLocale } from '../i18n/LocaleProvider';

type Pref = 'light' | 'dark' | 'auto';
const KEY = 'theme';
const OPTIONS: { value: Pref; icon: IconName }[] = [
  { value: 'light', icon: 'sun' },
  { value: 'dark', icon: 'moon' },
  { value: 'auto', icon: 'auto' },
];

function readPref(): Pref {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : 'auto';
  } catch { return 'auto'; }
}

function applyPref(p: Pref) {
  const root = document.documentElement;
  if (p === 'auto') delete root.dataset.theme; else root.dataset.theme = p;
  try { if (p === 'auto') localStorage.removeItem(KEY); else localStorage.setItem(KEY, p); } catch { /* sem storage */ }
}

/** Segmented control estilo iOS (Claro / Escuro / Automático) com revelação circular. */
export function ThemeToggle() {
  const [pref, setPref] = useState<Pref>(readPref);
  const { t } = useLocale();

  const choose = (p: Pref, e: MouseEvent<HTMLButtonElement>) => {
    if (p === pref) return;
    const run = () => { flushSync(() => setPref(p)); applyPref(p); };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduced) { run(); return; }

    // Clique de teclado não tem coordenadas: usa o centro do botão.
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || r.left + r.width / 2;
    const y = e.clientY || r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(run).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 520, easing: `cubic-bezier(${EASE_OUT.join(',')})`, pseudoElement: '::view-transition-new(root)' },
      );
    }).catch(() => {});
  };

  return (
    <div className="seg" role="radiogroup" aria-label={t.prefs.theme}>
      {OPTIONS.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={pref === o.value} aria-label={t.prefs[o.value]} title={t.prefs[o.value]}
          className="seg-opt" onClick={(e) => choose(o.value, e)}>
          {pref === o.value && <motion.span layoutId="theme-pill" className="seg-pill" transition={SPRING_SNAPPY} />}
          <Icon name={o.icon} />
        </button>
      ))}
    </div>
  );
}
