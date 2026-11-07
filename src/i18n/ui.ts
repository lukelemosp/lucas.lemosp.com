/** Strings de interface. O tipo `UiStrings` obriga cada idioma a ter todas as chaves. */
import type { L } from './locales';

const pt = {
  langName: 'Português',
  nav: {
    label: 'Navegação', pages: 'Páginas', home: 'Início', about: 'Sobre mim', career: 'Trajetória',
    certs: 'Certificações', edu: 'Formação', apps: 'Aplicativos', googlePlay: 'Google Play',
    privacy: 'Política de Privacidade', containsCurrent: '(contém a página atual)', openMenu: 'Abrir menu', youAreHere: 'Você está em',
  },
  prefs: { theme: 'Tema', light: 'Claro', dark: 'Escuro', auto: 'Automático', language: 'Idioma' },
  titles: { home: 'Arquiteto de Soluções', notFound: 'Página não encontrada' },
  home: {
    photoOf: (name: string) => `Foto de ${name}`,
    highlights: 'Destaques recentes', contact: 'Vamos conversar',
    copyEmail: 'Copiar e-mail', emailCopied: 'E-mail copiado',
    now: 'Atualmente', parallel: 'Em paralelo', years: 'anos', projects: 'Projetos',
    certs: 'Certificações', seeAll: 'Ver as', skills: 'Competências', languages: 'Idiomas', edu: 'Formação', details: 'Detalhes',
  },
  dates: { since: (d: string) => `desde ${d}`, present: 'atual', current: 'Atual' },
  konami: { title: 'Conquista desbloqueada', detail: 'Explorador · você achou o Konami code' },
  pages: {
    careerTitle: 'Trajetória profissional', certsTitle: 'Certificações', eduTitle: 'Formação acadêmica',
    allStar: 'All Star Ranger no Trailhead', languages: 'Idiomas',
  },
  notFound: { eyebrow: 'Erro 404', text: 'O endereço que você abriu não existe ou mudou de lugar.', back: 'Voltar para o início' },
  privacy: {
    updated: (d: string) => `Atualizada em ${d}`, sample: 'Texto de exemplo', summary: 'Resumo:',
    ptOnly: null as string | null,
  },
};

export type UiStrings = typeof pt;

const en: UiStrings = {
  langName: 'English',
  nav: {
    label: 'Navigation', pages: 'Pages', home: 'Home', about: 'About me', career: 'Career',
    certs: 'Certifications', edu: 'Education', apps: 'Apps', googlePlay: 'Google Play',
    privacy: 'Privacy Policy', containsCurrent: '(contains the current page)', openMenu: 'Open menu', youAreHere: 'You are here',
  },
  prefs: { theme: 'Theme', light: 'Light', dark: 'Dark', auto: 'Automatic', language: 'Language' },
  titles: { home: 'Solutions Architect', notFound: 'Page not found' },
  home: {
    photoOf: (name) => `Photo of ${name}`,
    highlights: 'Recent highlights', contact: "Let's talk",
    copyEmail: 'Copy email', emailCopied: 'Email copied',
    now: 'Currently', parallel: 'On the side', years: 'years', projects: 'Projects',
    certs: 'Certifications', seeAll: 'See all', skills: 'Skills', languages: 'Languages', edu: 'Education', details: 'Details',
  },
  dates: { since: (d) => `since ${d}`, present: 'present', current: 'Current' },
  konami: { title: 'Achievement unlocked', detail: 'Explorer · you found the Konami code' },
  pages: {
    careerTitle: 'Career history', certsTitle: 'Certifications', eduTitle: 'Education',
    allStar: 'All Star Ranger on Trailhead', languages: 'Languages',
  },
  notFound: { eyebrow: 'Error 404', text: "The page you opened doesn't exist or has moved.", back: 'Back to home' },
  privacy: {
    updated: (d) => `Updated on ${d}`, sample: 'Sample text', summary: 'Summary:',
    ptOnly: 'This policy is available in Portuguese only. It applies to an app published in Brazil.',
  },
};

const es: UiStrings = {
  langName: 'Español',
  nav: {
    label: 'Navegación', pages: 'Páginas', home: 'Inicio', about: 'Sobre mí', career: 'Trayectoria',
    certs: 'Certificaciones', edu: 'Formación', apps: 'Aplicaciones', googlePlay: 'Google Play',
    privacy: 'Política de Privacidad', containsCurrent: '(contiene la página actual)', openMenu: 'Abrir menú', youAreHere: 'Estás en',
  },
  prefs: { theme: 'Tema', light: 'Claro', dark: 'Oscuro', auto: 'Automático', language: 'Idioma' },
  titles: { home: 'Arquitecto de Soluciones', notFound: 'Página no encontrada' },
  home: {
    photoOf: (name) => `Foto de ${name}`,
    highlights: 'Novedades recientes', contact: 'Hablemos',
    copyEmail: 'Copiar correo', emailCopied: 'Correo copiado',
    now: 'Actualmente', parallel: 'En paralelo', years: 'años', projects: 'Proyectos',
    certs: 'Certificaciones', seeAll: 'Ver las', skills: 'Competencias', languages: 'Idiomas', edu: 'Formación', details: 'Detalles',
  },
  dates: { since: (d) => `desde ${d}`, present: 'actualidad', current: 'Actual' },
  konami: { title: 'Logro desbloqueado', detail: 'Explorador · encontraste el código Konami' },
  pages: {
    careerTitle: 'Trayectoria profesional', certsTitle: 'Certificaciones', eduTitle: 'Formación académica',
    allStar: 'All Star Ranger en Trailhead', languages: 'Idiomas',
  },
  notFound: { eyebrow: 'Error 404', text: 'La dirección que abriste no existe o cambió de lugar.', back: 'Volver al inicio' },
  privacy: {
    updated: (d) => `Actualizada el ${d}`, sample: 'Texto de ejemplo', summary: 'Resumen:',
    ptOnly: 'Esta política solo está disponible en portugués. Se aplica a una app publicada en Brasil.',
  },
};

export const ui: L<UiStrings> = { pt, en, es };
