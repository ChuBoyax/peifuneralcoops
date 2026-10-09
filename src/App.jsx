import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { introSeen } from './lib/gsap';
import { useSmoothScroll, scrollToTop } from './lib/scroll';
import { TransitionProvider, usePageTransition } from './lib/transition';
import Loader from './components/Loader';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import Services from './pages/Services';
import IfDeathOccurs from './pages/IfDeathOccurs';
import DeathNotices from './pages/DeathNotices';
import Condolences from './pages/Condolences';
import FindUs from './pages/FindUs';
import Preplanning from './pages/Preplanning';
import Board from './pages/Board';
import History from './pages/History';
import Donations from './pages/Donations';
import Membership from './pages/Membership';
import Principles from './pages/Principles';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <Shell />
      </TransitionProvider>
    </BrowserRouter>
  );
}

/* Every route starts at the top. Rendered before the pages so it runs before their effects. */
function ScrollReset() {
  const { key } = useLocation();
  useLayoutEffect(() => {
    scrollToTop();
  }, [key]);
  return null;
}

function Shell() {
  useSmoothScroll();
  const location = useLocation();
  const { markReady } = usePageTransition();
  const [showLoader, setShowLoader] = useState(!introSeen);
  const hideLoader = useCallback(() => setShowLoader(false), []);

  /* The menu belongs to the location it was opened on, so it closes itself on navigation */
  const [menuKey, setMenuKey] = useState(null);
  const menuOpen = menuKey === location.key;
  const menuButtonRef = useRef(null);
  const toggleMenu = useCallback(() => setMenuKey((k) => (k === location.key ? null : location.key)), [location.key]);
  const closeMenu = useCallback(() => setMenuKey(null), []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {showLoader && <Loader onLift={markReady} onDone={hideLoader} />}
      <ScrollProgress />
      <Header menuOpen={menuOpen} onMenuToggle={toggleMenu} menuButtonRef={menuButtonRef} />
      <Menu open={menuOpen} onClose={closeMenu} buttonRef={menuButtonRef} />
      <ScrollReset />
      <main id="main" tabIndex={-1} inert={menuOpen}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/if-a-death-occurs" element={<IfDeathOccurs />} />
          <Route path="/death-notices" element={<DeathNotices />} />
          <Route path="/condolences" element={<Condolences />} />
          <Route path="/find-us" element={<FindUs />} />
          <Route path="/preplanning" element={<Preplanning />} />
          <Route path="/board-of-directors" element={<Board />} />
          <Route path="/history" element={<History />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/principles-of-co-operation" element={<Principles />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <div inert={menuOpen}>
        <Footer />
      </div>
    </>
  );
}
