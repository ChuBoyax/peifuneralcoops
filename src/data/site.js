/* All site content lives here, taken from the West Prince Funeral Home pages. */

export const SITE = {
  name: 'West Prince Funeral Home',
  owner: 'The West Prince Funeral Co-op Limited',
  tagline: 'Serving all denominations and beliefs with compassion, dignity and understanding.',
  address: {
    street: '522 Thompson Road (Route 155)',
    area: 'Palmer Road',
    city: 'RR, St. Louis, PE',
    postal: 'C0B 1Z0',
  },
  phone: { label: '(902) 882-2457', href: 'tel:+19028822457' },
  cell: { label: '(902) 853-5661', href: 'tel:+19028535661' },
  fax: '(902) 882-2806',
  email: 'westprincefuneralhome@gmail.com',
  emailAlt: 'wpfh@bellaliant.com',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=West+Prince+Funeral+Home+522+Thompson+Road+St.+Louis+PE+C0B+1Z0',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=522+Thompson+Road+St.+Louis+PE+C0B+1Z0',
  mapEmbed: 'https://maps.google.com/maps?q=West%20Prince%20Funeral%20Home%2C%20522%20Thompson%20Road%2C%20St.%20Louis%2C%20PE%20C0B%201Z0&z=13&output=embed',
  /* Link to the archived death notices. Leave empty to show a "contact us" note instead. */
  archiveUrl: '',
};

export const GROUPS = [
  { id: 'help', label: 'When you need us' },
  { id: 'plan', label: 'Services & planning' },
  { id: 'coop', label: 'Our co-op' },
];

export const PAGES = [
  { path: '/', label: 'Home', group: 'help' },
  { path: '/if-a-death-occurs', label: 'If a Death Occurs', group: 'help' },
  { path: '/death-notices', label: 'Death Notices', group: 'help' },
  { path: '/condolences', label: 'Online Condolences', group: 'help' },
  { path: '/find-us', label: 'Find Us', group: 'help' },
  { path: '/services', label: 'Services', group: 'plan' },
  { path: '/preplanning', label: 'Preplanning', group: 'plan' },
  { path: '/donations', label: 'Donations', group: 'plan' },
  { path: '/history', label: 'History', group: 'coop' },
  { path: '/board-of-directors', label: 'Board of Directors', group: 'coop' },
  { path: '/membership', label: 'Membership', group: 'coop' },
  { path: '/principles-of-co-operation', label: 'Principles of Co-operation', group: 'coop' },
].map((p, i) => ({ ...p, num: String(i + 1).padStart(2, '0') }));

export const QUICK_LINKS = ['/if-a-death-occurs', '/death-notices', '/preplanning', '/find-us'].map((path) =>
  PAGES.find((p) => p.path === path)
);

export const pageFor = (to = '/') => PAGES.find((p) => p.path === to.split('?')[0]);
export const groupFor = (page) => GROUPS.find((g) => g.id === page?.group);

export const HOMES = [
  { name: 'Central Queens', href: 'https://www.peifuneralcoops.com/setpage.php?page=Central_Queens.php&set=Home' },
  { name: 'East Prince', href: 'https://epfuneral.ca/' },
  { name: 'Evangeline', href: 'https://evangelinefh.com/' },
  { name: 'Hillsboro', href: 'https://hillsborofh.ca/' },
  { name: 'West Prince', current: true },
  { name: 'Southern Kings', href: 'https://www.peifuneralcoops.com/setpage.php?page=Southern_Kings.php&set=Home' },
  { name: 'North Shore', href: 'https://www.northshorefuneralhome.ca/' },
];

/* ---------- Death notices ---------- */

export const NOTICES = [
  ['Doyle', 'Donald John', '2026-10-02'],
  ['Ellsworth', 'Angela Colleen', '2026-09-15'],
  ['Abbott', 'Kenneth Benvie', '2026-09-12'],
  ['Doyle', 'Catherine “Kitty” Mary', '2026-08-22'],
  ['Doucette', 'Janet Mary', '2026-08-05'],
  ['Handrahan', 'Elizabeth Ann', '2026-07-26'],
  ['Doucette', 'John Joseph', '2026-07-24'],
  ['Richard', 'Rose Marie', '2026-07-10'],
  ['Martin', 'Elmer', '2026-07-09'],
].map(([last, first, date]) => ({
  id: `${last}-${first}`.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, ''),
  last,
  first,
  date,
}));

