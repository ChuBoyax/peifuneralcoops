/* The flower garlands from the original site, used as a quiet ornament */
export default function Flowers({ src, width, height, className = '' }) {
  return (
    <img
      className={`flowers ${className}`}
      src={src}
      width={width}
      height={height}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      data-reveal="draw"
    />
  );
}
