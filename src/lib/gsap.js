import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true });

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* The intro plays once per browser session, and never with reduced motion.
   Read at module load so StrictMode's double render doesn't see its own write. */
export const introSeen = (() => {
  if (reduceMotion) return true;
  try {
    const seen = sessionStorage.getItem('wpfh_intro') === '1';
    sessionStorage.setItem('wpfh_intro', '1');
    return seen;
  } catch {
    return false;
  }
})();

export { gsap, ScrollTrigger, SplitText, useGSAP };
