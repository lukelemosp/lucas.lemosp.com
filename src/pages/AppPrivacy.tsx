import { Fragment, type ReactNode } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { apps, routes } from '../content/site';
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
  const app = apps.find((a) => a.slug === slug);
  if (!app) return <Navigate to={routes.home} replace />;
  const p = app.privacy;

  return (
    <DocPage
      crumbs={[{ label: 'Início', to: routes.home }, { label: 'Aplicativos' }, { label: app.name }, { label: 'Política de Privacidade' }]}
      eyebrow={app.name} title="Política de Privacidade" appIcon
      meta={[
        { icon: 'clock', label: `Atualizada em ${p.updated}` },
        ...(app.packageId ? [{ icon: 'play' as const, label: app.packageId }] : []),
        ...(p.isSample ? [{ icon: 'info' as const, label: 'Texto de exemplo' }] : []),
      ]}>
      <div className="callout"><Icon name="info" /><p><strong>Resumo:</strong> {rich(p.summary)}</p></div>
      {p.sections.map((s) => (
        <section key={s.title}>
          <h2>{s.title}</h2>
          {s.paragraphs?.map((t) => <p key={t}>{rich(t)}</p>)}
          {s.bullets && <ul className="bul">{s.bullets.map((b) => <li key={b}>{rich(b)}</li>)}</ul>}
          {s.after?.map((t) => <p key={t}>{rich(t)}</p>)}
        </section>
      ))}
    </DocPage>
  );
}
