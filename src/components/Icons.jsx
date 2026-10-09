const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
};

export const ArrowIcon = (p) => (
  <svg {...base} {...p} className={`icon icon--arrow ${p.className ?? ''}`}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRightIcon = (p) => (
  <svg {...base} {...p} className={`icon icon--out ${p.className ?? ''}`}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowUpIcon = (p) => (
  <svg {...base} {...p} className={`icon ${p.className ?? ''}`}>
    <path d="M12 20V5M6 11l6-6 6 6" />
  </svg>
);

export const PhoneIcon = (p) => (
  <svg {...base} {...p} className={`icon ${p.className ?? ''}`}>
    <path d="M5 3.5h3.2l1.6 4.2-2.1 1.4a11 11 0 0 0 7.2 7.2l1.4-2.1 4.2 1.6V19a1.5 1.5 0 0 1-1.6 1.5C10.9 20 4 13.1 3.5 5.1A1.5 1.5 0 0 1 5 3.5z" />
  </svg>
);

export const PinIcon = (p) => (
  <svg {...base} {...p} className={`icon ${p.className ?? ''}`}>
    <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const MailIcon = (p) => (
  <svg {...base} {...p} className={`icon ${p.className ?? ''}`}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const CopyIcon = (p) => (
  <svg {...base} {...p} className={`icon ${p.className ?? ''}`}>
    <rect x="8" y="8" width="12" height="12" rx="2.5" />
    <path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" />
  </svg>
);

export const CheckIcon = (p) => (
  <svg {...base} {...p} className={`icon ${p.className ?? ''}`}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const PrintIcon = (p) => (
  <svg {...base} {...p} className={`icon ${p.className ?? ''}`}>
    <path d="M7 9V3.5h10V9M7 17.5H5A1.5 1.5 0 0 1 3.5 16v-5.5A1.5 1.5 0 0 1 5 9h14a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 1-1.5 1.5h-2" />
    <path d="M7 14h10v6.5H7z" />
  </svg>
);

export const SearchIcon = (p) => (
  <svg {...base} {...p} className={`icon ${p.className ?? ''}`}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </svg>
);

/* Small candle flame, used as a separator and accent */
export const FlameIcon = (p) => (
  <svg width="14" height="18" viewBox="0 0 14 18" aria-hidden="true" focusable="false" {...p} className={`flame ${p.className ?? ''}`}>
    <path d="M7 1c3.2 3.8 5 6.7 5 9.6A5 5 0 0 1 2 10.6C2 7.7 3.8 4.8 7 1z" fill="currentColor" />
  </svg>
);
