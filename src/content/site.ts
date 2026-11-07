/**
 * Conteúdo do site — fonte única, em PT / EN / ES.
 *
 * Textos são `Text`: uma string simples (igual em todos os idiomas, ex.: nomes próprios)
 * ou `{ pt, en, es }`. Datas são `YYYY-MM` e são formatadas no idioma do visitante.
 *
 * Para adicionar uma rede social: inclua um item em `socials`.
 * Para adicionar um projeto: inclua um item em `projects`.
 * Para adicionar um app (com sub-páginas): inclua um item em `apps`.
 * Para adicionar uma página no menu: inclua um nó em `buildNav()`.
 */
import type { IconName } from '../components/Icon';
import type { L, Text } from '../i18n/locales';
import type { UiStrings } from '../i18n/ui';

export const profile = {
  name: 'Lucas Lemos Pinheiro',
  firstName: 'Lucas Lemos',
  lastName: 'Pinheiro',
  shortName: 'Lucas Lemos',
  domain: 'lucas.lemosp.com',
  avatar: '/avatar.jpg',
  status: {
    pt: 'Aberto a conversas e parcerias',
    en: 'Open to conversations and partnerships',
    es: 'Abierto a conversaciones y alianzas',
  } as Text,
  role: {
    pt: 'Arquiteto de Soluções & Tech Lead',
    en: 'Solutions Architect & Tech Lead',
    es: 'Arquitecto de Soluciones y Tech Lead',
  } as Text,
  bio: {
    pt: 'Desenho arquiteturas que conectam negócio e tecnologia: CRM Salesforce, front-end e Inteligência Artificial. Entre um projeto e outro, gamer e tradutor de games.',
    en: 'I design architectures that connect business and technology: Salesforce CRM, front-end and Artificial Intelligence. Between projects, I’m a gamer and a video game translator.',
    es: 'Diseño arquitecturas que conectan negocio y tecnología: CRM Salesforce, front-end e Inteligencia Artificial. Entre un proyecto y otro, gamer y traductor de videojuegos.',
  } as Text,
  facts: [
    { icon: 'pin', label: { pt: 'Belo Horizonte, MG', en: 'Belo Horizonte, Brazil', es: 'Belo Horizonte, Brasil' } },
    { icon: 'award', label: '4× Salesforce Certified' },
    { icon: 'lang', label: 'PT · EN (C2)' },
  ] as { icon: IconName; label: Text }[],
};

export type Social = { id: string; label: string; href: string; icon: IconName; primary?: boolean };

export const socials: Social[] = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/lucaslpinheiro/', icon: 'linkedin', primary: true },
  { id: 'email', label: 'lucas@lemosp.com', href: 'mailto:lucas@lemosp.com', icon: 'mail' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/lukelemosp', icon: 'github' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@sirlukelp', icon: 'youtube' },
];

/** `when`: ano (`2026`) ou mês (`2026-10`). */
export const highlights: { icon: IconName; title: Text; detail: Text; when: string }[] = [
  { icon: 'spark', title: 'Dreamforce 2026', when: '2026',
    detail: { pt: 'San Francisco · representando a Belgo Arames', en: 'San Francisco · representing Belgo Arames', es: 'San Francisco · en representación de Belgo Arames' } },
  { icon: 'pin', title: 'AIforce Tour BH', when: '2026-10',
    detail: { pt: 'Salesforce · IA aplicada a Comercial e Marketing', en: 'Salesforce · AI applied to Sales and Marketing', es: 'Salesforce · IA aplicada a Ventas y Marketing' } },
];

export const current = {
  logo: 'BA',
  role: { pt: 'Arquiteto de Soluções / Tech Lead', en: 'Solutions Architect / Tech Lead', es: 'Arquitecto de Soluciones / Tech Lead' } as Text,
  company: 'Belgo Arames',
  since: '2025-08',
  tags: {
    pt: ['Arquitetura corporativa', 'Salesforce', 'Front-end', 'CI/CD', 'UX'],
    en: ['Enterprise architecture', 'Salesforce', 'Front-end', 'CI/CD', 'UX'],
    es: ['Arquitectura empresarial', 'Salesforce', 'Front-end', 'CI/CD', 'UX'],
  } as L<string[]>,
};

export const sideQuest = {
  years: 12,
  title: { pt: 'Tradução EN → PT-BR', en: 'EN → PT-BR translation', es: 'Traducción EN → PT-BR' } as Text,
  detail: {
    pt: 'de games, séries, filmes e documentários.',
    en: 'of video games, TV series, films and documentaries.',
    es: 'de videojuegos, series, películas y documentales.',
  } as Text,
};

