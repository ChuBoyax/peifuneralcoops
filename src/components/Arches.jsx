/* Concentric chapel arches, drawn in fine brass line */
const W = 600;
const CY = 330;

export default function Arches({ className = '', count = 5, gap = 50 }) {
  return (
    <svg className={`arches ${className}`} viewBox={`0 0 ${W} 900`} aria-hidden="true" focusable="false" data-draw>
      {Array.from({ length: count }, (_, i) => {
        const inset = i * gap;
        const r = (W - inset * 2) / 2;
        return <path key={i} pathLength="1" d={`M${inset} 900V${CY}A${r} ${r} 0 0 1 ${W - inset} ${CY}V900`} />;
      })}
    </svg>
  );
}
