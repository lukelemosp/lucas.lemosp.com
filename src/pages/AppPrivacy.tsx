import { Fragment, type ReactNode } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { apps, routes } from '../content/site';
import { useLocale } from '../i18n/LocaleProvider';
import { fmtDate } from '../i18n/locales';
import { ui } from '../i18n/ui';
import { DocPage } from './DocPage';

/** Renderiza **negrito** e [texto](url) inline. */
function rich(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = /^https?:/.test(link[2]);
      return <a key={i} href={link[2]} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{link[1]}</a>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function AppPrivacy() {
  const { slug } = useParams();
  const { t, locale } = useLocale();
  const app = apps.find((a) => a.slug === slug);
  if (!app) return <Navigate to={routes.home} replace />;
  const p = app.privacy;
  const pt = ui.pt.privacy;

  return (
    <DocPage
      crumbs={[{ label: t.nav.home, to: routes.home }, { label: t.nav.apps }, { label: app.name }, { label: t.nav.privacy }]}
      eyebrow={app.name} title={t.nav.privacy} appIcon
      meta={[
        { icon: 'clock', label: t.privacy.updated(fmtDate(p.updated, locale)) },
        ...(app.packageId ? [{ icon: 'play' as const, label: app.packageId }] : []),
        ...(p.isSample ? [{ icon: 'info' as const, label: t.privacy.sample }] : []),
      ]}>
      {t.privacy.ptOnly && <div className="callout"><Icon name="lang" /><p>{t.privacy.ptOnly}</p></div>}
      {/* O documento em si existe só em português. */}
      <div lang="pt-BR">
      <div className="callout"><Icon name="info" /><p><strong>{pt.summary}</strong> {rich(p.summary)}</p></div>
      {p.sections.map((s) => (
        <section key={s.title}>
          <h2>{s.title}</h2>
          {s.paragraphs?.map((t) => <p key={t}>{rich(t)}</p>)}
          {s.bullets && <ul className="bul">{s.bullets.map((b) => <li key={b}>{rich(b)}</li>)}</ul>}
          {s.after?.map((t) => <p key={t}>{rich(t)}</p>)}
        </section>
      ))}
      </div>
    </DocPage>
  );
}