export const fullName = (n) => `${n.first} ${n.last}`;

/* Dates are stored as YYYY-MM-DD and read as local dates so they never shift a day. */
const toDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};
export const formatDate = (iso) =>
  toDate(iso).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' });
export const formatMonth = (iso) => toDate(iso).toLocaleDateString('en-CA', { month: 'long', year: 'numeric' });

/* ---------- Services ---------- */

export const SERVICES = [
  {
    title: 'Arrangements, beginning to end',
    text: 'Full quality and professional services. We assist you from the beginning to the end so the arrangements you make are satisfactory to you and to your family.',
    to: '/if-a-death-occurs',
    cta: 'If a death occurs',
  },
  {
    title: 'Answered 24 hours a day',
    text: 'Our phone number, (902) 882-2457, is answered 24 hours a day.',
    href: SITE.phone.href,
    cta: 'Call now',
  },
  {
    title: 'Visitation & funeral',
    text: 'The time and place of the visitation and funeral are decided together with a director. The clergy or celebrant is contacted before the times are set.',
    to: '/if-a-death-occurs',
    cta: 'What happens next',
  },
  {
    title: 'Wherever a death occurs',
    text: 'We can help you regardless of the circumstances or place of death, even if it is outside of Prince Edward Island.',
    href: SITE.phone.href,
    cta: 'Call us',
  },
  {
    title: 'Pre-planning',
    text: 'Make arrangements according to your own wishes. Funeral services paid for in advance are guaranteed at today’s prices.',
    to: '/preplanning',
    cta: 'Preplanning',
  },
  {
    title: 'Death notices',
    text: 'Current death notices are shared on our website.',
    to: '/death-notices',
    cta: 'Death notices',
  },
  {
    title: 'Online condolences',
    text: 'Condolences sent to the funeral home are printed and given to the family.',
    to: '/condolences',
    cta: 'Send condolences',
  },
  {
    title: 'Memorial donations',
    text: 'Accepted for any charity requested by the family. The family receives a card identifying the donor.',
    to: '/donations',
    cta: 'Donations',
  },
];

/* ---------- If a death occurs ---------- */

export const STEPS = [
  {
    title: 'Notify us',
    text: 'The West Prince Funeral Home should be notified immediately by the hospital, nursing home, other institution, clergy or family member. Our phone is answered 24 hours a day.',
  },
  {
    title: 'A director contacts you',
    text: 'After the funeral home has been notified of the death, a director will contact the next of kin or the person responsible, to set a time to make the necessary arrangements.',
  },
  {
    title: 'Meet at the funeral home',
    text: 'This meeting normally takes place at the funeral home. Personal information about the deceased will be needed, as well as a set of clothing and a picture.',
  },
  {
    title: 'Visitation & funeral',
    text: 'The time and place of the visitation and funeral will be decided at this time. The clergy or celebrant must be contacted before times for the visitation and funeral can be set.',
  },
];

export const CHECKLIST = [
  'Full name',
  'Health and Social Insurance numbers',
  'Marital status',
  'Name of husband or wife',
  'Occupation',
  'Date and place of birth',
  'Father’s name and birthplace',
  'Mother’s name and birthplace',
  'Name of physician',
  'Cemetery chosen',
  'Names of family members for the obituary',
];

export const ALSO_BRING = ['A set of clothing', 'A picture'];

/* ---------- Find us ---------- */

export const LOCATION_FACTS = [
  { title: 'Route 155', text: 'On the south side of the Thompson Road, Route 155, in Palmer Road.' },
  { title: 'Landmark', text: 'Across from the Immaculate Conception Church.' },
  { title: '10–30 minutes', text: 'From Tignish, Alberton and O’Leary.' },
];

/* ---------- Preplanning ---------- */

export const PREPLAN_BENEFITS = [
  { title: 'Your own wishes', text: 'Planning ahead lets you make arrangements according to your own wishes.' },
  { title: 'Today’s prices', text: 'If funeral services are paid for in advance, they are guaranteed at today’s prices.' },
  {
    title: 'At once or by installments',
    text: 'The total amount can be paid at once or by installments agreed to by you and the funeral home.',
  },
  { title: 'Held in trust', text: 'Your money is held in trust and there is no risk of loss.' },
];

