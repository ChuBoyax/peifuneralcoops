import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { gsap, ScrollTrigger, reduceMotion, introSeen } from './gsap';
import { scrollToTop } from './scroll';
import { pageFor } from '../data/site';

/*
  Page transitions: a brass + evergreen curtain rises with the next page's name,
  the route changes underneath it, then the curtain lifts away.
  `ready` tells pages when they may play their entrance animations.
*/
const TransitionContext = createContext({ ready: true, delay: 0, go: () => {}, markReady: () => {} });
export const usePageTransition = () => useContext(TransitionContext);

const FLAT = '0% 0% 0% 0% / 0vh 0vh 0vh 0vh';

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const curtainRef = useRef(null);
  const busy = useRef(false);
  const revealPending = useRef(false);
  const [label, setLabel] = useState('');
  const [phase, setPhase] = useState({ ready: introSeen, delay: 0 });
  const here = location.pathname + location.search;

  const go = useCallback(
    (to) => {
      if (busy.current) return;
      if (to === here) {
        scrollToTop({ smooth: true });
        return;
      }
      if (reduceMotion) {
        navigate(to);
        return;
      }
      busy.current = true;
      setLabel(pageFor(to)?.label ?? 'West Prince');
      const el = curtainRef.current;
      gsap
        .timeline()
        .set(el, { autoAlpha: 1 })
        .fromTo(
          el.querySelectorAll('.curtain__panel'),
          { yPercent: 100, borderRadius: '50% 50% 0% 0% / 16vh 16vh 0vh 0vh' },
          { yPercent: 0, borderRadius: FLAT, duration: 0.7, ease: 'expo.inOut', stagger: 0.07 }
        )
        .fromTo(
          el.querySelector('.curtain__label span'),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.6, ease: 'expo.out' },
          0.42
        )
        .add(() => {
          revealPending.current = true;
          setPhase({ ready: false, delay: 0 });
          navigate(to);
        }, 0.82);
    },
    [here, navigate]
  );

  /* Runs after the new route has rendered under the curtain */
  useLayoutEffect(() => {
    if (!revealPending.current) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }
    revealPending.current = false;
    setPhase({ ready: true, delay: 0.42 });
    document.getElementById('main')?.focus({ preventScroll: true });

    const el = curtainRef.current;
    const panels = [...el.querySelectorAll('.curtain__panel')].reverse();
    gsap
      .timeline({
        delay: 0.12,
        onComplete: () => {
          gsap.set(el, { autoAlpha: 0 });
          busy.current = false;
          ScrollTrigger.refresh();
        },
      })
      .to(el.querySelector('.curtain__label span'), { yPercent: -110, duration: 0.45, ease: 'expo.in' })
      .fromTo(
        panels,
        { borderRadius: FLAT },
        {
          yPercent: -100,
          borderRadius: '0% 0% 50% 50% / 0vh 0vh 16vh 16vh',
          duration: 0.85,
          ease: 'expo.inOut',
          stagger: 0.07,
        },
        '-=0.2'
      );
  }, [location.key]);

  const markReady = useCallback(() => setPhase({ ready: true, delay: 0.3 }), []);
  const value = useMemo(() => ({ ...phase, go, markReady }), [phase, go, markReady]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div className="curtain" ref={curtainRef} aria-hidden="true">
        <div className="curtain__panel curtain__panel--brass" />
        <div className="curtain__panel" />
        <p className="curtain__label">
          <span>{label}</span>
        </p>
      </div>
    </TransitionContext.Provider>
  );
}

/* Internal link that travels through the page curtain */
export function TLink({ to, onClick, children, ...rest }) {
  const { go } = usePageTransition();
  const { pathname } = useLocation();

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    go(to);
  };

  return (
    <Link to={to} onClick={handleClick} aria-current={pathname === to ? 'page' : undefined} {...rest}>
      {children}
    </Link>
  );
}
