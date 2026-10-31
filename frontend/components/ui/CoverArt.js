import Icon from './Icon';

function hash(text = '') {
  return [...text].reduce((total, char) => (total * 31 + char.charCodeAt(0)) >>> 0, 7);
}

const PATTERNS = [
  <g key="rings" fill="none" stroke="#fff" strokeOpacity=".16" strokeWidth="1.5">
    <circle cx="330" cy="40" r="60" />
    <circle cx="330" cy="40" r="110" />
    <circle cx="330" cy="40" r="160" />
    <circle cx="330" cy="40" r="210" />
  </g>,
  <g key="bars" fill="#fff" fillOpacity=".12">
    <rect x="212" y="150" width="28" height="80" rx="6" />
    <rect x="252" y="118" width="28" height="112" rx="6" />
    <rect x="292" y="84" width="28" height="146" rx="6" />
    <rect x="332" y="44" width="28" height="186" rx="6" />
  </g>,
  <g key="line" fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="3" strokeLinecap="round">
    <path d="M0 188 C 70 170, 100 196, 160 150 S 260 120, 300 84 S 370 40, 400 26" />
    <path d="M0 214 C 80 200, 120 214, 180 182 S 280 158, 400 80" strokeOpacity=".12" />
  </g>,
  <g key="dots" fill="#fff" fillOpacity=".14">
    {Array.from({ length: 36 }, (_, i) => (
      <circle key={i} cx={232 + (i % 6) * 30} cy={24 + Math.floor(i / 6) * 30} r="3" />
    ))}
  </g>,
];

/** Original branded artwork used wherever a record has no uploaded image yet. */
export default function CoverArt({ seed, icon = 'sparkles', className }) {
  const value = hash(seed);
  const gradientId = `cover-${value}`;

  return (
    <div className={`relative overflow-hidden bg-dark ${className ?? ''}`} aria-hidden="true">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#060b1a" />
            <stop offset="0.6" stopColor="#062e39" />
            <stop offset="1" stopColor="#008854" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill={`url(#${gradientId})`} />
        {PATTERNS[value % PATTERNS.length]}
      </svg>
      <span className="absolute bottom-4 left-4 grid size-11 place-items-center rounded-xl bg-white/12 text-white ring-1 ring-white/20">
        <Icon name={icon} className="size-5" />
      </span>
    </div>
  );
}
