import { useRef } from 'react';
import { useReveal, useDocumentTitle } from '../lib/hooks';
import { SITE, LOCATION_FACTS } from '../data/site';
import PageHero from '../components/PageHero';
import { Address } from '../components/ContactDetails';
import { ArrowUpRightIcon, PhoneIcon } from '../components/Icons';
import building from '../assets/west-prince-building.jpg';

export default function FindUs() {
  const ref = useRef(null);
  useReveal(ref);
  useDocumentTitle('Find Us');

  return (
    <div className="page" ref={ref}>
      <PageHero
        eyebrow="Our location"
        title={
          <>
            Find <em>us.</em>
          </>
        }
        lede="West Prince Funeral Home is located on the south side of the Thompson Road, Route 155, in Palmer Road, across from the Immaculate Conception Church. The funeral home is within 10 to 30 minutes of Tignish, Alberton and O’Leary."
      >
        <a className="btn btn--brass" href={SITE.directionsUrl} target="_blank" rel="noopener">
          Get directions <ArrowUpRightIcon />
        </a>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="facts" data-reveal="stagger">
            {LOCATION_FACTS.map((f, i) => (
              <div className="fact" key={f.title}>
                <span className="fact__num">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="fact__title">{f.title}</h2>
                <p>{f.text}</p>
              </div>
            ))}
          </div>

          <div className="map-layout">
            <figure className="map" data-reveal="img">
              <iframe
                src={SITE.mapEmbed}
                title="Map showing West Prince Funeral Home, 522 Thompson Road, St. Louis, PE"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </figure>
            <aside className="map-card is-dark grain" data-reveal="up">
              <p className="eyebrow">Address</p>
              <Address />
              <dl className="details details--compact">
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={SITE.phone.href}>{SITE.phone.label}</a>
                  </dd>
                </div>
                <div>
                  <dt>Fax</dt>
                  <dd>{SITE.fax}</dd>
                </div>
              </dl>
              <div className="btn-row">
                <a className="btn btn--brass" href={SITE.directionsUrl} target="_blank" rel="noopener">
                  Directions <ArrowUpRightIcon />
                </a>
                <a className="btn btn--line-light" href={SITE.phone.href}>
                  <PhoneIcon /> Call
                </a>
              </div>
            </aside>
          </div>

          <figure className="framed wide-photo" data-reveal="img">
            <img src={building} width="710" height="262" loading="lazy" alt="West Prince Funeral Home seen from Thompson Road" />
            <figcaption>Look for our sign on Route 155, across from the Immaculate Conception Church.</figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}
