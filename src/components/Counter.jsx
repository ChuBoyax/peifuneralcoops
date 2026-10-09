import { useRef } from 'react';
import { gsap, useGSAP, reduceMotion } from '../lib/gsap';
import { usePageTransition } from '../lib/transition';

/* Counts up to `value` the first time it scrolls into view */
export default function Counter({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const { ready } = usePageTransition();
  const text = (n) => `${prefix}${n}${suffix}`;

  useGSAP(
    () => {
      if (!ready || reduceMotion) return;
      const el = ref.current;
      const state = { n: 0 };
      el.textContent = text(0);
      gsap.to(state, {
        n: value,
        duration: 2.2,
        ease: 'expo.out',
        onUpdate: () => (el.textContent = text(Math.round(state.n))),
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
      return () => (el.textContent = text(value));
    },
    { dependencies: [ready], revertOnUpdate: true }
  );

  return <span ref={ref}>{text(value)}</span>;
}