/* ------------------------------------------------------------------ */
/* Projetos corporativos (home)                                        */
/* ------------------------------------------------------------------ */

export type Project = { id: string; icon: IconName; title: Text; org: Text; year: string; summary: Text; tags: L<string[]> | string[] };

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

// TODO: substituir os placeholders pelos descritivos reais (PT, EN e ES).
// Cuidado com dados internos: evite nomes de clientes, números e detalhes sem autorização da empresa.
export const projects: Project[] = [
  { id: 'proj-1', icon: 'layers', title: 'Lorem ipsum dolor', org: 'Lorem Ipsum S.A.', year: '2026', summary: LOREM, tags: ['Salesforce', 'Lorem', 'Ipsum'] },
  { id: 'proj-2', icon: 'spark', title: 'Consectetur adipiscing', org: 'Lorem Ipsum S.A.', year: '2025', summary: LOREM, tags: ['Agentforce', 'Lorem', 'Dolor'] },
  { id: 'proj-3', icon: 'flow', title: 'Sed do eiusmod', org: 'Lorem Ipsum S.A.', year: '2024', summary: LOREM, tags: ['CI/CD', 'Lorem', 'Amet'] },
];

/* ------------------------------------------------------------------ */
/* Certificações, competências, idiomas                                */
/* ------------------------------------------------------------------ */

export type SealKind = 'gold' | 'sf' | 'aws' | 'en' | 'gray';
/** `date`: `YYYY-MM`. */
export type Certification = { seal: string; kind: SealKind; name: string; short: string; issuer: Text; date: string; featured?: boolean };

export const certifications: Certification[] = [
  { seal: '★', kind: 'gold', name: 'Salesforce All Star Ranger', short: 'All Star Ranger', date: '2025-07', featured: true,
    issuer: { pt: 'Trailhead · rank máximo', en: 'Trailhead · highest rank', es: 'Trailhead · rango máximo' } },
  { seal: 'AF', kind: 'sf', name: 'Salesforce Certified Agentforce Specialist', short: 'Agentforce Specialist', issuer: 'Salesforce', date: '2024-10', featured: true },
  { seal: 'AI', kind: 'sf', name: 'Salesforce Certified AI Associate', short: 'AI Associate', issuer: 'Salesforce', date: '2024-09', featured: true },
  { seal: 'PA', kind: 'sf', name: 'Salesforce Certified Platform Administrator', short: 'Platform Administrator', issuer: 'Salesforce', date: '2024-05', featured: true },
  { seal: 'eT', kind: 'gray', name: 'Business Process Framework (eTOM) Foundation', short: 'eTOM Foundation', issuer: 'TM Forum', date: '2023-06' },
  { seal: 'PF', kind: 'sf', name: 'Salesforce Certified Platform Foundations', short: 'Platform Foundations', issuer: 'Salesforce', date: '2023-05' },
  { seal: 'aws', kind: 'aws', name: 'AWS Academy Cloud Foundations', short: 'Cloud Foundations', issuer: 'AWS Academy', date: '2023-05', featured: true },
  { seal: 'IT', kind: 'gray', name: 'IT Essentials', short: 'IT Essentials', issuer: 'Cisco Networking Academy', date: '2023-03' },
  { seal: 'C2', kind: 'en', name: 'EF SET English Certificate · 82/100', short: 'EF SET English C2', issuer: 'EF SET · C2 Proficient', date: '2022-03' },
];

export const skills: { icon: IconName; title: Text; detail: Text }[] = [
  { icon: 'layers',
    title: { pt: 'Arquitetura de soluções', en: 'Solution architecture', es: 'Arquitectura de soluciones' },
    detail: { pt: 'Macro arquitetura e integração', en: 'High-level architecture and integration', es: 'Macroarquitectura e integración' } },
  { icon: 'cloud',
    title: { pt: 'CRM Salesforce', en: 'Salesforce CRM', es: 'CRM Salesforce' },
    detail: 'Sales, Service, Field Service' },
  { icon: 'spark',
    title: { pt: 'IA aplicada', en: 'Applied AI', es: 'IA aplicada' },
    detail: { pt: 'Agentforce e Einstein', en: 'Agentforce and Einstein', es: 'Agentforce y Einstein' } },
  { icon: 'flow',
    title: { pt: 'Análise de negócios', en: 'Business analysis', es: 'Análisis de negocio' },
    detail: { pt: 'BPMN, requisitos, Scrum', en: 'BPMN, requirements, Scrum', es: 'BPMN, requisitos, Scrum' } },
  { icon: 'pen',
    title: { pt: 'UX e prototipação', en: 'UX and prototyping', es: 'UX y prototipado' },
    detail: { pt: 'IHC, web e mobile', en: 'HCI, web and mobile', es: 'IHC, web y móvil' } },
];

