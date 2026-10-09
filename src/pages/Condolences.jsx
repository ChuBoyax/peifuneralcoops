import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { gsap, reduceMotion, finePointer } from '../lib/gsap';
import { useReveal, useDocumentTitle } from '../lib/hooks';
import { SITE, NOTICES, fullName, formatDate } from '../data/site';
import PageHero from '../components/PageHero';
import { Mark } from '../components/Brand';
import { ArrowIcon, CheckIcon, CopyIcon } from '../components/Icons';

export default function Condolences() {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const [params] = useSearchParams();
  const [forId, setForId] = useState(() => NOTICES.find((n) => n.id === params.get('for'))?.id ?? NOTICES[0].id);
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);
  useReveal(ref);
  useDocumentTitle('Online Condolences');

  const notice = NOTICES.find((n) => n.id === forId);
  const subject = `Online condolence for the family of ${fullName(notice)}`;
  const body = `Condolence for the family of: ${fullName(notice)}\nFrom: ${from.trim()}\n\n${message.trim()}`;

  /* The sympathy card tilts gently toward the pointer */
  useEffect(() => {
    const card = cardRef.current;
    if (!finePointer || reduceMotion || !card) return;
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.8, ease: 'power3.out' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.8, ease: 'power3.out' });
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 10);
      rx(((e.clientY - r.top) / r.height - 0.5) * -10);
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };
    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
    return () => {
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!from.trim() || !message.trim()) {
      setStatus({ type: 'error', text: 'Please add your name and your message, then send again.' });
      return;
    }
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ type: 'sent', text: 'Your email app is opening with your condolence, ready to send.' });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="page" ref={ref}>
      <PageHero
        eyebrow="Online condolences"
        title={
          <>
            Words of <em>comfort.</em>
          </>
        }
        lede="Online condolences are sent to the funeral home, where they are printed and given to the family."
      />

      <section className="section">
        <div className="container condolence-layout">
          <form className="form" onSubmit={submit} noValidate data-reveal="up">
            <div className="field">
              <label htmlFor="c-for">Condolence for the family of</label>
              <div className="select">
                <select id="c-for" value={forId} onChange={(e) => setForId(e.target.value)}>
                  {NOTICES.map((n) => (
                    <option key={n.id} value={n.id}>
                      {fullName(n)} ({formatDate(n.date)})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="c-from">From</label>
              <input
                id="c-from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                autoComplete="name"
                placeholder="Your name, or your family’s names"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="c-msg">Condolence</label>
              <textarea
                id="c-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={7}
                placeholder="Share a memory or a few words for the family"
                required
              />
            </div>
            <div className="btn-row">
              <button type="submit" className="btn btn--dark">
                Send condolence <ArrowIcon />
              </button>
            </div>
            {status && (
              <div className={`form__status is-${status.type}`} role="status">
                <p>{status.text}</p>
                {status.type === 'sent' && (
                  <p className="form__fallback">
                    If nothing opened, copy your message and email it to{' '}
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.{' '}
                    <button type="button" className="copy-btn" onClick={copy}>
                      {copied ? <CheckIcon /> : <CopyIcon />} {copied ? 'Copied' : 'Copy message'}
                    </button>
                  </p>
                )}
              </div>
            )}
          </form>

          <div className="sympathy" data-reveal="up">
            <p className="sympathy__label eyebrow">Preview</p>
            <div className="sympathy__card" ref={cardRef}>
              <Mark className="sympathy__mark" />
              <p className="sympathy__eyebrow">With deepest sympathy</p>
              <p className="sympathy__to">
                To the family of
                <br />
                <em>{fullName(notice)}</em>
              </p>
              <p className={`sympathy__msg ${message ? '' : 'is-empty'}`}>
                {message || 'Your message will appear here as you write.'}
              </p>
              <p className="sympathy__from">— {from || 'Your name'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
