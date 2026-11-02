/**
 * Conteúdo do site — fonte única.
 *
 * Para adicionar uma rede social: inclua um item em `socials`.
 * Para adicionar um app (com sub-páginas): inclua um item em `apps`.
 * Para adicionar uma página no menu: inclua um nó em `buildNav()`.
 */
import type { IconName } from '../components/Icon';

export const profile = {
  name: 'Lucas Lemos Pinheiro',
  firstName: 'Lucas Lemos',
  lastName: 'Pinheiro',
  shortName: 'Lucas Lemos',
  domain: 'lucas.lemosp.com',
  avatar: '/avatar.jpg',
  status: 'Aberto a conversas e parcerias',
  role: 'Arquiteto de Soluções & Tech Lead',
  bio: 'Desenho arquiteturas que conectam negócio e tecnologia: CRM Salesforce, front-end e Inteligência Artificial. Entre um projeto e outro, gamer e tradutor de games.',
  facts: [
    { icon: 'pin', label: 'Belo Horizonte, MG' },
    { icon: 'award', label: '4× Salesforce Certified' },
    { icon: 'lang', label: 'PT · EN (C2)' },
  ] as { icon: IconName; label: string }[],
};

export type Social = { id: string; label: string; href: string; icon: IconName; primary?: boolean };

export const socials: Social[] = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/lucaslpinheiro/', icon: 'linkedin', primary: true },
  { id: 'email', label: 'lucas@lemosp.com', href: 'mailto:lucas@lemosp.com', icon: 'mail' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/lukelemosp', icon: 'github' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@sirlukelp', icon: 'youtube' },
];

export const highlights: { icon: IconName; title: string; detail: string; when: string }[] = [
  { icon: 'spark', title: 'Dreamforce 2026', detail: 'San Francisco · representando a Belgo Arames', when: '2026' },
  { icon: 'pin', title: 'AIforce Tour BH', detail: 'Salesforce · IA aplicada a Comercial e Marketing', when: 'out. 2026' },
];

export const current = {
  logo: 'BA',
  role: 'Arquiteto de Soluções / Tech Lead',
  company: 'Belgo Arames',
  since: 'desde ago. 2025',
  tags: ['Arquitetura corporativa', 'Salesforce', 'Front-end', 'CI/CD', 'UX'],
};

export const sideQuest = {
  years: 12,
  title: 'Tradução EN → PT-BR',
  detail: 'de games, séries, filmes e documentários.',
};

export type SealKind = 'gold' | 'sf' | 'aws' | 'en' | 'gray';
export type Certification = { seal: string; kind: SealKind; name: string; short: string; issuer: string; date: string; year: string; featured?: boolean };

export const certifications: Certification[] = [
  { seal: '★', kind: 'gold', name: 'Salesforce All Star Ranger', short: 'All Star Ranger', issuer: 'Trailhead · rank máximo', date: 'jul. 2025', year: '2025', featured: true },
  { seal: 'AF', kind: 'sf', name: 'Salesforce Certified Agentforce Specialist', short: 'Agentforce Specialist', issuer: 'Salesforce', date: 'out. 2024', year: '2024', featured: true },
  { seal: 'AI', kind: 'sf', name: 'Salesforce Certified AI Associate', short: 'AI Associate', issuer: 'Salesforce', date: 'set. 2024', year: '2024', featured: true },
  { seal: 'PA', kind: 'sf', name: 'Salesforce Certified Platform Administrator', short: 'Platform Administrator', issuer: 'Salesforce', date: 'mai. 2024', year: '2024', featured: true },
  { seal: 'eT', kind: 'gray', name: 'Business Process Framework (eTOM) Foundation', short: 'eTOM Foundation', issuer: 'TM Forum', date: 'jun. 2023', year: '2023' },
  { seal: 'PF', kind: 'sf', name: 'Salesforce Certified Platform Foundations', short: 'Platform Foundations', issuer: 'Salesforce', date: 'mai. 2023', year: '2023' },
  { seal: 'aws', kind: 'aws', name: 'AWS Academy Cloud Foundations', short: 'Cloud Foundations', issuer: 'AWS Academy', date: 'mai. 2023', year: '2023', featured: true },
  { seal: 'IT', kind: 'gray', name: 'IT Essentials', short: 'IT Essentials', issuer: 'Cisco Networking Academy', date: 'mar. 2023', year: '2023' },
  { seal: 'C2', kind: 'en', name: 'EF SET English Certificate · 82/100', short: 'EF SET English C2', issuer: 'EF SET · C2 Proficient', date: 'mar. 2022', year: '2022' },
];

