import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { motion } from 'framer-motion';
import { AnimArticle, item, press, SPRING_SNAPPY } from '../components/motion';
import { useToast } from '../components/Toast';
import {
  certifications, current, highlights, languages, profile, routes, sideQuest, skills, socials, education,
} from '../content/site';

const featured = certifications.filter((c) => c.featured);

/** Botão de e-mail dividido: abre o cliente de e-mail ou copia o endereço. */
function EmailButton({ href, label }: { href: string; label: string }) {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const address = href.replace(/^mailto:/, '');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      toast({ title: 'E-mail copiado', detail: address, icon: 'check' });
    } catch {
      window.location.href = href;
    }
  };
  return (
    <div className="social split">
      <motion.a className="split-main" href={href} whileTap={{ scale: 0.98 }} transition={SPRING_SNAPPY}>
        <Icon name="mail" /><span className="lbl">{label}</span>
      </motion.a>
      <motion.button type="button" className="split-copy" aria-label="Copiar e-mail" title="Copiar e-mail"
        whileTap={{ scale: 0.88 }} transition={SPRING_SNAPPY} onClick={copy}>
        <Icon name={copied ? 'check' : 'copy'} />
      </motion.button>
    </div>
  );
}

export function Home() {
  return (
    <div className="home">
      <AnimArticle className="card tile profile" {...item}>
        <img className="portrait" src={profile.avatar} alt={`Foto de ${profile.name}`} width={104} height={104} />
        <div><span className="status"><i />{profile.status}</span></div>
        <h1 className="hero-title">{profile.firstName} <span>{profile.lastName}</span></h1>
        <div className="role">{profile.role}</div>
        <p className="bio">{profile.bio}</p>
        <div className="facts">
          {profile.facts.map((f) => <span className="fact" key={f.label}><Icon name={f.icon} />{f.label}</span>)}
        </div>

        <div className="highlights">
          <span className="eyebrow">Destaques recentes</span>
          {highlights.map((h) => (
            <div className="hl" key={h.title}>
              <span className="ic"><Icon name={h.icon} /></span>
              <div><div className="t1">{h.title}</div><div className="t2">{h.detail}</div></div>
              <span className="when">{h.when}</span>
            </div>
          ))}
        </div>

        <div className="contact">
          <span className="eyebrow">Vamos conversar</span>
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
          <div className="tile-head"><Icon name="brief" /><span className="eyebrow">Atualmente</span>
            <Link className="link-btn" to={routes.career}>Trajetória<Icon name="arrow" /></Link></div>
          <div className="now-body">
            <div className="co-logo">{current.logo}</div>
            <div>
              <div className="now-role">{current.role}</div>
              <div className="now-meta">{current.company} · {current.since}</div>
              <div className="tags">{current.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
            </div>
          </div>
        </AnimArticle>

        <AnimArticle className="card tile t-side" {...item}>
          <div className="tile-head"><Icon name="gamepad" /><span className="eyebrow">Em paralelo</span></div>
          <div className="side-big">{sideQuest.years}<small>anos</small></div>
          <p className="side-txt"><b>{sideQuest.title}</b> {sideQuest.detail}</p>
        </AnimArticle>

        <AnimArticle className="card tile t-cert" {...item}>
          <div className="tile-head"><Icon name="award" /><span className="eyebrow">Certificações</span>
            <Link className="link-btn" to={routes.certifications}>Ver as {certifications.length}<Icon name="arrow" /></Link></div>
          <div className="list">
            {featured.map((c) => (
              <div className="item" key={c.name}>
                <span className={`seal ${c.kind}`}>{c.seal}</span>
                <div><div className="i1">{c.short}</div><div className="i2">{c.issuer}</div></div>
                <span className="yr">{c.year}</span>
              </div>
            ))}
          </div>
        </AnimArticle>

        <AnimArticle className="card tile t-skill" {...item}>
          <div className="tile-head"><Icon name="layers" /><span className="eyebrow">Competências</span></div>
          <div className="list">
            {skills.map((s) => (
              <div className="item skill" key={s.title}>
                <span className="ic"><Icon name={s.icon} /></span>
                <div><div className="i1">{s.title}</div><div className="i2">{s.detail}</div></div>
              </div>
            ))}
          </div>
        </AnimArticle>

        <AnimArticle className="card tile t-lang" {...item}>
          <div className="tile-head"><Icon name="lang" /><span className="eyebrow">Idiomas</span></div>
          <div className="list">
            {languages.map((l) => (
              <div className="item lang" key={l.code}>
                <span className="code">{l.code}</span><span className="i1">{l.name}</span><span className="lv">{l.level}</span>
              </div>
            ))}
          </div>
        </AnimArticle>

        <AnimArticle className="card tile t-edu" {...item}>
          <div className="tile-head"><Icon name="grad" /><span className="eyebrow">Formação</span>
            <Link className="link-btn" to={routes.education}>Detalhes<Icon name="arrow" /></Link></div>
          <div className="list">
            {education.map((e) => (
              <div className="item" key={e.title}>
                <span className="ic neutral"><Icon name="grad" /></span>
                <div><div className="i1">{e.short?.title ?? e.title}</div><div className="i2">{e.short?.detail ?? e.org}</div></div>
              </div>
            ))}
          </div>
        </AnimArticle>
      </div>
    </div>
  );
}
