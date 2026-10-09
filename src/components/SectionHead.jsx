export default function SectionHead({ eyebrow, title, children, className = '' }) {
  return (
    <div className={`section-head ${className}`}>
      <div className="section-head__main">
        {eyebrow && (
          <p className="eyebrow" data-reveal="up">
            {eyebrow}
          </p>
        )}
        <h2 className="section-head__title" data-split>
          {title}
        </h2>
      </div>
      {children && (
        <div className="section-head__aside" data-reveal="up">
          {children}
        </div>
      )}
    </div>
  );
}
