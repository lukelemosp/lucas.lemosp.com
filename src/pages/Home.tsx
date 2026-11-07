import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { motion } from 'framer-motion';
import { AnimArticle, item, NumText, press, SPRING_SNAPPY } from '../components/motion';
import { useToast } from '../components/Toast';
import { startZoom } from '../components/zoom';
import {
  certifications, current, highlights, languages, profile, projects, routes, sideQuest, skills, socials, education,
} from '../content/site';
import { useLocale } from '../i18n/LocaleProvider';

const featured = certifications.filter((c) => c.featured);

/** Link do cabeçalho de um tile: o ícone do tile "voa" até o cabeçalho da página (zoom). */
function TileLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="link-btn" to={to}
      onClick={(e) => startZoom(to, e.currentTarget.closest('.tile')?.querySelector('.tile-head > .icon'))}>
      {children}<Icon name="arrow" />
    </Link>
  );
}

/** Botão de e-mail dividido: abre o cliente de e-mail ou copia o endereço. */
function EmailButton({ href, label }: { href: string; label: string }) {
  const toast = useToast();
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);
  const address = href.replace(/^mailto:/, '');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      toast({ title: t.home.emailCopied, detail: address, icon: 'check' });
    } catch {
      window.location.href = href;
    }
  };
  return (
    <div className="social split">
      <motion.a className="split-main" href={href} whileTap={{ scale: 0.98 }} transition={SPRING_SNAPPY}>
        <Icon name="mail" /><span className="lbl">{label}</span>
      </motion.a>
      <motion.button type="button" className="split-copy" aria-label={t.home.copyEmail} title={t.home.copyEmail}
        whileTap={{ scale: 0.88 }} transition={SPRING_SNAPPY} onClick={copy}>
        <Icon name={copied ? 'check' : 'copy'} />
      </motion.button>
    </div>
  );
}

export function Home() {
  const { t, l, month } = useLocale();
  return (
    <div className="home">
      <AnimArticle className="card tile profile" {...item}>
        <img className="portrait" src={profile.avatar} alt={t.home.photoOf(profile.name)} width={104} height={104} />
        <div><span className="status"><i />{l(profile.status)}</span></div>
        <h1 className="hero-title">{profile.firstName} <span>{profile.lastName}</span></h1>
        <div className="role">{l(profile.role)}</div>
        <p className="bio">{l(profile.bio)}</p>
        <div className="facts">
          {profile.facts.map((f) => <span className="fact" key={f.icon}><Icon name={f.icon} />{l(f.label)}</span>)}
        </div>

        <div className="highlights">
          <span className="eyebrow">{t.home.highlights}</span>
          {highlights.map((h) => (
            <div className="hl" key={l(h.title)}>
              <span className="ic"><Icon name={h.icon} /></span>
              <div><div className="t1">{l(h.title)}</div><div className="t2">{l(h.detail)}</div></div>
              <span className="when">{month(h.when)}</span>
            </div>
          ))}
        </div>

        <div className="contact">
          <span className="eyebrow">{t.home.contact}</span>
          <div className="socials">
            {socials.map((s) => s.href.startsWith('mailto:') ? <EmailButton key={s.id} href={s.href} label={s.label} /> : (
              <motion.a key={s.id} className={`social${s.primary ? ' primary' : ''}`} href={s.href} {...press}
                {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <Icon name={s.icon} /><span className="lbl">{s.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </AnimArticle>

      <div className="bento">
        <AnimArticle className="card tile t-now" {...item}>
          <div className="tile-head"><Icon name="brief" /><span className="eyebrow">{t.home.now}</span>
            <TileLink to={routes.career}>{t.nav.career}</TileLink></div>
          <div className="now-body">
            <div className="co-logo">{current.logo}</div>
            <div>
              <div className="now-role">{l(current.role)}</div>
              <div className="now-meta">{current.company} · {t.dates.since(month(current.since))}</div>
              <div className="tags">{l(current.tags).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            </div>
          </div>
        </AnimArticle>

        <AnimArticle className="card tile t-side" {...item}>
          <div className="tile-head"><Icon name="gamepad" /><span className="eyebrow">{t.home.parallel}</span></div>
          <div className="side-big"><NumText text={sideQuest.years} /><small>{t.home.years}</small></div>
          <p className="side-txt"><b>{l(sideQuest.title)}</b> {l(sideQuest.detail)}</p>
        </AnimArticle>

        <AnimArticle className="card tile t-proj" {...item}>
          <div className="tile-head"><Icon name="folder" /><span className="eyebrow">{t.home.projects}</span></div>
          <div className="proj-grid">
            {projects.map((p) => (
              <div className="proj" key={p.id}>
                <div className="proj-head">
                  <span className="ic"><Icon name={p.icon} /></span>
                  <div><div className="i1">{l(p.title)}</div><div className="i2">{l(p.org)}</div></div>
                  <span className="yr">{p.year}</span>
                </div>
                <p className="proj-txt">{l(p.summary)}</p>
                <div className="tags">{l(p.tags).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              </div>
            ))}
          </div>
        </AnimArticle>

        <AnimArticle className="card tile t-cert" {...item}>
          <div className="tile-head"><Icon name="award" /><span className="eyebrow">{t.home.certs}</span>
            <TileLink to={routes.certifications}>{t.home.seeAll} <NumText text={certifications.length} /></TileLink></div>
          <div className="list">
            {featured.map((c) => (
              <div className="item" key={c.name}>
                <span className={`seal ${c.kind}`}>{c.seal}</span>
                <div><div className="i1">{c.short}</div><div className="i2">{l(c.issuer)}</div></div>
                <span className="yr">{c.date.slice(0, 4)}</span>
              </div>
            ))}
          </div>
        </AnimArticle>

        <AnimArticle className="card tile t-skill" {...item}>
          <div className="tile-head"><Icon name="layers" /><span className="eyebrow">{t.home.skills}</span></div>
          <div className="list">
            {skills.map((s) => (
              <div className="item skill" key={s.icon}>
                <span className="ic"><Icon name={s.icon} /></span>
                <div><div className="i1">{l(s.title)}</div><div className="i2">{l(s.detail)}</div></div>
              </div>
            ))}
          </div>
        </AnimArticle>

        <AnimArticle className="card tile t-lang" {...item}>
          <div className="tile-head"><Icon name="lang" /><span className="eyebrow">{t.home.languages}</span></div>
          <div className="list">
            {languages.map((lg) => (
              <div className="item lang" key={lg.code}>
                <span className="code">{lg.code}</span><span className="i1">{l(lg.name)}</span><span className="lv">{l(lg.level)}</span>
              </div>
            ))}
          </div>
        </AnimArticle>

        <AnimArticle className="card tile t-edu" {...item}>
          <div className="tile-head"><Icon name="grad" /><span className="eyebrow">{t.home.edu}</span>
            <TileLink to={routes.education}>{t.home.details}</TileLink></div>
          <div className="list">
            {education.map((e) => (
              <div className="item" key={e.from}>
                <span className="ic neutral"><Icon name="grad" /></span>
                <div><div className="i1">{l(e.short?.title ?? e.title)}</div><div className="i2">{l(e.short?.detail ?? e.org)}</div></div>
              </div>
            ))}
          </div>
        </AnimArticle>
      </div>
    </div>
  );
}
