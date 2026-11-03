import { cn } from '@/lib/utils';
import Rings from './Rings';

export function hash(text = '') {
  return [...text].reduce((total, char) => (total * 31 + char.charCodeAt(0)) >>> 0, 7);
}

// Which drawing best describes a piece of work, chosen from the services it involved.
const KIND_BY_SERVICE = {
  'website-design-development': 'website',
  'landing-page-design': 'landing',
  'conversion-rate-optimization': 'landing',
  'search-engine-optimization': 'roadmap',
  'technical-seo': 'roadmap',
  'local-seo': 'roadmap',
  'marketing-analytics-reporting': 'roadmap',
  'pay-per-click-advertising': 'campaign',
  'social-media-marketing': 'campaign',
  'email-marketing': 'campaign',
  'social-media-management': 'calendar',
  'content-marketing': 'calendar',
  'video-marketing': 'calendar',
  'branding-graphic-design': 'brand',
};

const KIND_BY_CATEGORY = { 'search-marketing': 'roadmap', 'social-content': 'calendar', 'web-creative': 'website', 'growth-analytics': 'campaign' };

// The most specific deliverable wins: a brand project that also ran ads is still a brand project.
const PRIORITY = ['brand', 'landing', 'website', 'roadmap', 'campaign', 'calendar'];

export function artKind({ services = [], category } = {}) {
  const kinds = services.map((service) => KIND_BY_SERVICE[service.slug]).filter(Boolean);

  return PRIORITY.find((kind) => kinds.includes(kind)) ?? KIND_BY_CATEGORY[category] ?? 'rings';
}

const SANS = { fontFamily: 'var(--font-hanken)' };
const SERIF = { fontFamily: 'var(--font-fraunces)' };

function Website({ landing }) {
  return (
    <g>
      <rect x="60" y="48" width="360" height="264" rx="6" fill="#fbfaf6" />
      <path d="M60 54a6 6 0 0 1 6-6h348a6 6 0 0 1 6 6v18H60z" fill="#ebe7dc" />
      {[78, 90, 102].map((x) => (
        <circle key={x} cx={x} cy="60" r="3.5" fill="#d8d3c4" />
      ))}
      <rect x="84" y="90" width="44" height="7" rx="2" fill="#112c25" />
      {!landing ? [250, 288, 326].map((x) => <rect key={x} x={x} y="91" width="28" height="5" rx="2" fill="#d8d3c4" />) : null}
      <text x="84" y="142" fill="#112c25" fontSize="27" style={SERIF}>
        {landing ? 'One offer.' : 'Clear offer,'}
      </text>
      <text x="84" y="172" fill="#47612f" fontSize="27" fontStyle="italic" style={SERIF}>
        {landing ? 'One next step.' : 'easy next step.'}
      </text>
      <rect x="84" y="190" width="150" height="5" rx="2" fill="#d8d3c4" />
      <rect x="84" y="202" width="122" height="5" rx="2" fill="#d8d3c4" />
      <rect x="84" y="226" width="92" height="26" rx="3" fill="#112c25" />
      <rect x="96" y="237" width="58" height="4" rx="2" fill="#f5f3ec" />
      <rect x="270" y="122" width="126" height="164" rx="4" fill="#f5f3ec" stroke="#d8d3c4" />
      {[146, 178, 210].map((y) => (
        <g key={y}>
          <rect x="284" y={y - 10} width="40" height="4" rx="2" fill="#5e6662" opacity=".55" />
          <rect x="284" y={y - 2} width="98" height="18" rx="2" fill="#fbfaf6" stroke="#d8d3c4" />
        </g>
      ))}
      <rect x="284" y="250" width="98" height="22" rx="3" fill="#d1784f" />
    </g>
  );
}

const PHASES = [
  { label: 'Foundations', rows: [[0, 2], [0, 3], [1, 2]] },
  { label: 'On-page', rows: [[2, 2], [3, 3], [2, 4]] },
  { label: 'Content', rows: [[4, 4], [5, 3], [6, 2]] },
];

