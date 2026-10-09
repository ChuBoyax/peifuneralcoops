import { useEffect } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP, reduceMotion, finePointer } from './gsap';
import { usePageTransition } from './transition';

const START = 'top 88%';

/*
  Declarative entrance animations for everything inside `scope`:
    data-split           heading lines rise out of a mask when scrolled into view
    data-split="now"     same, straight away (page heroes)
    data-split="chars"   letters rise one by one
    data-reveal="hero"   above-the-fold items, staggered in DOM order
    data-reveal="hero-img" / "img"   image wipes open and settles
    data-reveal="up"     rises in on scroll
    data-reveal="stagger" children rise in one after another
    data-reveal="draw"   wipes open left to right
    data-reveal="line"   rule grows from the left
    data-draw            SVG paths (pathLength=1) draw themselves
    data-parallax="n"    drifts n% while passing through the viewport
    data-hero-out        hero content eases away as you scroll past it
  Nothing runs until the page is ready (intro or page curtain lifted), or with reduced motion.
*/
export function useReveal(scope) {
  const { ready, delay } = usePageTransition();

  useGSAP(
    () => {
      if (!ready || reduceMotion) return;
      const q = gsap.utils.selector(scope);

      q('[data-split]').forEach((el) => {
        const mode = el.dataset.split;
        const chars = mode === 'chars';
        SplitText.create(el, {
          type: chars ? 'chars,lines' : 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(chars ? self.chars : self.lines, {
              yPercent: 120,
              duration: chars ? 1.5 : 1.25,
              ease: 'expo.out',
              stagger: chars ? 0.035 : 0.1,
              delay: mode === 'now' ? delay + 0.1 : 0,
              scrollTrigger: mode === 'now' ? undefined : { trigger: el, start: START, once: true },
            }),
        });
      });

      const hero = q('[data-reveal="hero"]');
      if (hero.length) {
        gsap.from(hero, { y: 36, opacity: 0, duration: 1.25, ease: 'expo.out', stagger: 0.09, delay: delay + 0.3 });
      }

      q('[data-reveal="hero-img"]').forEach((el) => {
        const tl = gsap
          .timeline({ delay: delay + 0.15 })
          .fromTo(
            el,
            { clipPath: 'inset(0% 0% 0% 100%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut', clearProps: 'clipPath' }
          );
        const img = el.querySelector('img');
        if (img) tl.from(img, { scale: 1.35, duration: 2.2, ease: 'expo.out' }, 0);
      });

      const rise = q('[data-reveal="up"]');
      if (rise.length) {
        gsap.set(rise, { y: 48, opacity: 0 });
        ScrollTrigger.batch(rise, {
          start: START,
          once: true,
          onEnter: (els) =>
            gsap.to(els, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.1, overwrite: true }),
        });
      }

      q('[data-reveal="stagger"]').forEach((parent) => {
        const kids = parent.children;
        gsap.set(kids, { y: 44, opacity: 0 });
        ScrollTrigger.create({
          trigger: parent,
          start: START,
          once: true,
          onEnter: () => gsap.to(kids, { y: 0, opacity: 1, duration: 1.15, ease: 'expo.out', stagger: 0.08 }),
        });
      });

      q('[data-reveal="img"]').forEach((el) => {
        const tl = gsap
          .timeline({ scrollTrigger: { trigger: el, start: START, once: true } })
          .fromTo(
            el,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', clearProps: 'clipPath' }
          );
        const img = el.querySelector('img');
        if (img) tl.from(img, { scale: 1.3, duration: 1.9, ease: 'expo.out' }, 0);
      });

      q('[data-reveal="draw"]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.8,
            ease: 'expo.inOut',
            clearProps: 'clipPath',
            scrollTrigger: { trigger: el, start: START, once: true },
          }
        );
      });

      q('[data-reveal="line"]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left center',
            duration: 1.4,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: START, once: true },
          }
        );
      });

      q('[data-draw]').forEach((svg) => {
        gsap.fromTo(
          svg.querySelectorAll('path'),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 2.6, ease: 'expo.inOut', stagger: 0.12, delay }
        );
      });

      q('[data-parallax]').forEach((el) => {
        const amount = parseFloat(el.dataset.parallax) || 8;
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });

      q('[data-hero-out]').forEach((el) => {
        gsap.to(el, {
          yPercent: 14,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: el.closest('section'), start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope, dependencies: [ready], revertOnUpdate: true }
  );
}

/* Cards marked data-spotlight get a soft brass light that follows the pointer */
export function useSpotlight(scope) {
  useEffect(() => {
    const root = scope.current;
    if (!finePointer || !root) return;
    const onMove = (e) => {
      const card = e.target.closest?.('[data-spotlight]');
      if (!card || !root.contains(card)) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    root.addEventListener('pointermove', onMove);
    return () => root.removeEventListener('pointermove', onMove);
  }, [scope]);
}

/* Element leans gently toward the pointer */
export function useMagnetic(ref, strength = 0.28) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer || reduceMotion) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' });
    let rect = null;
    const onEnter = () => (rect = el.getBoundingClientRect());
    const onMove = (e) => {
      rect ??= el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const onLeave = () => {
      rect = null;
      xTo(0);
      yTo(0);
    };
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, strength]);
}

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · West Prince Funeral Home` : 'West Prince Funeral Home · Palmer Road, PEI';
  }, [title]);
}
