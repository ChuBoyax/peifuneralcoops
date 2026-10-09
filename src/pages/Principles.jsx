import { useRef } from 'react';
import { gsap, useGSAP, reduceMotion } from '../lib/gsap';
import { usePageTransition } from '../lib/transition';
import { useReveal, useDocumentTitle } from '../lib/hooks';
import { PRINCIPLES } from '../data/site';
import PageHero from '../components/PageHero';

const pad = (n) => String(n).padStart(2, '0');

export default function Principles() {
  const ref = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const { ready } = usePageTransition();
  useReveal(ref);
  useDocumentTitle('Principles of Co-operation');

  /* On wide screens the seven principles travel sideways while the section is pinned */
  useGSAP(
    () => {
      if (!ready || reduceMotion) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const section = pinRef.current;
        const track = trackRef.current;
        section.classList.add('is-horizontal');
        const distance = () => track.scrollWidth - track.parentElement.clientWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              countRef.current.textContent = pad(Math.min(PRINCIPLES.length, Math.floor(self.progress * PRINCIPLES.length) + 1));
              barRef.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        return () => section.classList.remove('is-horizontal');
      });
      return () => mm.revert();
    },
    { dependencies: [ready], revertOnUpdate: true }
  );

  return (
    <div className="page" ref={ref}>
      <PageHero
        eyebrow="Principle of co-operation"
        title={
          <>
            Seven principles, <em>one purpose.</em>
          </>
        }
        lede="For better understanding of co-operation and the funeral co-operatives, it may be best to explain the seven principles of co-operation. They outline the responsibilities every co-op has to its members and communities."
      />

      <section className="principles" ref={pinRef}>
        <div className="container principles__head">
          <p className="eyebrow" data-reveal="up">
            The seven principles
          </p>
          <div className="principles__progress" aria-hidden="true">
            <span ref={countRef}>01</span> / {pad(PRINCIPLES.length)}
            <span className="principles__bar">
              <i ref={barRef} />
            </span>
          </div>
        </div>
        <div className="principles__viewport">
          <ol className="principles__track" ref={trackRef}>
            {PRINCIPLES.map((p, i) => (
              <li className="principle" key={p.title}>
                <span className="principle__num">{pad(i + 1)}</span>
                <h2 className="principle__title">{p.title}</h2>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
