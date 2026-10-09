import { TLink } from '../lib/transition';

/* An arched chapel window holding a candle flame */
export function Mark({ className = '' }) {
  return (
    <svg className={`mark ${className}`} viewBox="0 0 40 48" aria-hidden="true" focusable="false">
      <path className="mark__arch" pathLength="1" d="M5 47V21a15 15 0 0 1 30 0v26" />
      <path className="mark__flame" d="M20 17c3.6 4.3 5.6 7.6 5.6 10.6a5.6 5.6 0 0 1-11.2 0c0-3 2-6.3 5.6-10.6z" />
    </svg>
  );
}

export default function Brand({ sub = 'Funeral Home', ...props }) {
  return (
    <TLink to="/" className="brand" aria-label="West Prince Funeral Home, home" {...props}>
      <Mark />
      <span className="brand__text">
        <span className="brand__name">West Prince</span>
        <span className="brand__sub">{sub}</span>
      </span>
    </TLink>
  );
}
