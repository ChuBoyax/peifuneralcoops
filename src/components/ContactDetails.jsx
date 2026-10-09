import { SITE } from '../data/site';

export function Address({ withName = true }) {
  const { street, area, city, postal } = SITE.address;
  return (
    <address className="address">
      {withName && (
        <>
          {SITE.name}
          <br />
        </>
      )}
      {street}
      <br />
      {area}
      <br />
      {city} {postal}
    </address>
  );
}

export default function ContactDetails({ withAddress = false }) {
  return (
    <dl className="details">
      {withAddress && (
        <div>
          <dt>Address</dt>
          <dd>
            <Address />
          </dd>
        </div>
      )}
      <div>
        <dt>Phone</dt>
        <dd>
          <a href={SITE.phone.href}>{SITE.phone.label}</a> <span className="tag">24 hours</span>
        </dd>
      </div>
      <div>
        <dt>Cell</dt>
        <dd>
          <a href={SITE.cell.href}>{SITE.cell.label}</a>
        </dd>
      </div>
      <div>
        <dt>Fax</dt>
        <dd>{SITE.fax}</dd>
      </div>
      <div>
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> <span className="tag">New</span>
        </dd>
      </div>
      <div>
        <dt>Also</dt>
        <dd>
          <a href={`mailto:${SITE.emailAlt}`}>{SITE.emailAlt}</a>
        </dd>
      </div>
    </dl>
  );
}
