import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

/* Hairline of brass across the top that fills as you read */
export default function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const setScale = gsap.quickSetter(ref.current, 'scaleX');
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScale(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}
