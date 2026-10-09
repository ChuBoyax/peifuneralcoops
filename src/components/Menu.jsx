import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { gsap, useGSAP, reduceMotion } from '../lib/gsap';
import { lockScroll } from '../lib/scroll';
import { TLink } from '../lib/transition';
import { SITE, GROUPS, PAGES } from '../data/site';
import Arches from './Arches';
import { Address } from './ContactDetails';
import { ArrowUpRightIcon } from './Icons';

/* Full-screen menu that opens as a circle from the Menu button */
export default function Menu({ open, onClose, buttonRef }) {
  const ref = useRef(null);
  const location = useLocation();
  const openedOn = useRef(location.key);
  const shown = useRef(false);
  const tl = useRef(null);

  const origin = () => {
    const r = buttonRef.current?.getBoundingClientRect();
    const x = r ? r.left + r.width / 2 : window.innerWidth - 60;
    const y = r ? r.top + r.height / 2 : 44;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    return { x, y, radius };
  };

  useGSAP(
    () => {
      const el = ref.current;
      tl.current?.kill();

      if (open) {
        openedOn.current = location.key;
        shown.current = true;
        lockScroll(true);
        el.scrollTop = 0;
        if (reduceMotion) {
          gsap.set(el, { autoAlpha: 1, clipPath: 'none' });
        } else {
          const { x, y, radius } = origin();
          tl.current = gsap
            .timeline()
            .set(el, { autoAlpha: 1 })
            .set('.menu__link-inner', { opacity: 1 })
            .fromTo(
              el,
              { clipPath: `circle(0px at ${x}px ${y}px)` },
              { clipPath: `circle(${radius}px at ${x}px ${y}px)`, duration: 0.95, ease: 'expo.inOut' }
            )
            .fromTo('.menu__link-inner', { yPercent: 115 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.035 }, 0.38)
            .fromTo('.menu__fade', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, 0.5)
            .fromTo('.arches path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.2, ease: 'expo.inOut', stagger: 0.1 }, 0.2);
        }
        requestAnimationFrame(() => el.querySelector('.menu__link')?.focus({ preventScroll: true }));
        return;
      }

      if (!shown.current) return;
      shown.current = false;
      lockScroll(false);
      const navigated = openedOn.current !== location.key;
      if (navigated || reduceMotion) {
        gsap.set(el, { autoAlpha: 0 });
        return;
      }
      const { x, y } = origin();
      tl.current = gsap
        .timeline({ onComplete: () => gsap.set(el, { autoAlpha: 0 }) })
        .to('.menu__fade, .menu__link-inner', { opacity: 0, duration: 0.3, ease: 'power2.in' })
        .to(el, { clipPath: `circle(0px at ${x}px ${y}px)`, duration: 0.8, ease: 'expo.inOut' }, 0.05);
      buttonRef.current?.focus({ preventScroll: true });
    },
    { scope: ref, dependencies: [open, location.key] }
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      id="site-menu"
      className="menu is-dark grain"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      data-lenis-prevent
    >
      <Arches className="menu__arches" count={6} gap={46} />
      <div className="container menu__inner">
        <nav className="menu__groups" aria-label="All pages">
          {GROUPS.map((g) => (
            <div className="menu__group" key={g.id}>
              <p className="eyebrow menu__fade">{g.label}</p>
              <ul className="menu__list">
                {PAGES.filter((p) => p.group === g.id).map((p) => (
                  <li key={p.path} className="menu__item">
                    <TLink
                      to={p.path}
                      className="menu__link"
                      onClick={() => p.path === location.pathname && onClose()}
                    >
                      <span className="menu__link-inner">
                        <span className="menu__num">{p.num}</span>
                        {p.label}
                      </span>
                    </TLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <aside className="menu__aside">
          <div className="menu__card menu__fade">
            <p className="eyebrow eyebrow--plain">
              <span className="live-dot" aria-hidden="true" /> Answered 24 hours a day
            </p>
            <a className="menu__phone" href={SITE.phone.href}>
              {SITE.phone.label}
            </a>
            <p className="menu__small">
              Cell <a href={SITE.cell.href}>{SITE.cell.label}</a> · Fax {SITE.fax}
            </p>
            <p className="menu__small">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
          <div className="menu__fade menu__visit">
            <Address />
            <a className="btn btn--line-light" href={SITE.directionsUrl} target="_blank" rel="noopener">
              Get directions <ArrowUpRightIcon />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
