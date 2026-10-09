import { useRef, useState } from 'react';
import { useReveal, useSpotlight, useDocumentTitle } from '../lib/hooks';
import { SITE, DONATION_POINTS } from '../data/site';
import PageHero from '../components/PageHero';
import Flowers from '../components/Flowers';
import { CheckIcon, CopyIcon } from '../components/Icons';
import flowers from '../../images/Donations/Flowers_LF.gif';

export default function Donations() {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);
  useReveal(ref);
  useSpotlight(ref);
  useDocumentTitle('Donations');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.emailAlt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="page" ref={ref}>
      <PageHero
        eyebrow="In memory"
        title={
          <>
            Memorial <em>donations</em>
          </>
        }
        lede="Memorial donations are accepted at the West Prince Funeral Home for any charity requested by the family."
      />

      <section className="section">
        <div className="container">
          <div className="ornament">
            <Flowers src={flowers} width={191} height={80} />
          </div>
          <div className="points" data-reveal="stagger">
            {DONATION_POINTS.map((p, i) => (
              <article className="benefit" key={p.title} data-spotlight>
                <span className="benefit__num">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="benefit__title">{p.title}</h2>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <div className="etransfer is-dark grain">
            <div>
              <p className="eyebrow" data-reveal="up">
                Give by e-transfer
              </p>
              <h2 className="etransfer__title" data-split>
                Donations via e-transfer are <em>accepted through email.</em>
              </h2>
            </div>
            <div className="etransfer__box" data-reveal="up">
              <span className="etransfer__label">Send your e-transfer to</span>
              <a className="etransfer__email" href={`mailto:${SITE.emailAlt}`}>
                {SITE.emailAlt}
              </a>
              <button type="button" className={`btn ${copied ? 'btn--brass' : 'btn--line-light'}`} onClick={copy}>
                {copied ? <CheckIcon /> : <CopyIcon />} {copied ? 'Copied' : 'Copy email address'}
              </button>
              <span className="visually-hidden" role="status">
                {copied ? 'Email address copied' : ''}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