export const skills: { icon: IconName; title: string; detail: string }[] = [
  { icon: 'layers', title: 'Arquitetura de soluções', detail: 'Macro arquitetura e integração' },
  { icon: 'cloud', title: 'CRM Salesforce', detail: 'Sales, Service, Field Service' },
  { icon: 'spark', title: 'IA aplicada', detail: 'Agentforce e Einstein' },
  { icon: 'flow', title: 'Análise de negócios', detail: 'BPMN, requisitos, Scrum' },
  { icon: 'pen', title: 'UX e prototipação', detail: 'IHC, web e mobile' },
];

export const languages = [
  { code: 'PT', name: 'Português', level: 'Nativo', levelLong: 'Nativo' },
  { code: 'EN', name: 'Inglês', level: 'Fluente · C2', levelLong: 'Fluente · EF SET C2 (82/100)' },
  { code: 'ES', name: 'Espanhol', level: 'Intermediário', levelLong: 'Básico a intermediário' },
];

export type TimelineItem = {
  when: string; title: string; org: string; detail?: string; current?: boolean; badge?: string;
  /** versão curta usada no card da home */
  short?: { title: string; detail: string };
};

export const education: TimelineItem[] = [
  { when: 'ago. 2019 — jul. 2023', title: 'Bacharelado em Sistemas de Informação', org: 'PUC Minas', current: true,
    short: { title: 'Sistemas de Informação', detail: 'Bacharelado · PUC Minas · 2019 – 2023' },
    detail: 'Engenharia de software, sistemas distribuídos e cloud, gestão de projetos de TI, inteligência artificial e machine learning. Java, C# .NET, JavaScript e SQL.' },
  { when: 'ago. 2017 — fev. 2019', title: 'Técnico em Tecnologia da Informação', org: 'SENAI',
    short: { title: 'Tecnologia da Informação', detail: 'Técnico · SENAI · 2017 – 2019' },
    detail: 'Programação em C, desenvolvimento web e mobile, redes, governança de TI e desenvolvimento de jogos de plataforma.' },
];

export const career: TimelineItem[] = [
  { when: 'ago. 2025 — atual', title: 'Arquiteto de Soluções / Tech Lead', org: 'Belgo Arames · Contagem, MG', current: true, badge: 'Atual',
    detail: 'Arquitetura de soluções e liderança técnica de times Salesforce, fullstack e front-end; CI/CD para Salesforce; prototipação com foco em UX.' },
  { when: 'dez. 2024 — ago. 2025', title: 'IT Business Partner', org: 'ArcelorMittal Sistemas',
    detail: 'Parceiro de TI das áreas Comercial e Marketing: arquitetura Salesforce e de IA, prototipação e reports para diretorias.' },
  { when: 'mar. 2021 — set. 2024', title: 'Estagiário → Analista de Negócios em TI Pleno', org: 'American Tower do Brasil',
    detail: 'Administração Salesforce e DocuSign, Product Owner, QA e prototipação.' },
  { when: 'set. 2018 — fev. 2021', title: 'Assistente de Informática', org: 'Rubi Comercial de Cereais' },
  { when: 'jul. 2014 — atual', title: 'Tradutor freelancer', org: 'Remoto',
    detail: 'Localização EN → PT-BR de games, séries, filmes, documentários e sites.' },
];

export const careerStats = [
  { icon: 'clock' as IconName, label: '8 anos em TI' },
  { icon: 'brief' as IconName, label: '4 empresas' },
];

/* ------------------------------------------------------------------ */
/* Apps: cada app vira um nó no menu, com link da loja e sub-páginas   */
/* ------------------------------------------------------------------ */

/** Textos aceitam **negrito** e [links](https://...) inline. */
export type PolicySection = { title: string; paragraphs?: string[]; bullets?: string[]; after?: string[] };
export type AppEntry = {
  slug: string;
  name: string;
  /** ID do pacote na Play Store (ex.: com.lemosp.pitstop) */
  packageId?: string;
  /** Link público da loja; omita enquanto o app não estiver publicado */
  storeUrl?: string;
  privacy: { updated: string; summary: string; sections: PolicySection[]; isSample?: boolean };
};