export const languages: { code: string; name: Text; level: Text; levelLong: Text }[] = [
  { code: 'PT',
    name: { pt: 'Português', en: 'Portuguese', es: 'Portugués' },
    level: { pt: 'Nativo', en: 'Native', es: 'Nativo' },
    levelLong: { pt: 'Nativo', en: 'Native', es: 'Nativo' } },
  { code: 'EN',
    name: { pt: 'Inglês', en: 'English', es: 'Inglés' },
    level: { pt: 'Fluente · C2', en: 'Fluent · C2', es: 'Fluido · C2' },
    levelLong: { pt: 'Fluente · EF SET C2 (82/100)', en: 'Fluent · EF SET C2 (82/100)', es: 'Fluido · EF SET C2 (82/100)' } },
  { code: 'ES',
    name: { pt: 'Espanhol', en: 'Spanish', es: 'Español' },
    level: { pt: 'Intermediário', en: 'Intermediate', es: 'Intermedio' },
    levelLong: { pt: 'Básico a intermediário', en: 'Basic to intermediate', es: 'Básico a intermedio' } },
];

/* ------------------------------------------------------------------ */
/* Formação e trajetória                                               */
/* ------------------------------------------------------------------ */

export type TimelineItem = {
  /** `YYYY-MM` */
  from: string;
  /** `YYYY-MM` ou `'current'` */
  to: string;
  title: Text; org: Text; detail?: Text; current?: boolean; badge?: boolean;
  /** versão curta usada no card da home */
  short?: { title: Text; detail: Text };
};

export const education: TimelineItem[] = [
  { from: '2019-08', to: '2023-07', org: 'PUC Minas', current: true,
    title: { pt: 'Bacharelado em Sistemas de Informação', en: 'Bachelor’s degree in Information Systems', es: 'Licenciatura en Sistemas de Información' },
    short: {
      title: { pt: 'Sistemas de Informação', en: 'Information Systems', es: 'Sistemas de Información' },
      detail: { pt: 'Bacharelado · PUC Minas · 2019 – 2023', en: 'Bachelor’s · PUC Minas · 2019 – 2023', es: 'Licenciatura · PUC Minas · 2019 – 2023' },
    },
    detail: {
      pt: 'Engenharia de software, sistemas distribuídos e cloud, gestão de projetos de TI, inteligência artificial e machine learning. Java, C# .NET, JavaScript e SQL.',
      en: 'Software engineering, distributed systems and cloud, IT project management, artificial intelligence and machine learning. Java, C# .NET, JavaScript and SQL.',
      es: 'Ingeniería de software, sistemas distribuidos y nube, gestión de proyectos de TI, inteligencia artificial y machine learning. Java, C# .NET, JavaScript y SQL.',
    } },
  { from: '2017-08', to: '2019-02', org: 'SENAI',
    title: { pt: 'Técnico em Tecnologia da Informação', en: 'Information Technology Technician', es: 'Técnico en Tecnologías de la Información' },
    short: {
      title: { pt: 'Tecnologia da Informação', en: 'Information Technology', es: 'Tecnologías de la Información' },
      detail: { pt: 'Técnico · SENAI · 2017 – 2019', en: 'Technical degree · SENAI · 2017 – 2019', es: 'Técnico · SENAI · 2017 – 2019' },
    },
    detail: {
      pt: 'Programação em C, desenvolvimento web e mobile, redes, governança de TI e desenvolvimento de jogos de plataforma.',
      en: 'C programming, web and mobile development, networking, IT governance and platform game development.',
      es: 'Programación en C, desarrollo web y móvil, redes, gobernanza de TI y desarrollo de juegos de plataformas.',
    } },
];

