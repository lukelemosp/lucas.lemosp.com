import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { routes } from '../content/site';
import { DocPage } from './DocPage';

export function NotFound() {
  return (
    <DocPage crumbs={[{ label: 'Início', to: routes.home }, { label: 'Página não encontrada' }]} eyebrow="Erro 404" title="Página não encontrada" icon="route">
      <p>O endereço que você abriu não existe ou mudou de lugar.</p>
      <p style={{ marginTop: 16 }}><Link className="link-btn" to={routes.home}>Voltar para o início<Icon name="arrow" /></Link></p>
    </DocPage>
  );
}
