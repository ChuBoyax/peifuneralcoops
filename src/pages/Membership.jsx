import { useRef } from 'react';
import { TLink } from '../lib/transition';
import { useReveal, useDocumentTitle } from '../lib/hooks';
import { SITE, MEMBER_RIGHTS } from '../data/site';
import PageHero from '../components/PageHero';
import Flowers from '../components/Flowers';
import Counter from '../components/Counter';
import { ArrowIcon, MailIcon, PhoneIcon } from '../components/Icons';
import flowers from '../../images/Membership/Flowers.gif';

export default function Membership() {
  const ref = useRef(null);
  useReveal(ref);
  useDocumentTitle('Membership');

  return (
    <div className="page" ref={ref}>
      <PageHero
        eyebrow="Our co-op"
        title={
          <>
            One share. <em>Equal rights.</em>
          </>
        }
        lede="When a person becomes a member of a co-operative, he or she has the same rights as every other member regardless of the number of shares held."
      />

      <section className="section">
        <div className="container ornament">
          <Flowers src={flowers} width={579} height={80} />
        </div>
        <div className="container share">
          <div className="share__price" data-reveal="up">
            <span className="share__value">
              <Counter value={10} prefix="$" />
            </span>
            <span className="share__label">One membership share in West Prince Funeral Co-op Ltd</span>
          </div>
          <div className="share__how">
            <p className="eyebrow" data-reveal="up">
              How to join
            </p>
            <h2 className="share__title" data-split>
              Applications are a <em>call away.</em>
            </h2>
            <p className="lede" data-reveal="up">
              Applications can be obtained by contacting the funeral home or any of the directors.
            </p>
            <div className="btn-row" data-reveal="up">
              <a className="btn btn--dark" href={SITE.phone.href}>
                <PhoneIcon /> {SITE.phone.label}
              </a>
              <a className="btn btn--line" href={`mailto:${SITE.email}?subject=${encodeURIComponent('Membership application')}`}>
                <MailIcon /> Email us
              </a>
              <TLink className="btn btn--line" to="/board-of-directors">
                Our directors <ArrowIcon />
              </TLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section is-dark grain panel">
        <div className="container rights-layout">
          <div>
            <p className="eyebrow" data-reveal="up">
              Every member has the right
            </p>
            <h2 className="rights-layout__title" data-split>
              A voice in <em>every decision.</em>
            </h2>
          </div>
          <ol className="rights" data-reveal="stagger">
            {MEMBER_RIGHTS.map((r, i) => (
              <li key={r}>
                <span className="rights__num">{String(i + 1).padStart(2, '0')}</span>
                <p>{r}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </div>
  );
}
