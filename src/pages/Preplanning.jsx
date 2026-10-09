import { useRef } from 'react';
import { useReveal, useSpotlight, useDocumentTitle } from '../lib/hooks';
import { SITE, PREPLAN_BENEFITS } from '../data/site';
import PageHero from '../components/PageHero';
import ScrubText from '../components/ScrubText';
import Flowers from '../components/Flowers';
import { MailIcon, PhoneIcon } from '../components/Icons';
import flowers from '../../images/Preplanning/Flowers_LF.gif';

export default function Preplanning() {
  const ref = useRef(null);
  useReveal(ref);
  useSpotlight(ref);
  useDocumentTitle('Preplanning');

  return (
    <div className="page" ref={ref}>
      <PageHero
        eyebrow="Planning ahead"
        title={
          <>
            Peace of mind, <em>in advance.</em>
          </>
        }
        lede="One of the services the funeral home offers is assisting families in pre-planning funerals."
      >
        <a className="btn btn--brass" href={SITE.phone.href}>
          <PhoneIcon /> Talk with us
        </a>
      </PageHero>

      <section className="section">
        <div className="container narrow">
          <div className="ornament">
            <Flowers src={flowers} width={191} height={80} />
          </div>
          <ScrubText className="statement">
            More and more people recognize that planning in advance lessens the burden on those you love. There is peace
            of mind in knowing that everything is in order.
          </ScrubText>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <p className="eyebrow" data-reveal="up">
            Why plan ahead
          </p>
          <div className="benefits" data-reveal="stagger">
            {PREPLAN_BENEFITS.map((b, i) => (
              <article className="benefit" key={b.title} data-spotlight>
                <span className="benefit__num">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="benefit__title">{b.title}</h2>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <div className="cta-band is-dark grain">
            <div>
              <p className="eyebrow" data-reveal="up">
                Start the conversation
              </p>
              <h2 className="cta-band__title" data-split>
                Everything in order, <em>your way.</em>
              </h2>
            </div>
            <div className="btn-row" data-reveal="up">
              <a className="btn btn--brass" href={SITE.phone.href}>
                <PhoneIcon /> {SITE.phone.label}
              </a>
              <a className="btn btn--line-light" href={`mailto:${SITE.email}?subject=${encodeURIComponent('Pre-planning a funeral')}`}>
                <MailIcon /> Email us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
