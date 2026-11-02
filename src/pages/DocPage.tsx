import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon, type IconName } from '../components/Icon';
import { Anim, AnimArticle, AnimLi, item } from '../components/motion';
import type { TimelineItem } from '../content/site';

type Crumb = { label: string; to?: string };

/** Shared frame for content pages: breadcrumb + document card. */
export function DocPage({ crumbs, eyebrow, title, icon, appIcon, meta, children }: {
  crumbs: Crumb[]; eyebrow: string; title: string; icon?: IconName; appIcon?: boolean;
  meta?: { icon: IconName; label: string }[]; children: ReactNode;
}) {
  return (
    <div className="page-inner">
      <Anim className="crumbs" role="navigation" aria-label="Você está em" {...item}>
        {crumbs.map((c, i) => (
          <span key={c.label} style={{ display: 'contents' }}>
            {i > 0 && <Icon name="chev" />}
            {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current={i === crumbs.length - 1 ? 'page' : undefined}>{c.label}</span>}
          </span>
        ))}
      </Anim>
      <AnimArticle className="card doc" {...item}>
        <div className="doc-head">
          {appIcon ? <span className="app-icon" /> : <div className="co-logo">{icon && <Icon name={icon} />}</div>}
          <div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1></div>
        </div>
        {meta && <div className="meta">{meta.map((m) => <span className="fact" key={m.label}><Icon name={m.icon} />{m.label}</span>)}</div>}
        {children}
      </AnimArticle>
    </div>
  );
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ul className="timeline">
      {items.map((q) => (
        <AnimLi className={`q${q.current ? ' now' : ''}`} key={q.title + q.when} {...item}>
          <span className="dot" />
          <div className="when">{q.when}{q.badge && <span className="st">{q.badge}</span>}</div>
          <div className="r">{q.title}</div>
          <div className="c">{q.org}</div>
          {q.detail && <p className="d">{q.detail}</p>}
        </AnimLi>
      ))}
    </ul>
  );
}
