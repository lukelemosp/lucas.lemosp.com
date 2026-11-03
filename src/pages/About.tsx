import { Anim, reveal } from '../components/motion';
import { career, careerStats, certifications, education, languages, routes } from '../content/site';
import { DocPage, Timeline } from './DocPage';

const about = [{ label: 'Início', to: routes.home }, { label: 'Sobre mim' }];

export function Career() {
  return (
    <DocPage crumbs={[...about, { label: 'Trajetória' }]} eyebrow="Sobre mim" title="Trajetória profissional" icon="route" meta={careerStats}>
      <Timeline items={career} />
    </DocPage>
  );
}

export function Certifications() {
  return (
    <DocPage crumbs={[...about, { label: 'Certificações' }]} eyebrow="Sobre mim" title="Certificações" icon="award"
      meta={[{ icon: 'award', label: '4× Salesforce Certified' }, { icon: 'trophy', label: 'All Star Ranger no Trailhead' }]}>
      <div className="list big-list">
        {certifications.map((c) => (
          <Anim className="item" key={c.name} {...reveal}>
            <span className={`seal ${c.kind}`}>{c.seal}</span>
            <div><div className="i1">{c.name}</div><div className="i2">{c.issuer}</div></div>
            <span className="yr">{c.date}</span>
          </Anim>
        ))}
      </div>
    </DocPage>
  );
}

export function Education() {
  return (
    <DocPage crumbs={[...about, { label: 'Formação' }]} eyebrow="Sobre mim" title="Formação acadêmica" icon="grad">
      <Timeline items={education} />
      <h2>Idiomas</h2>
      <div className="list">
        {languages.map((l) => (
          <div className="item lang" key={l.code}>
            <span className="code">{l.code}</span><span className="i1">{l.name}</span><span className="lv">{l.levelLong}</span>
          </div>
        ))}
      </div>
    </DocPage>
  );
}
