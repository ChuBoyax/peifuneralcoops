import { useEffect, useRef } from 'react';
import { gsap, reduceMotion } from '../lib/gsap';
import { getLenis } from '../lib/scroll';
import { FlameIcon } from './Icons';

/* Endless band of words that drifts on its own and quickens while you scroll */
export default function Marquee({ items, className = '' }) {
  const trackRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const track = trackRef.current;
    let half = track.scrollWidth / 2;
    const ro = new ResizeObserver(() => (half = track.scrollWidth / 2));
    ro.observe(track);

    const setX = gsap.quickSetter(track, 'x', 'px');
    let x = 0;
    const tick = (_time, delta) => {
      const boost = Math.min(Math.abs(getLenis()?.velocity ?? 0), 40) * 0.005;
      x -= (0.04 + boost) * delta;
      if (x <= -half) x += half;
      setX(x);
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
    };
  }, []);

  const row = (hidden) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t}>
          {t}
          <FlameIcon />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee__track" ref={trackRef}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
