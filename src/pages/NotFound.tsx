import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { routes } from '../content/site';
import { useLocale } from '../i18n/LocaleProvider';
import { DocPage } from './DocPage';

export function NotFound() {
  const { t } = useLocale();
  return (
    <DocPage crumbs={[{ label: t.nav.home, to: routes.home }, { label: t.titles.notFound }]} eyebrow={t.notFound.eyebrow} title={t.titles.notFound} icon="route">
      <p>{t.notFound.text}</p>
      <p style={{ marginTop: 16 }}><Link className="link-btn" to={routes.home}>{t.notFound.back}<Icon name="arrow" /></Link></p>
    </DocPage>
  );
}
