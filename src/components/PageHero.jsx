import { useLocation } from 'react-router';
import { TLink } from '../lib/transition';
import { PAGES, pageFor, groupFor } from '../data/site';
import Arches from './Arches';
import CandleGlow from './CandleGlow';

/* Dark opening band for every inner page */
export default function PageHero({ eyebrow, title, lede, children }) {
  const { pathname } = useLocation();
  const page = pageFor(pathname);
  const group = groupFor(page);

  return (
    <section className="page-hero is-dark grain">
      <CandleGlow />
      <Arches className="page-hero__arches" />
      <div className="container page-hero__inner" data-hero-out>
        <div className="page-hero__top" data-reveal="hero">
          <nav className="crumbs" aria-label="Breadcrumb">
            <TLink to="/">Home</TLink>
            {group && <span>{group.label}</span>}
          </nav>
          {page && (
            <span className="page-hero__index" aria-hidden="true">
              {page.num} <i>/</i> {String(PAGES.length).padStart(2, '0')}
            </span>
          )}
        </div>
        {eyebrow && (
          <p className="eyebrow" data-reveal="hero">
            {eyebrow}
          </p>
        )}
        <h1 className="page-hero__title" data-split="now">
          {title}
        </h1>
        {(lede || children) && (
          <div className="page-hero__foot">
            {lede && (
              <p className="lede page-hero__lede" data-reveal="hero">
                {lede}
              </p>
            )}
            {children && (
              <div className="page-hero__aside" data-reveal="hero">
                {children}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