export const career: TimelineItem[] = [
  { from: '2025-08', to: 'current', current: true, badge: true,
    title: { pt: 'Arquiteto de Soluções / Tech Lead', en: 'Solutions Architect / Tech Lead', es: 'Arquitecto de Soluciones / Tech Lead' },
    org: { pt: 'Belgo Arames · Contagem, MG', en: 'Belgo Arames · Contagem, Brazil', es: 'Belgo Arames · Contagem, Brasil' },
    detail: {
      pt: 'Arquitetura de soluções e liderança técnica de times Salesforce, fullstack e front-end; CI/CD para Salesforce; prototipação com foco em UX.',
      en: 'Solution architecture and technical leadership of Salesforce, full-stack and front-end teams; CI/CD for Salesforce; UX-focused prototyping.',
      es: 'Arquitectura de soluciones y liderazgo técnico de equipos Salesforce, full stack y front-end; CI/CD para Salesforce; prototipado con foco en UX.',
    } },
  { from: '2024-12', to: '2025-08', title: 'IT Business Partner', org: 'ArcelorMittal Sistemas',
    detail: {
      pt: 'Parceiro de TI das áreas Comercial e Marketing: arquitetura Salesforce e de IA, prototipação e reports para diretorias.',
      en: 'IT partner to the Sales and Marketing areas: Salesforce and AI architecture, prototyping and executive reporting.',
      es: 'Socio de TI de las áreas Comercial y Marketing: arquitectura Salesforce y de IA, prototipado y reportes para la dirección.',
    } },
  { from: '2021-03', to: '2024-09', org: 'American Tower do Brasil',
    title: { pt: 'Estagiário → Analista de Negócios em TI Pleno', en: 'Intern → Mid-level IT Business Analyst', es: 'Pasante → Analista de Negocio de TI semisénior' },
    detail: {
      pt: 'Administração Salesforce e DocuSign, Product Owner, QA e prototipação.',
      en: 'Salesforce and DocuSign administration, Product Owner, QA and prototyping.',
      es: 'Administración de Salesforce y DocuSign, Product Owner, QA y prototipado.',
    } },
  { from: '2018-09', to: '2021-02', org: 'Rubi Comercial de Cereais',
    title: { pt: 'Assistente de Informática', en: 'IT Assistant', es: 'Asistente de Informática' } },
  { from: '2014-07', to: 'current',
    title: { pt: 'Tradutor freelancer', en: 'Freelance translator', es: 'Traductor freelance' },
    org: { pt: 'Remoto', en: 'Remote', es: 'Remoto' },
    detail: {
      pt: 'Localização EN → PT-BR de games, séries, filmes, documentários e sites.',
      en: 'EN → PT-BR localization of video games, TV series, films, documentaries and websites.',
      es: 'Localización EN → PT-BR de videojuegos, series, películas, documentales y sitios web.',
    } },
];

export const careerStats: { icon: IconName; label: Text }[] = [
  { icon: 'clock', label: { pt: '8 anos em TI', en: '8 years in IT', es: '8 años en TI' } },
  { icon: 'brief', label: { pt: '4 empresas', en: '4 companies', es: '4 empresas' } },
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
  /** Política só em PT (app voltado ao Brasil). `updated`: `YYYY-MM-DD`. */
  privacy: { updated: string; summary: string; sections: PolicySection[]; isSample?: boolean };
};

export const apps: AppEntry[] = [
  {
    slug: 'pitstop',
    name: 'Pitstop',
    packageId: 'com.lemosp.pitstop',
    // storeUrl: 'https://play.google.com/store/apps/details?id=com.lemosp.pitstop', // ativar quando sair do teste interno
    privacy: {
      updated: '2026-11-02',
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

export function buildNav(t: UiStrings): NavSection[] {
  return [
    {
      nodes: [
        { id: 'home', label: t.nav.home, icon: 'house', to: routes.home },
        {
          id: 'about', label: t.nav.about, icon: 'user',
          children: [
            { id: 'career', label: t.nav.career, icon: 'route', to: routes.career },
            { id: 'certs', label: t.nav.certs, icon: 'award', to: routes.certifications },
            { id: 'edu', label: t.nav.edu, icon: 'grad', to: routes.education },
          ],
        },
      ],
    },
    {
      title: t.nav.apps,
      nodes: apps.map((app) => ({
        id: `app-${app.slug}`, label: app.name, appIcon: true,
        children: [
          ...(app.storeUrl ? [{ id: `${app.slug}-store`, label: t.nav.googlePlay, icon: 'play' as IconName, href: app.storeUrl }] : []),
          { id: `${app.slug}-privacy`, label: t.nav.privacy, icon: 'shield' as IconName, to: routes.appPrivacy(app.slug) },
        ],
      })),
    },
  ];
}
