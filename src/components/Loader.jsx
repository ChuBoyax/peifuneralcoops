import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { Mark } from './Brand';

/* First-visit intro: the arch draws, the candle lights, then the veil lifts */
export default function Loader({ onLift, onDone }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.set(ref.current, { borderRadius: '0% 0% 0% 0% / 0vh 0vh 0vh 0vh' });
      gsap
        .timeline({ onComplete: onDone })
        .fromTo('.mark__arch', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: 'expo.inOut' })
        .from('.mark__flame', { scale: 0, opacity: 0, transformOrigin: '50% 90%', duration: 1, ease: 'expo.out' }, 0.8)
        .from('.loader__line > span', { yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: 0.09 }, 0.55)
        .fromTo('.loader__bar i', { scaleX: 0 }, { scaleX: 1, duration: 2, ease: 'power2.inOut' }, 0)
        .to('.loader__content, .loader__bar', { opacity: 0, y: -24, duration: 0.5, ease: 'power2.in' }, 2.1)
        .to(
          ref.current,
          { yPercent: -100, borderRadius: '0% 0% 50% 50% / 0vh 0vh 18vh 18vh', duration: 1.15, ease: 'expo.inOut' },
          2.3
        )
        .add(onLift, 2.35);
    },
    { scope: ref }
  );

  return (
    <div className="loader is-dark grain" ref={ref} role="status" aria-label="Loading West Prince Funeral Home">
      <div className="loader__content">
        <Mark className="loader__mark" />
        <p className="loader__name">
          <span className="loader__line">
            <span>West Prince</span>
          </span>
          <span className="loader__line">
            <span>
              <em>Funeral Home</em>
            </span>
          </span>
        </p>
        <p className="loader__meta">
          <span className="loader__line">
            <span>Palmer Road · Prince Edward Island</span>
          </span>
        </p>
      </div>
      <div className="loader__bar" aria-hidden="true">
        <i />
      </div>
    </div>
  );
}
