import { useRef } from 'react';
import { TLink } from '../lib/transition';
import { useReveal, useSpotlight, useDocumentTitle } from '../lib/hooks';
import { SITE, NOTICES, HOMES, formatDate, fullName } from '../data/site';
import CandleGlow from '../components/CandleGlow';
import Arches from '../components/Arches';
import Marquee from '../components/Marquee';
import ScrubText from '../components/ScrubText';
import SectionHead from '../components/SectionHead';
import NoticeRow from '../components/NoticeRow';
import Counter from '../components/Counter';
import { ArrowIcon, ArrowUpRightIcon, PhoneIcon, PinIcon } from '../components/Icons';
import building from '../assets/west-prince-building.jpg';
import coopHomes from '../../images/main/hp_home3.png';
import sign from '../../images/History/sign5.jpg';

export default function Home() {
  const ref = useRef(null);
  useReveal(ref);
  useSpotlight(ref);
  useDocumentTitle(null);
  const latest = NOTICES.slice(0, 5);

  return (
    <div className="page page--home" ref={ref}>
      {/* Hero */}
      <section className="home-hero is-dark grain">
        <CandleGlow />
        <Arches className="home-hero__arches" />
        <div className="container home-hero__inner" data-hero-out>
          <div className="home-hero__grid">
            <div className="home-hero__copy">
              <p className="eyebrow eyebrow--plain" data-reveal="hero">
                <span className="live-dot" aria-hidden="true" /> Palmer Road · St. Louis · Prince Edward Island
              </p>
              <h1 className="home-hero__title" data-split="now">
                For peace
                <br />
                <em>of mind.</em>
              </h1>
              <p className="lede" data-reveal="hero">
                {SITE.tagline}
              </p>
              <div className="btn-row" data-reveal="hero">
                <a className="btn btn--brass" href={SITE.phone.href}>
                  <PhoneIcon /> Call {SITE.phone.label}
                </a>
                <TLink className="btn btn--line-light" to="/if-a-death-occurs">
                  If a death occurs <ArrowIcon />
                </TLink>
              </div>
            </div>
            <figure className="home-hero__photo" data-reveal="hero-img">
              <img
                src={building}
                width="710"
                height="262"
                alt="West Prince Funeral Home, a white single-storey building with a covered entrance, on Thompson Road"
              />
              <figcaption>
                <PinIcon /> {SITE.address.street}
              </figcaption>
            </figure>
          </div>
          <ul className="home-hero__facts" data-reveal="hero">
            <li>
              <strong>1986</strong>
              <span>The year our co-op began</span>
            </li>
            <li>
              <strong>1st</strong>
              <span>Funeral co-op in Atlantic Canada</span>
            </li>
            <li>
              <strong>600+</strong>
              <span>Members and growing</span>
            </li>
            <li>
              <strong>24/7</strong>
              <span>Our phone is always answered</span>
            </li>
          </ul>
        </div>
      </section>

      <Marquee
        items={['Compassion', 'Dignity', 'Understanding', 'All denominations and beliefs', 'Answered 24 hours a day', 'Cooperatively owned']}
      />

      {/* Welcome */}
      <section className="section intro">
        <div className="container intro__grid">
          <div className="intro__side">
            <p className="eyebrow" data-reveal="up">
              Welcome
            </p>
            <p className="intro__note" data-reveal="up">
              West Prince Funeral Home
              <br />
              Palmer Road, Prince Edward Island
            </p>
          </div>
          <div>
            <ScrubText className="intro__text">
              By offering full quality and professional services, we will assist you from the beginning to the end to
              ensure the arrangements you make are satisfactory to you and to your family, and bring you peace of mind at
              a difficult time.
            </ScrubText>
            <div className="btn-row" data-reveal="up">
              <TLink className="btn btn--dark" to="/services">
                Our services <ArrowIcon />
              </TLink>
              <TLink className="btn btn--line" to="/history">
                Our history
              </TLink>
            </div>
          </div>
        </div>
      </section>

      {/* How can we help */}
      <section className="section section--flush-top">
        <div className="container">
          <SectionHead eyebrow="How can we help?" title={<>Guidance for <em>every step.</em></>}>
            <p className="lede">Whether you need us tonight or you are planning ahead, start here.</p>
          </SectionHead>

          <div className="bento" data-reveal="stagger">
            <TLink to="/if-a-death-occurs" className="bento__card bento__card--feature is-dark" data-spotlight>
              <span className="bento__num">01</span>
              <h3>If a death occurs</h3>
              <p>
                Our phone is answered 24 hours a day. A director will contact you to make the necessary arrangements.
              </p>
              <span className="bento__phone">{SITE.phone.label}</span>
              <span className="bento__go" aria-hidden="true">
                <ArrowIcon />
              </span>
            </TLink>
            <TLink to="/death-notices" className="bento__card" data-spotlight>
              <span className="bento__num">02</span>
              <h3>Death notices</h3>
              <p>
                Most recent: {fullName(latest[0])}, {formatDate(latest[0].date)}.
              </p>
              <span className="bento__go" aria-hidden="true">
                <ArrowIcon />
              </span>
            </TLink>
            <TLink to="/condolences" className="bento__card" data-spotlight>
              <span className="bento__num">03</span>
              <h3>Online condolences</h3>
              <p>Your words are printed and given to the family.</p>
              <span className="bento__go" aria-hidden="true">
                <ArrowIcon />
              </span>
            </TLink>
            <TLink to="/preplanning" className="bento__card" data-spotlight>
              <span className="bento__num">04</span>
              <h3>Preplanning</h3>
              <p>Arrangements made according to your own wishes, guaranteed at today’s prices when paid in advance.</p>
              <span className="bento__go" aria-hidden="true">
                <ArrowIcon />
              </span>
            </TLink>
            <TLink to="/donations" className="bento__card" data-spotlight>
              <span className="bento__num">05</span>
              <h3>Memorial donations</h3>
              <p>For any charity requested by the family.</p>
              <span className="bento__go" aria-hidden="true">
                <ArrowIcon />
              </span>
            </TLink>
            <TLink to="/find-us" className="bento__card bento__card--wide" data-spotlight>
              <span className="bento__num">06</span>
              <h3>Find us</h3>
              <p>
                {SITE.address.street}, {SITE.address.area}, across from the Immaculate Conception Church.
              </p>
              <span className="bento__go" aria-hidden="true">
                <ArrowIcon />
              </span>
            </TLink>
          </div>
        </div>
      </section>

      {/* Latest death notices */}
      <section className="section is-dark grain panel">
        <div className="container">
          <SectionHead eyebrow="Remembering" title={<>Death <em>notices</em></>}>
            <TLink className="btn btn--line-light" to="/death-notices">
              All notices <ArrowIcon />
            </TLink>
          </SectionHead>
          <ul className="notice-list" data-reveal="stagger">
            {latest.map((n) => (
              <NoticeRow key={n.id} notice={n} />
            ))}
          </ul>
        </div>
      </section>

      {/* Heritage */}
      <section className="section heritage">
        <div className="container heritage__grid">
          <div>
            <p className="eyebrow" data-reveal="up">
              Our story
            </p>
            <h2 className="heritage__title" data-split>
              The first funeral co-op in <em>Atlantic Canada.</em>
            </h2>
            <p className="lede" data-reveal="up">
              Formerly known as the Palmer Road Funeral Co-op, its inception sparked the flame for future funeral
              co-ops.
            </p>
            <div className="btn-row" data-reveal="up">
              <TLink className="btn btn--dark" to="/history">
                Read our history <ArrowIcon />
              </TLink>
            </div>
          </div>
          <figure className="framed sign-photo" data-reveal="img">
            <img src={sign} width="363" height="150" alt="Sign reading West Prince Funeral Home, Cooperatively Owned" loading="lazy" />
          </figure>
        </div>
        <div className="container stats" data-reveal="stagger">
          <div className="stat">
            <span className="stat__value">1986</span>
            <span className="stat__label">Charter received and operation began</span>
          </div>
          <div className="stat">
            <span className="stat__value">
              <Counter value={6} />
            </span>
            <span className="stat__label">Years in rented Palmer Road Parish facilities</span>
          </div>
          <div className="stat">
            <span className="stat__value">1992</span>
            <span className="stat__label">Our modern, fully-serviced building</span>
          </div>
          <div className="stat">
            <span className="stat__value">
              <Counter value={600} suffix="+" />
            </span>
            <span className="stat__label">Members today</span>
          </div>
        </div>
      </section>

      {/* Co-op family */}
      <section className="section section--flush-top coop">
        <div className="container coop__grid">
          <div>
            <p className="eyebrow" data-reveal="up">
              Our co-op family
            </p>
            <h2 className="coop__title" data-split>
              One of seven co-operative funeral homes across <em>Prince Edward Island.</em>
            </h2>
            <ul className="homes" data-reveal="stagger">
              {HOMES.map((h) => (
                <li key={h.name}>
                  {h.current ? (
                    <span className="homes__item is-here">
                      {h.name}
                      <span className="tag">You are here</span>
                    </span>
                  ) : (
                    <a className="homes__item" href={h.href} target="_blank" rel="noopener">
                      {h.name}
                      <ArrowUpRightIcon />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <figure className="framed coop__image" data-reveal="img">
            <img
              src={coopHomes}
              width="835"
              height="408"
              loading="lazy"
              alt="The seven co-operative funeral homes of Prince Edward Island: Central Queen’s, East Prince, Evangeline, Hillsboro, West Prince, Southern King’s and Queen’s, and North Shore"
            />
          </figure>
        </div>
      </section>

      {/* Membership + principles */}
      <section className="section section--flush-top">
        <div className="container duo" data-reveal="stagger">
          <TLink to="/membership" className="duo__card is-dark grain" data-spotlight>
            <span className="duo__big">$10</span>
            <div>
              <h3>Become a member</h3>
              <p>
                One membership share in West Prince Funeral Co-op Ltd. Every member has the same rights, regardless of the
                number of shares held.
              </p>
              <span className="text-link">
                Membership <ArrowIcon />
              </span>
            </div>
          </TLink>
          <TLink to="/principles-of-co-operation" className="duo__card duo__card--brass" data-spotlight>
            <span className="duo__big">7</span>
            <div>
              <h3>Principles of co-operation</h3>
              <p>The responsibilities every co-op has to its members and communities.</p>
              <span className="text-link">
                Read the principles <ArrowIcon />
              </span>
            </div>
          </TLink>
        </div>
      </section>
    </div>
  );
}
