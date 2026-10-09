import { useRef } from 'react';
import { TLink } from '../lib/transition';
import { useReveal, useDocumentTitle } from '../lib/hooks';
import { SITE, SERVICES } from '../data/site';
import PageHero from '../components/PageHero';
import Flowers from '../components/Flowers';
import ContactDetails, { Address } from '../components/ContactDetails';
import { ArrowIcon, PhoneIcon } from '../components/Icons';
import flowers from '../../images/services/Flowers_LF.gif';
import building from '../assets/west-prince-building.jpg';

export default function Services() {
  const ref = useRef(null);
  useReveal(ref);
  useDocumentTitle('Services');

  return (
    <div className="page" ref={ref}>
      <PageHero
        eyebrow="Services"
        title={
          <>
            From beginning <em>to end.</em>
          </>
        }
        lede={`${SITE.tagline} Full quality and professional services, so the arrangements you make are satisfactory to you and to your family.`}
      >
        <a className="btn btn--brass" href={SITE.phone.href}>
          <PhoneIcon /> {SITE.phone.label}
        </a>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="ornament">
            <Flowers src={flowers} width={191} height={80} />
          </div>
          <ol className="service-list">
            {SERVICES.map((s, i) => {
              const inner = (
                <>
                  <span className="service__num">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="service__title">{s.title}</h2>
                  <p className="service__text">{s.text}</p>
                  <span className="service__cta">
                    {s.cta} <ArrowIcon />
                  </span>
                </>
              );
              return (
                <li key={s.title} data-reveal="up">
                  {s.to ? (
                    <TLink className="service" to={s.to}>
                      {inner}
                    </TLink>
                  ) : (
                    <a className="service" href={s.href}>
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <div className="contact-panel is-dark grain">
            <div className="contact-panel__main">
              <p className="eyebrow" data-reveal="up">
                Contact
              </p>
              <h2 className="contact-panel__title" data-split>
                West Prince <em>Funeral Home</em>
              </h2>
              <div data-reveal="up">
                <Address withName={false} />
              </div>
              <figure className="framed contact-panel__photo" data-reveal="img">
                <img src={building} width="710" height="262" loading="lazy" alt="West Prince Funeral Home on Thompson Road" />
              </figure>
            </div>
            <div data-reveal="up">
              <ContactDetails />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
