import Icon from './Icon';

function hash(text = '') {
  return [...text].reduce((total, char) => (total * 31 + char.charCodeAt(0)) >>> 0, 7);
}

const GRID = (
  <g stroke="#fff" strokeOpacity=".06">
    {Array.from({ length: 10 }, (_, i) => (
      <path key={`v${i}`} d={`M${i * 44} 0V240`} />
    ))}
    {Array.from({ length: 6 }, (_, i) => (
      <path key={`h${i}`} d={`M0 ${i * 44}H400`} />
    ))}
  </g>
);

const PATTERNS = [
  <g key="rings" fill="none" stroke="#10a36f" strokeWidth="1.5">
    <circle cx="310" cy="70" r="46" strokeOpacity=".9" />
    <circle cx="310" cy="70" r="92" strokeOpacity=".5" />
    <circle cx="310" cy="70" r="138" strokeOpacity=".28" />
    <circle cx="310" cy="70" r="184" strokeOpacity=".14" />
    <circle cx="310" cy="70" r="7" fill="#10a36f" stroke="none" />
  </g>,
  <g key="bars" fill="#10a36f">
    <rect x="188" y="172" width="30" height="68" rx="6" fillOpacity=".25" />
    <rect x="228" y="140" width="30" height="100" rx="6" fillOpacity=".4" />
    <rect x="268" y="102" width="30" height="138" rx="6" fillOpacity=".6" />
    <rect x="308" y="56" width="30" height="184" rx="6" fillOpacity=".95" />
  </g>,
  <g key="line" fill="none" stroke="#10a36f" strokeWidth="3" strokeLinecap="round">
    <path d="M0 196 C 70 178, 100 200, 160 158 S 260 128, 300 92 S 370 46, 400 30" />
    <path d="M0 222 C 80 208, 120 222, 180 192 S 280 168, 400 92" strokeOpacity=".35" />
    <circle cx="300" cy="92" r="6" fill="#10a36f" stroke="none" />
  </g>,
  <g key="chevrons" fill="none" stroke="#10a36f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M250 96l50-50 50 50" />
    <path d="M226 150l74-74 74 74" strokeOpacity=".6" />
    <path d="M202 204l98-98 98 98" strokeOpacity=".3" />
  </g>,
];

/** Original branded artwork used wherever a record has no uploaded image yet. */
export default function CoverArt({ seed, variant, icon = 'sparkles', className }) {
  const value = hash(seed);
  const gradientId = `cover-${value}`;

  return (
    <div className={`relative overflow-hidden bg-night ${className ?? ''}`} aria-hidden="true">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#060b1a" />
            <stop offset="0.7" stopColor="#062e39" />
            <stop offset="1" stopColor="#05734a" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill={`url(#${gradientId})`} />
        {GRID}
        {PATTERNS[(variant ?? value) % PATTERNS.length]}
      </svg>
      <span className="absolute bottom-5 left-5 grid size-12 place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20">
        <Icon name={icon} className="size-5" />
      </span>
    </div>
  );
}
