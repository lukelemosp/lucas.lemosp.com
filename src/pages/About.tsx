import { Anim, reveal } from '../components/motion';
import { career, careerStats, certifications, education, languages, routes } from '../content/site';
import { useLocale } from '../i18n/LocaleProvider';
import { DocPage, Timeline } from './DocPage';

function useAboutCrumbs() {
  const { t } = useLocale();
  return [{ label: t.nav.home, to: routes.home }, { label: t.nav.about }];
}

export function Career() {
  const { t, l } = useLocale();
  return (
    <DocPage crumbs={[...useAboutCrumbs(), { label: t.nav.career }]} eyebrow={t.nav.about} title={t.pages.careerTitle} icon="route"
      meta={careerStats.map((s) => ({ icon: s.icon, label: l(s.label) }))}>
      <Timeline items={career} />
    </DocPage>
  );
}

export function Certifications() {
  const { t, l, month } = useLocale();
  return (
    <DocPage crumbs={[...useAboutCrumbs(), { label: t.nav.certs }]} eyebrow={t.nav.about} title={t.pages.certsTitle} icon="award"
      meta={[{ icon: 'award', label: '4× Salesforce Certified' }, { icon: 'trophy', label: t.pages.allStar }]}>
      <div className="list big-list">
        {certifications.map((c) => (
          <Anim className="item" key={c.name} {...reveal}>
            <span className={`seal ${c.kind}`}>{c.seal}</span>
            <div><div className="i1">{c.name}</div><div className="i2">{l(c.issuer)}</div></div>
            <span className="yr">{month(c.date)}</span>
          </Anim>
        ))}
      </div>
    </DocPage>
  );
}

export function Education() {
  const { t, l } = useLocale();
  return (
    <DocPage crumbs={[...useAboutCrumbs(), { label: t.nav.edu }]} eyebrow={t.nav.about} title={t.pages.eduTitle} icon="grad">
      <Timeline items={education} />
      <h2>{t.pages.languages}</h2>
      <div className="list">
        {languages.map((lg) => (
          <div className="item lang" key={lg.code}>
            <span className="code">{lg.code}</span><span className="i1">{l(lg.name)}</span><span className="lv">{l(lg.levelLong)}</span>
          </div>
        ))}
      </div>
    </DocPage>
  );
}
