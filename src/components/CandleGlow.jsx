import { useRef } from 'react';
import { gsap, useGSAP, reduceMotion, finePointer } from '../lib/gsap';

/* A warm candlelight glow that breathes slowly and drifts after the pointer */
export default function CandleGlow() {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (reduceMotion) return;
      const el = ref.current;
      const host = el.parentElement;
      gsap.to(el, { scale: 1.12, opacity: 0.85, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      if (!finePointer) return;

      const xTo = gsap.quickTo(el, 'x', { duration: 1.8, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 1.8, ease: 'power3.out' });
      const onMove = (e) => {
        const r = host.getBoundingClientRect();
        xTo(e.clientX - r.left - r.width * 0.68);
        yTo(e.clientY - r.top - r.height * 0.42);
      };
      host.addEventListener('pointermove', onMove);
      return () => host.removeEventListener('pointermove', onMove);
    },
    { scope: ref }
  );

  return <div className="candle-glow" ref={ref} aria-hidden="true" />;
}
