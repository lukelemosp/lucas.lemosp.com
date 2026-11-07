import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { fireConfetti } from './components/confetti';
import { Icon } from './components/Icon';
import { EASE_OUT, View } from './components/motion';
import { Sidebar } from './components/Sidebar';
import { useToast } from './components/Toast';
import { apps, profile, routes } from './content/site';
import { useKonami } from './hooks/useKonami';
import { useLocale } from './i18n/LocaleProvider';
import type { UiStrings } from './i18n/ui';
import { usePointerGlow } from './hooks/usePointerGlow';
import { Career, Certifications, Education } from './pages/About';
import { AppPrivacy } from './pages/AppPrivacy';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

function buildTitles(t: UiStrings): Record<string, string> {
  return {
    [routes.home]: `${profile.name} · ${t.titles.home}`,
    [routes.career]: `${t.nav.career} · ${profile.shortName}`,
    [routes.certifications]: `${t.nav.certs} · ${profile.shortName}`,
    [routes.education]: `${t.nav.edu} · ${profile.shortName}`,
    ...Object.fromEntries(apps.map((a) => [routes.appPrivacy(a.slug), `${t.nav.privacy} · ${a.name}`])),
  };
}

export function App() {
  const location = useLocation();
  const { t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [inlineTitle, setInlineTitle] = useState<string | null>(null);
  const toast = useToast();
  usePointerGlow();

  // Scroll edge effect: cada rota rola dentro do próprio .view.
  useEffect(() => {
    setScrolled(false);
    setInlineTitle(null);
    const isHome = location.pathname === routes.home;
    const onScroll = (e: Event) => {
      const el = e.target;
      if (!(el instanceof HTMLElement) || !el.classList.contains('view')) return;
      setScrolled(el.scrollTop > 4);
      // Large title (iOS): quando o h1 da página some sob a navbar, o título vai para a navbar.
      const h1 = isHome ? null : el.querySelector('h1');
      setInlineTitle(h1 && h1.getBoundingClientRect().bottom < 56 ? h1.textContent : null);
    };
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => document.removeEventListener('scroll', onScroll, { capture: true });
  }, [location.pathname]);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.title = buildTitles(t)[location.pathname] ?? `${t.titles.notFound} · ${profile.shortName}`;
  }, [location.pathname, t]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useKonami(useCallback(() => {
    toast({ title: t.konami.title, detail: t.konami.detail, icon: 'trophy', placement: 'top' });
    fireConfetti();
  }, [toast, t]));

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <div className={`app${menuOpen ? ' menu-open' : ''}`} data-scrolled={scrolled || undefined}>
          <div className="backdrop" aria-hidden="true"><div className="grid" /><div className="glow" /></div>

          <header className="navbar">
            <button className="btn-icon" aria-label={t.nav.openMenu} aria-controls="sidebar" aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}>
              <Icon name="menu" />
            </button>
            <span className="mid">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={inlineTitle ?? profile.shortName}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}>
                  {inlineTitle ?? profile.shortName}
                </motion.span>
              </AnimatePresence>
            </span>
            <span style={{ width: 44 }} />
          </header>

          <Sidebar open={menuOpen} onClose={closeMenu} />

          <main className="stage">
            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
                <Route path={routes.home} element={<View label={t.nav.home}><Home /></View>} />
                <Route path={routes.career} element={<View label={t.nav.career}><Career /></View>} />
                <Route path={routes.certifications} element={<View label={t.nav.certs}><Certifications /></View>} />
                <Route path={routes.education} element={<View label={t.nav.edu}><Education /></View>} />
                <Route path="/apps/:slug/privacidade" element={<View label={t.nav.privacy}><AppPrivacy /></View>} />
                <Route path="*" element={<View label={t.titles.notFound}><NotFound /></View>} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