export const apps: AppEntry[] = [
  {
    slug: 'pitstop',
    name: 'Pitstop',
    packageId: 'com.lemosp.pitstop',
    // storeUrl: 'https://play.google.com/store/apps/details?id=com.lemosp.pitstop', // ativar quando sair do teste interno
    privacy: {
      updated: '2 de novembro de 2026',
      summary: 'o Pitstop é um app Android de manutenção preventiva de carro. Ele foi feito para guardar os seus dados **somente no seu aparelho**. Não temos servidores, não pedimos cadastro nem login e não coletamos nem compartilhamos dados pessoais.',
      sections: [
        {
          title: 'Dados que ficam no aparelho',
          bullets: [
            'Os carros cadastrados, a quilometragem, o plano de manutenção, o histórico de serviços, os abastecimentos e recargas, os gastos e as contas fixas.',
            'As fotos dos carros e dos comprovantes que você escolhe na galeria. O app guarda uma cópia reduzida em uma pasta interna dele e só acessa as imagens que você seleciona.',
          ],
          after: [
            'Esses dados ficam em um banco de dados criptografado no armazenamento interno do app. Eles não são enviados para nós nem para terceiros, não entram no backup automático do Android e são apagados quando você desinstala o app ou limpa os dados dele nas configurações do Android.',
          ],
        },
        {
          title: 'Backup',
          paragraphs: [
            'Quando você exporta um backup, o app gera um arquivo criptografado e o salva no local que você escolher (por exemplo, a pasta Downloads ou um serviço de nuvem instalado no seu aparelho). A guarda desse arquivo fica por sua conta. Nós não temos acesso a ele.',
          ],
        },
        {
          title: 'Conexões com a internet',
          paragraphs: ['O app usa a internet só para duas consultas públicas, e nenhuma delas envia dados pessoais:'],
          bullets: [
            '**Tabela FIPE**, pela API pública [parallelum.com.br](https://parallelum.com.br/fipe/api/v2/cars): busca marcas, modelos, anos e valores de referência durante o cadastro do carro.',
            '**Wikipedia e Wikimedia Commons**: buscam uma foto ilustrativa do modelo do carro.',
          ],
          after: [
            'Nessas consultas vai apenas o nome da marca, do modelo ou do ano pesquisado. Como em qualquer acesso à internet, esses serviços podem registrar o endereço IP de quem faz a requisição, de acordo com as políticas de privacidade de cada um ([Wikimedia](https://foundation.wikimedia.org/wiki/Policy:Privacy_policy)).',
          ],
        },
        {
          title: 'Permissões',
          bullets: [
            '**Internet:** apenas para as consultas descritas acima.',
            '**Notificações:** para os lembretes de manutenção e de contas a vencer. Os lembretes são calculados e exibidos no próprio aparelho, e você pode desativá-los a qualquer momento nas configurações do Android.',
          ],
        },
        {
          title: 'Publicidade, análise e rastreamento',
          paragraphs: ['O Pitstop não tem anúncios e não usa ferramentas de análise, rastreamento, identificadores de publicidade ou relatórios de falha de terceiros.'],
        },
        {
          title: 'Seus direitos (LGPD)',
          paragraphs: ['Como não coletamos dados pessoais, não mantemos nenhuma informação sua que possa ser consultada, corrigida ou excluída por nós. Você tem controle total sobre os seus dados no próprio app: pode editar ou excluir qualquer registro, exportar um backup ou apagar tudo desinstalando o app. Se tiver qualquer dúvida sobre o tratamento de dados, fale com a gente pelo contato abaixo.'],
        },
        { title: 'Crianças', paragraphs: ['O app não é direcionado a menores de 18 anos.'] },
        { title: 'Alterações', paragraphs: ['Se esta política mudar, a nova versão será publicada nesta página com a data atualizada.'] },
        { title: 'Contato', paragraphs: ['Dúvidas: [webmaster@lemosp.com](mailto:webmaster@lemosp.com)'] },
      ],
    },
  },
];

/* ------------------------------------------------------------------ */
/* Navegação em árvore                                                 */
/* ------------------------------------------------------------------ */

export type NavNode = {
  id: string;
  label: string;
  icon?: IconName;
  appIcon?: boolean;
  to?: string;        // rota interna
  href?: string;      // link externo
  children?: NavNode[];
};
export type NavSection = { title?: string; nodes: NavNode[] };

export const routes = {
  home: '/',
  career: '/sobre/trajetoria',
  certifications: '/sobre/certificacoes',
  education: '/sobre/formacao',
  appPrivacy: (slug: string) => `/apps/${slug}/privacidade`,
};

export function buildNav(): NavSection[] {
  return [
    {
      nodes: [
        { id: 'home', label: 'Início', icon: 'house', to: routes.home },
        {
          id: 'about', label: 'Sobre mim', icon: 'user',
          children: [
            { id: 'career', label: 'Trajetória', icon: 'route', to: routes.career },
            { id: 'certs', label: 'Certificações', icon: 'award', to: routes.certifications },
            { id: 'edu', label: 'Formação', icon: 'grad', to: routes.education },
          ],
        },
      ],
    },
    {
      title: 'Aplicativos',
      nodes: apps.map((app) => ({
        id: `app-${app.slug}`, label: app.name, appIcon: true,
        children: [
          ...(app.storeUrl ? [{ id: `${app.slug}-store`, label: 'Google Play', icon: 'play' as IconName, href: app.storeUrl }] : []),
          { id: `${app.slug}-privacy`, label: 'Política de Privacidade', icon: 'shield' as IconName, to: routes.appPrivacy(app.slug) },
        ],
      })),
    },
  ];
}
