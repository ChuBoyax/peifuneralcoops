import { useEffect, useRef, useState } from 'react';
import { TLink, usePageTransition } from '../lib/transition';
import { gsap, useGSAP, reduceMotion } from '../lib/gsap';
import { useMagnetic } from '../lib/hooks';
import { SITE, QUICK_LINKS } from '../data/site';
import Brand from './Brand';
import { PhoneIcon } from './Icons';

export default function Header({ menuOpen, onMenuToggle, menuButtonRef }) {
  const ref = useRef(null);
  const phoneRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { ready } = usePageTransition();
  useMagnetic(menuButtonRef);
  useMagnetic(phoneRef, 0.18);

  /* Glass background once scrolled; slides away while reading down, returns when scrolling up */
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 360);
        last = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /* One-time entrance after the intro */
  const entered = useRef(false);
  useGSAP(
    () => {
      if (!ready || entered.current || reduceMotion) return;
      entered.current = true;
      gsap.from('[data-head-item]', { y: -28, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07, delay: 0.25 });
    },
    { scope: ref, dependencies: [ready] }
  );

  const cls = ['site-header', scrolled && 'is-scrolled', hidden && !menuOpen && 'is-hidden', menuOpen && 'is-menu']
    .filter(Boolean)
    .join(' ');

  return (
    <header className={cls} ref={ref}>
      <div className="site-header__bar">
        <Brand data-head-item />

        <nav className="quicknav" aria-label="Quick links">
          {QUICK_LINKS.map((p) => (
            <TLink key={p.path} to={p.path} data-head-item>
              {p.label}
            </TLink>
          ))}
        </nav>

        <a className="phone-pill" href={SITE.phone.href} ref={phoneRef} data-head-item>
          <span className="live-dot" aria-hidden="true" />
          <span className="phone-pill__text">
            <small>Answered 24 hours</small>
            {SITE.phone.label}
          </span>
          <PhoneIcon className="phone-pill__icon" />
        </a>

        <button
          type="button"
          ref={menuButtonRef}
          className="menu-btn"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={onMenuToggle}
          data-head-item
        >
          <span className="menu-btn__label">{menuOpen ? 'Close' : 'Menu'}</span>
          <span className="menu-btn__icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>
    </header>
  );
}
