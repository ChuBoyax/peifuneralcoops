import { useRef } from 'react';
import { TLink } from '../lib/transition';
import { useReveal } from '../lib/hooks';
import { scrollToTop } from '../lib/scroll';
import { SITE, PAGES, HOMES } from '../data/site';
import { Address } from './ContactDetails';
import { ArrowIcon, ArrowUpIcon, ArrowUpRightIcon, PhoneIcon } from './Icons';

export default function Footer() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <footer className="site-footer is-dark grain" ref={ref}>
      <div className="container">
        <div className="footer-cta">
          <p className="eyebrow eyebrow--plain" data-reveal="up">
            <span className="live-dot" aria-hidden="true" /> Answered 24 hours a day
          </p>
          <h2 className="footer-cta__title" data-split>
            We are here,
            <br />
            <em>day and night.</em>
          </h2>
          <div className="footer-cta__row" data-reveal="up">
            <a className="footer-cta__phone" href={SITE.phone.href}>
              {SITE.phone.label}
            </a>
            <div className="btn-row">
              <a className="btn btn--brass" href={SITE.phone.href}>
                <PhoneIcon /> Call now
              </a>
              <TLink className="btn btn--line-light" to="/if-a-death-occurs">
                If a death occurs <ArrowIcon />
              </TLink>
            </div>
          </div>
        </div>

        <div className="footer-grid" data-reveal="stagger">
          <div>
            <h3 className="footer-grid__label">Visit</h3>
            <Address />
            <a className="text-link" href={SITE.directionsUrl} target="_blank" rel="noopener">
              Get directions <ArrowUpRightIcon />
            </a>
          </div>
          <div>
            <h3 className="footer-grid__label">Contact</h3>
            <ul>
              <li>
                Phone <a href={SITE.phone.href}>{SITE.phone.label}</a>
              </li>
              <li>
                Cell <a href={SITE.cell.href}>{SITE.cell.label}</a>
              </li>
              <li>Fax {SITE.fax}</li>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <a href={`mailto:${SITE.emailAlt}`}>{SITE.emailAlt}</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="footer-grid__label">Explore</h3>
            <ul className="footer-grid__pages">
              {PAGES.map((p) => (
                <li key={p.path}>
                  <TLink to={p.path}>{p.label}</TLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="footer-grid__label">Our co-op family</h3>
            <ul>
              {HOMES.map((h) => (
                <li key={h.name}>
                  {h.current ? (
                    <span className="footer-grid__here">{h.name} · you are here</span>
                  ) : (
                    <a href={h.href} target="_blank" rel="noopener">
                      {h.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="footer-wordmark" aria-hidden="true" data-split="chars">
        West Prince
      </p>

      <div className="container footer-base">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Owned by {SITE.owner}.
        </p>
        <button type="button" className="to-top" onClick={() => scrollToTop({ smooth: true })}>
          Back to top <ArrowUpIcon />
        </button>
      </div>
    </footer>
  );
}
