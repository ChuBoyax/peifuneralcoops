import { useRef } from 'react';
import { TLink } from '../lib/transition';
import { useReveal, useDocumentTitle } from '../lib/hooks';
import PageHero from '../components/PageHero';
import { ArrowIcon } from '../components/Icons';

export default function NotFound() {
  const ref = useRef(null);
  useReveal(ref);
  useDocumentTitle('Page not found');

  return (
    <div className="page" ref={ref}>
      <PageHero
        eyebrow="404"
        title={
          <>
            This page <em>can’t be found.</em>
          </>
        }
        lede="The page may have moved. Everything on our site is a short walk from the home page."
      >
        <TLink className="btn btn--brass" to="/">
          Back to home <ArrowIcon />
        </TLink>
      </PageHero>
    </div>
  );
}