function Roadmap() {
  return (
    <g>
      <rect x="44" y="52" width="392" height="256" rx="6" fill="#fbfaf6" />
      <text x="68" y="88" fill="#112c25" fontSize="19" style={SERIF}>
        Search roadmap
      </text>
      <text x="412" y="88" textAnchor="end" fill="#5e6662" fontSize="10" letterSpacing="1.4" style={SANS}>
        PHASED PLAN
      </text>
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${152 + i * 30} 108V284`} stroke="#ebe7dc" />
      ))}
      {PHASES.map((phase, p) => (
        <g key={phase.label}>
          <text x="68" y={128 + p * 58} fill="#112c25" fontSize="11" fontWeight="600" style={SANS}>
            {phase.label}
          </text>
          {phase.rows.map(([start, length], r) => (
            <rect
              key={r}
              x={152 + start * 30}
              y={116 + p * 58 + r * 14}
              width={length * 30 - 6}
              height="9"
              rx="2"
              fill={p === 0 ? '#112c25' : p === 1 ? '#47612f' : '#b8cc8a'}
            />
          ))}
        </g>
      ))}
      <path d="M152 292h270" stroke="#d8d3c4" />
      <circle cx="152" cy="292" r="3.5" fill="#d1784f" />
    </g>
  );
}

const CHANNELS = [
  ['Search', 92],
  ['Social', 180],
  ['Email', 268],
];

function Campaign() {
  return (
    <g>
      {CHANNELS.map(([label, y]) => (
        <g key={label}>
          <path d={`M178 ${y}C250 ${y} 250 180 312 180`} stroke="#b8cc8a" strokeWidth="1.5" strokeDasharray="3 5" />
          <rect x="62" y={y - 22} width="116" height="44" rx="4" fill="#1a3a31" stroke="rgb(245 243 236 / .2)" />
          <circle cx="84" cy={y} r="4" fill="#b8cc8a" />
          <text x="98" y={y + 5} fill="#f5f3ec" fontSize="15" style={SANS}>
            {label}
          </text>
        </g>
      ))}
      <rect x="312" y="108" width="112" height="144" rx="5" fill="#f5f3ec" />
      <text x="328" y="140" fill="#112c25" fontSize="15" style={SERIF}>
        One page
      </text>
      <rect x="328" y="152" width="74" height="4" rx="2" fill="#d8d3c4" />
      <rect x="328" y="162" width="58" height="4" rx="2" fill="#d8d3c4" />
      <rect x="328" y="216" width="80" height="22" rx="3" fill="#d1784f" />
      <text x="368" y="231" textAnchor="middle" fill="#112c25" fontSize="10" fontWeight="600" style={SANS}>
        One goal
      </text>
    </g>
  );
}

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const FILLED = { 1: '#112c25', 3: '#47612f', 8: '#b8cc8a', 10: '#112c25', 12: '#d1784f', 15: '#47612f', 17: '#b8cc8a', 22: '#112c25', 24: '#47612f', 26: '#b8cc8a' };

function Calendar() {
  return (
    <g>
      <rect x="56" y="44" width="368" height="272" rx="6" fill="#fbfaf6" />
      <text x="80" y="82" fill="#112c25" fontSize="19" style={SERIF}>
        Content calendar
      </text>
      {DAYS.map((day, i) => (
        <text key={i} x={98 + i * 46} y="108" textAnchor="middle" fill="#5e6662" fontSize="10" fontWeight="600" style={SANS}>
          {day}
        </text>
      ))}
      {Array.from({ length: 28 }, (_, i) => (
        <rect
          key={i}
          x={78 + (i % 7) * 46}
          y={118 + Math.floor(i / 7) * 46}
          width="40"
          height="40"
          rx="3"
          fill={FILLED[i] ?? '#f5f3ec'}
          stroke={FILLED[i] ? 'none' : '#ebe7dc'}
        />
      ))}
    </g>
  );
}

function Brand() {
  return (
    <g>
      <rect x="52" y="52" width="196" height="256" rx="6" fill="#f5f3ec" />
      <text x="76" y="190" fill="#112c25" fontSize="104" style={SERIF}>
        Aa
      </text>
      <text x="76" y="236" fill="#5e6662" fontSize="11" letterSpacing="1.2" style={SANS}>
        DISPLAY / BODY
      </text>
      <rect x="76" y="252" width="112" height="4" rx="2" fill="#d8d3c4" />
      <rect x="76" y="262" width="84" height="4" rx="2" fill="#d8d3c4" />
      {[
        ['#112c25', 52],
        ['#b8cc8a', 140],
        ['#d1784f', 228],
      ].map(([color, y]) => (
        <rect key={color} x="264" y={y} width="164" height="80" rx="6" fill={color} stroke="rgb(245 243 236 / .2)" />
      ))}
    </g>
  );
}

const ART = { website: Website, landing: () => <Website landing />, roadmap: Roadmap, campaign: Campaign, calendar: Calendar, brand: Brand };

/**
 * Original drawings of the kind of deliverable a project produced. Used wherever a
 * record has no uploaded image, so concept work never borrows photos of strangers.
 */
export default function CoverArt({ seed, kind = 'rings', tone, className }) {
  const value = hash(seed);
  const Art = ART[kind];
  // The campaign drawing uses light text, so it always sits on forest.
  const dark = kind === 'campaign' || (tone ?? (value % 3 === 0 ? 'stone' : 'forest')) === 'forest';

  return (
    <div className={cn('relative overflow-hidden', dark ? 'bg-forest text-sage/25' : 'bg-stone text-forest/15', className)} aria-hidden="true">
      <Rings seed={value} count={12} gap={26} className="absolute -right-1/4 -top-1/3 h-[170%] w-auto" />
      {Art ? (
        <svg viewBox="0 0 480 360" className="absolute inset-0 size-full" fill="none">
          <Art />
        </svg>
      ) : null}
    </div>
  );
}