/* ---------- Board of directors ---------- */

export const BOARD_YEAR = 2026;

export const BOARD = [
  { name: 'Stella Gallant', role: 'Vice President', place: 'Thompson Road' },
  { name: 'Cathy Shea', role: 'Secretary', place: 'Waterford' },
  { name: 'Bruce Arsenault', role: 'Past President', place: 'Tignish' },
  { name: 'Judy Peters', role: 'Board Director', place: 'Waterford' },
  { name: 'Brendan Shea', role: 'Board Director', place: 'Harper Road' },
  { name: 'Francis Gaudet', role: 'Board Director', place: 'St. Edward' },
  { name: 'Todd Hinks', role: 'Board Director', place: 'Pleasant View' },
  { name: 'Yvette Gaudet', role: 'Board Director', place: 'Harper Road' },
  { name: 'Wanda Clark', role: 'Board Director', place: 'Alberton' },
];

export const BOARD_FACTS = [
  { value: '9', text: 'members on the board of directors, responsible for the operation of the funeral home.' },
  { value: 'March', text: 'is when the annual meeting is held.' },
  { value: '⅓', text: 'of the board is elected each year, for a three-year term.' },
  { value: '2', text: 'consecutive terms is the most a member may be elected for.' },
  { value: '6+', text: 'meetings a year are required of the board by the constitution.' },
];

/* ---------- History ---------- */

export const FOUNDERS = ['Willard Mokler', 'Leroy Doucette', 'Reg Gaudet', 'Clovis Doucette'];

export const TIMELINE = [
  { year: '1986', title: 'Our Charter', text: 'Our funeral co-op received its Charter and began operation.' },
  { year: '1986–1992', title: 'In the parish', text: 'For six years, facilities were rented from Palmer Road Parish.' },
  {
    year: '1992',
    title: 'A home of our own',
    text: 'A modern, fully-serviced building was built to accommodate the flourishing business.',
  },
  { year: 'Today', title: 'Still growing', text: 'West Prince Funeral Co-op continues to grow and has more than 600 members.' },
];

/* ---------- Donations ---------- */

export const DONATION_POINTS = [
  { title: 'Any charity', text: 'Memorial donations are accepted at the West Prince Funeral Home for any charity requested by the family.' },
  { title: 'A card for the family', text: 'The family receives a card identifying the donor.' },
  {
    title: 'Tax receipts',
    text: 'Official receipts for income tax purposes are issued to the donor by the organization receiving the donation.',
  },
];

/* ---------- Membership ---------- */

export const MEMBER_RIGHTS = [
  'The same rights as every other member, regardless of the number of shares held.',
  'To be notified of meetings of the membership.',
  'To attend meetings and vote on all matters brought before such meetings.',
  'To receive a copy of the audited financial statements each year.',
  'To approve the auditor appointed at each annual meeting.',
  'To stand for election to the Board of Directors, for those interested in being more involved with the overall administration of the affairs of the co-operative.',
];

/* ---------- Principles of co-operation ---------- */

export const PRINCIPLES = [
  {
    title: 'Open and Voluntary Membership',
    text: 'Anyone who will accept the responsibility of membership and who can use the services may join the co-operative.',
  },
  {
    title: 'Democratic Participation',
    text: 'At the local co-op level, each member has one vote, regardless of the amount of shares held. Member-owners control the co-op and have a responsibility to participate in decision making.',
  },
  {
    title: 'Limited Interest on Share Capital',
    text: 'Co-ops are organized to provide services and are not for investment purposes. Generally, no interest is paid on share capital.',
  },
  {
    title: 'Surplus Earnings Returned to Members',
    text: 'Surpluses, after expenses and reserve fund holdbacks, are returned to members in proportion to the use they make of the co-op.',
  },
  {
    title: 'Co-operative Education',
    text: 'Member education is a vital part of co-operatives. Each co-op has an obligation to provide opportunities to help members, elected officials, staff and the general public, in understanding co-operatives and their role.',
  },
  {
    title: 'Co-operation Among Co-operatives',
    text: 'All co-ops should actively co-operate in every practical way at local, national and international levels.',
  },
  {
    title: 'Concern for Community',
    text: 'Co-operatives accept the fact that they are vital and an important component of the communities in which they exist and must take steps to encourage the health of the community.',
  },
];
