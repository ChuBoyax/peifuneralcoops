import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, reduceMotion } from '../lib/gsap';
import { usePageTransition } from '../lib/transition';
import { useReveal, useDocumentTitle } from '../lib/hooks';
import { SITE, STEPS, CHECKLIST, ALSO_BRING } from '../data/site';
import PageHero from '../components/PageHero';
import ScrubText from '../components/ScrubText';
import Flowers from '../components/Flowers';
import { CheckIcon, PrintIcon } from '../components/Icons';
import flowers from '../../images/If A Death Occurs/Flowers.gif';

const STORAGE_KEY = 'wpfh_checklist';
const ALL_ITEMS = [...CHECKLIST, ...ALSO_BRING];

function loadChecked() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []);
  } catch {
    return new Set();
  }
}

export default function IfDeathOccurs() {
  const ref = useRef(null);
  const stepsRef = useRef(null);
  const { ready } = usePageTransition();
  const [checked, setChecked] = useState(loadChecked);
  useReveal(ref);
  useDocumentTitle('If a Death Occurs');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
    } catch {
      /* private mode: the checklist simply isn't remembered */
    }
  }, [checked]);

  /* The rail beside the steps fills as you read down them */
  useGSAP(
    () => {
      if (!ready || reduceMotion) return;
      gsap.fromTo(
        '.steps__fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 70%', end: 'bottom 60%', scrub: true },
        }
      );
    },
    { scope: stepsRef, dependencies: [ready], revertOnUpdate: true }
  );

  const toggle = (item) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });

  const done = ALL_ITEMS.filter((i) => checked.has(i)).length;
  const progress = done / ALL_ITEMS.length;

  const item = (label) => (
    <li key={label}>
      <label className={`check ${checked.has(label) ? 'is-checked' : ''}`}>
        <input type="checkbox" checked={checked.has(label)} onChange={() => toggle(label)} />
        <span className="check__box" aria-hidden="true">
          <CheckIcon />
        </span>
        <span className="check__label">{label}</span>
      </label>
    </li>
  );

  return (
    <div className="page" ref={ref}>
      <PageHero
        eyebrow="When you need us"
        title={
          <>
            If a death <em>occurs</em>
          </>
        }
        lede="The West Prince Funeral Home should be notified immediately by the hospital, nursing home, other institution, clergy or family member."
      >
        <a className="call-card" href={SITE.phone.href}>
          <span className="eyebrow eyebrow--plain">
            <span className="live-dot" aria-hidden="true" /> Answered 24 hours a day
          </span>
          <span className="call-card__number">{SITE.phone.label}</span>
          <span className="call-card__hint">Cell {SITE.cell.label}</span>
        </a>
      </PageHero>

      <section className="section">
        <div className="container steps-layout">
          <div className="steps-layout__head">
            <p className="eyebrow" data-reveal="up">
              What happens next
            </p>
            <h2 className="steps-layout__title" data-split>
              We will guide you, <em>step by step.</em>
            </h2>
            <div className="ornament ornament--left">
              <Flowers src={flowers} width={579} height={80} />
            </div>
          </div>
          <div className="steps" ref={stepsRef}>
            <span className="steps__rail" aria-hidden="true">
              <i className="steps__fill" />
            </span>
            <ol className="steps__list">
              {STEPS.map((s, i) => (
                <li className="step" key={s.title} data-reveal="up">
                  <span className="step__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="step__title">{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section is-dark grain panel compassion">
        <div className="container compassion__inner">
          <p className="eyebrow" data-reveal="up">
            With compassion
          </p>
          <ScrubText className="compassion__text">
            The loss of a loved one is a very traumatic experience. Our funeral home staff are specially trained to travel
            through this difficult time with you, with compassion and understanding.
          </ScrubText>
          <p className="lede compassion__note" data-reveal="up">
            We can help you regardless of the circumstances or place of death, even if it is outside of Prince Edward
            Island.
          </p>
        </div>
      </section>

      <section className="section checklist-section" id="checklist">
        <div className="container checklist-layout">
          <div className="checklist-layout__head">
            <p className="eyebrow" data-reveal="up">
              Before you visit
            </p>
            <h2 className="checklist-layout__title" data-split>
              What to <em>bring.</em>
            </h2>
            <p className="lede" data-reveal="up">
              When you come to the funeral home, you will need the following information about the deceased. Tick items
              off as you gather them.
            </p>
            <div className="progress" data-reveal="up">
              <svg className="progress__ring" viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r="52" pathLength="1" />
                <circle cx="60" cy="60" r="52" pathLength="1" style={{ strokeDashoffset: 1 - progress }} />
              </svg>
              <p className="progress__text" aria-live="polite">
                <strong>
                  {done} of {ALL_ITEMS.length}
                </strong>
                <span>{done === ALL_ITEMS.length ? 'Everything is ready.' : 'items ready'}</span>
              </p>
            </div>
            <div className="btn-row no-print" data-reveal="up">
              <button type="button" className="btn btn--dark" onClick={() => window.print()}>
                <PrintIcon /> Print this list
              </button>
              {done > 0 && (
                <button type="button" className="btn btn--line" onClick={() => setChecked(new Set())}>
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="checklist" data-reveal="up">
            <fieldset>
              <legend>Information about the deceased</legend>
              <ul>{CHECKLIST.map(item)}</ul>
            </fieldset>
            <fieldset>
              <legend>Please also bring</legend>
              <ul>{ALSO_BRING.map(item)}</ul>
            </fieldset>
          </div>
        </div>
      </section>
    </div>
  );
}
