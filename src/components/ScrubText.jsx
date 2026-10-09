import { useRef } from 'react';
import { gsap, SplitText, useGSAP, reduceMotion } from '../lib/gsap';
import { usePageTransition } from '../lib/transition';

/* Large statement whose words light up one by one as you scroll through it */
export default function ScrubText({ children, className = '', as: Tag = 'p' }) {
  const ref = useRef(null);
  const { ready } = usePageTransition();

  useGSAP(
    () => {
      if (!ready || reduceMotion) return;
      const split = SplitText.create(ref.current, { type: 'words', wordsClass: 'scrub__word' });
      gsap.fromTo(
        split.words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: 'top 82%', end: 'bottom 52%', scrub: true },
        }
      );
    },
    { scope: ref, dependencies: [ready], revertOnUpdate: true }
  );

  return (
    <Tag className={`scrub ${className}`} ref={ref}>
      {children}
    </Tag>
  );
}
