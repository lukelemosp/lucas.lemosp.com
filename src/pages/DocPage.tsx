import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon, type IconName } from '../components/Icon';
import { Anim, AnimArticle, AnimLi, item, NumText, reveal } from '../components/motion';
import type { TimelineItem } from '../content/site';
import { useZoomTarget } from '../components/zoom';
import { useLocale } from '../i18n/LocaleProvider';

type Crumb = { label: string; to?: string };

/** Shared frame for content pages: breadcrumb + document card. */
export function DocPage({ crumbs, eyebrow, title, icon, appIcon, meta, children }: {
  crumbs: Crumb[]; eyebrow: string; title: string; icon?: IconName; appIcon?: boolean;
  meta?: { icon: IconName; label: string }[]; children: ReactNode;
}) {
  const logoRef = useRef<HTMLDivElement>(null);
  const { t } = useLocale();
  useZoomTarget(useLocation().pathname, logoRef);
  return (
    <div className="page-inner">
      <Anim className="crumbs" role="navigation" aria-label={t.nav.youAreHere} {...item}>
        {crumbs.map((c, i) => (
          <span key={c.label} style={{ display: 'contents' }}>
            {i > 0 && <Icon name="chev" />}
            {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current={i === crumbs.length - 1 ? 'page' : undefined}>{c.label}</span>}
          </span>
        ))}
      </Anim>
      <AnimArticle className="card doc" {...item}>
        <div className="doc-head">
          {appIcon ? <span className="app-icon" /> : <div className="co-logo" ref={logoRef}>{icon && <Icon name={icon} />}</div>}
          <div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1></div>
        </div>
        {meta && <div className="meta">{meta.map((m) => <span className="fact" key={m.label}><Icon name={m.icon} /><NumText text={m.label} /></span>)}</div>}
        {children}
      </AnimArticle>
    </div>
  );
}

/** Linha da timeline que se "desenha" conforme a página rola (o .view é o contêiner de scroll). */
function useDrawProgress(ref: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();
  const progress = useMotionValue(reduced ? 1 : 0);
  const scaleY = useSpring(progress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  useEffect(() => {
    const el = ref.current;
    const view = el?.closest('.view');
    if (!el || !view) return;
    if (reduced) { progress.jump(1); scaleY.jump(1); return; }
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.8 - r.top) / r.height;
      progress.set(Math.min(1, Math.max(0, p)));
    };
    update();
    view.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { view.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [ref, progress, scaleY, reduced]);
  return scaleY;
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const scaleY = useDrawProgress(ref);
  const { t, l, month } = useLocale();
  return (
    <ul className="timeline" ref={ref}>
      <motion.li className="tl-line" aria-hidden="true" role="presentation" style={{ scaleY }} />
      {items.map((q) => (
        <AnimLi className={`q${q.current ? ' now' : ''}`} key={q.from} {...reveal}>
          <span className="dot" />
          <div className="when">
            {month(q.from)} — {q.to === 'current' ? t.dates.present : month(q.to)}
            {q.badge && <span className="st">{t.dates.current}</span>}
          </div>
          <div className="r">{l(q.title)}</div>
          <div className="c">{l(q.org)}</div>
          {q.detail && <p className="d">{l(q.detail)}</p>}
        </AnimLi>
      ))}
    </ul>
  );
}
