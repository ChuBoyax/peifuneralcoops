import { useRef } from 'react';
import { gsap, useGSAP, reduceMotion } from '../lib/gsap';
import { usePageTransition } from '../lib/transition';
import { useReveal, useDocumentTitle } from '../lib/hooks';
import { FOUNDERS, TIMELINE } from '../data/site';
import PageHero from '../components/PageHero';
import ScrubText from '../components/ScrubText';
import Counter from '../components/Counter';
import sign from '../../images/History/sign5.jpg';

export default function History() {
  const ref = useRef(null);
  const timelineRef = useRef(null);
  const { ready } = usePageTransition();
  useReveal(ref);
  useDocumentTitle('History');

  /* The timeline's spine fills as you scroll through the years */
  useGSAP(
    () => {
      if (!ready || reduceMotion) return;
      gsap.fromTo(
        '.timeline__fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 70%', end: 'bottom 60%', scrub: true },
        }
      );
    },
    { scope: timelineRef, dependencies: [ready], revertOnUpdate: true }
  );

  return (
    <div className="page" ref={ref}>
      <PageHero
        eyebrow="History of West Prince Funeral Home"
        title={
          <>
            The flame that <em>started it all.</em>
          </>
        }
        lede="Our funeral co-op, formerly known as the Palmer Road Funeral Co-op, was the first in Atlantic Canada. Its inception sparked the flame for future funeral co-ops."
      />

      <section className="section">
        <div className="container founders">
          <div className="founders__text">
            <p className="eyebrow" data-reveal="up">
              How it began
            </p>
            <ScrubText className="statement statement--left">
              Supported by the Palmer Road Knights of Columbus, Father Eloi Arsenault and a committee brought into existence
              a truly dignified option to the funeral services being offered.
            </ScrubText>
            <p className="lede" data-reveal="up">
              Their goal was to provide funerals and related services to everyone at a reasonable cost.
            </p>
          </div>
          <aside className="founders__card" data-reveal="up">
            <p className="eyebrow">The founders</p>
            <p className="founders__lead">Father Eloi Arsenault</p>
            <p className="founders__and">and a committee including</p>
            <ul>
              {FOUNDERS.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
            <p className="founders__with">Supported by the Palmer Road Knights of Columbus</p>
          </aside>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container timeline-layout">
          <div className="timeline-layout__aside">
            <figure className="framed sign-photo" data-reveal="img">
              <img src={sign} width="363" height="150" loading="lazy" alt="Sign reading West Prince Funeral Home, Cooperatively Owned" />
              <figcaption>Cooperatively owned</figcaption>
            </figure>
            <div className="big-stat" data-reveal="up">
              <span className="big-stat__value">
                <Counter value={600} suffix="+" />
              </span>
              <span className="big-stat__label">members today</span>
            </div>
          </div>
          <div className="timeline" ref={timelineRef}>
            <span className="timeline__rail" aria-hidden="true">
              <i className="timeline__fill" />
            </span>
            <ol className="timeline__list">
              {TIMELINE.map((t) => (
                <li className="moment" key={t.year} data-reveal="up">
                  <span className="moment__year">{t.year}</span>
                  <h2 className="moment__title">{t.title}</h2>
                  <p>{t.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
