import { useMemo, useRef, useState } from 'react';
import { useReveal, useDocumentTitle } from '../lib/hooks';
import { SITE, NOTICES, formatMonth, fullName } from '../data/site';
import PageHero from '../components/PageHero';
import NoticeRow from '../components/NoticeRow';
import { ArrowUpRightIcon, SearchIcon } from '../components/Icons';

export default function DeathNotices() {
  const ref = useRef(null);
  const [query, setQuery] = useState('');
  useReveal(ref);
  useDocumentTitle('Death Notices');

  const months = useMemo(() => {
    const q = query.trim().toLowerCase();
    const found = NOTICES.filter((n) => !q || `${fullName(n)} ${n.last}, ${n.first}`.toLowerCase().includes(q));
    const groups = [];
    for (const n of found) {
      const label = formatMonth(n.date);
      let group = groups.at(-1);
      if (group?.label !== label) groups.push((group = { label, items: [] }));
      group.items.push(n);
    }
    return groups;
  }, [query]);

  const count = months.reduce((sum, m) => sum + m.items.length, 0);

  return (
    <div className="page" ref={ref}>
      <PageHero
        eyebrow="Remembering"
        title={
          <>
            Current death <em>notices</em>
          </>
        }
        lede="Select a name to send your condolences. They are printed and given to the family."
      >
        <label className="search">
          <SearchIcon />
          <span className="visually-hidden">Search death notices by name</span>
          <input type="search" placeholder="Search by name" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
      </PageHero>

      <section className="section">
        <div className="container">
          <p className="notices-count" aria-live="polite" data-reveal="up">
            {count === 0 ? 'No notices match your search.' : `${count} ${count === 1 ? 'notice' : 'notices'}`}
          </p>
          <div className="notices" data-reveal="up">
            {months.map((m) => (
              <section className="notices__month" key={m.label} aria-label={m.label}>
                <h2 className="notices__month-label">{m.label}</h2>
                <ul className="notice-list notice-list--light">
                  {m.items.map((n) => (
                    <NoticeRow key={n.id} notice={n} />
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="archive-note" data-reveal="up">
            <div>
              <h2 className="archive-note__title">Looking for an earlier notice?</h2>
              <p>
                {SITE.archiveUrl
                  ? 'Earlier notices are kept in our archive.'
                  : 'Contact the funeral home and we will help you find it.'}
              </p>
            </div>
            {SITE.archiveUrl ? (
              <a className="btn btn--dark" href={SITE.archiveUrl} target="_blank" rel="noopener">
                Archived death notices <ArrowUpRightIcon />
              </a>
            ) : (
              <div className="btn-row">
                <a className="btn btn--dark" href={SITE.phone.href}>
                  {SITE.phone.label}
                </a>
                <a className="btn btn--line" href={`mailto:${SITE.email}`}>
                  Email us
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
