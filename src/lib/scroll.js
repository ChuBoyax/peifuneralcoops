import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, reduceMotion } from './gsap';

let lenis = null;
export const getLenis = () => lenis;

/* Smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync */
export function useSmoothScroll() {
  useEffect(() => {
    if (reduceMotion) return;
    const instance = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis = instance;
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      if (lenis === instance) lenis = null;
    };
  }, []);
}

export function scrollToTop({ smooth = false } = {}) {
  if (lenis) lenis.scrollTo(0, { immediate: !smooth, force: true });
  else window.scrollTo({ top: 0, behavior: smooth && !reduceMotion ? 'smooth' : 'auto' });
}

export function lockScroll(locked) {
  document.documentElement.classList.toggle('is-locked', locked);
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
