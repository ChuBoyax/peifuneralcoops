import { useRef } from 'react';
import { useReveal, useSpotlight, useDocumentTitle } from '../lib/hooks';
import { SITE, BOARD, BOARD_FACTS, BOARD_YEAR } from '../data/site';
import PageHero from '../components/PageHero';
import SectionHead from '../components/SectionHead';

const initials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('');

export default function Board() {
  const ref = useRef(null);
  useReveal(ref);
  useSpotlight(ref);
  useDocumentTitle('Board of Directors');

  return (
    <div className="page" ref={ref}>
      <PageHero
        eyebrow="Our co-op"
        title={
          <>
            Board of <em>Directors</em>
          </>
        }
        lede={`West Prince Funeral Home is owned by ${SITE.owner}. A nine member board of directors is responsible for its operation.`}
      />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={`The ${BOARD_YEAR} board`} title={<>The people who <em>guide our co-op.</em></>} />
          <ul className="board" data-reveal="stagger">
            {BOARD.map((m) => (
              <li className={`member ${m.role === 'Board Director' ? '' : 'is-officer'}`} key={m.name} data-spotlight>
                <span className="member__mono" aria-hidden="true">
                  {initials(m.name)}
                </span>
                <span className="member__role">{m.role}</span>
                <h3 className="member__name">{m.name}</h3>
                <span className="member__place">{m.place}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section is-dark grain panel">
        <div className="container">
          <SectionHead eyebrow="How the board works" title={<>Elected by <em>the members.</em></>} />
          <div className="board-facts" data-reveal="stagger">
            {BOARD_FACTS.map((f) => (
              <div className="board-fact" key={f.value}>
                <span className="board-fact__value">{f.value}</span>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
