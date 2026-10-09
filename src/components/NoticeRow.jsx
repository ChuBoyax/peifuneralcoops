import { TLink } from '../lib/transition';
import { formatDate, fullName } from '../data/site';
import { ArrowIcon } from './Icons';

export default function NoticeRow({ notice }) {
  return (
    <li className="notice">
      <TLink
        to={`/condolences?for=${notice.id}`}
        className="notice__link"
        aria-label={`${fullName(notice)}, ${formatDate(notice.date)}. Send condolences to the family.`}
      >
        <span className="notice__date">{formatDate(notice.date)}</span>
        <span className="notice__name">
          {notice.last}, <em>{notice.first}</em>
        </span>
        <span className="notice__cta">
          Send condolences <ArrowIcon />
        </span>
      </TLink>
    </li>
  );
}
