import Icon from '@/components/ui/Icon';

const COPY = 'fill-ivory text-[13px] font-medium';
const MUTED = 'fill-ivory/60 text-[12px]';
const WARNING = 'var(--color-clay)';

function Chip({ x, y, label, dx, dy, delay = '0s' }) {
  return (
    <g className="animate-drift" style={{ '--dx': dx, '--dy': dy, animationDelay: delay }}>
      <rect x={x} y={y} width="86" height="34" rx="11" fill="rgb(245 243 236 / 0.06)" stroke="rgb(245 243 236 / 0.28)" />
      <circle cx={x + 16} cy={y + 17} r="4" fill="var(--color-sage)" />
      <text x={x + 27} y={y + 22} className={COPY}>
        {label}
      </text>
    </g>
  );
}

function BrokenLink({ d, x, y }) {
  return (
    <>
      <path d={d} stroke="rgb(245 243 236 / 0.3)" strokeWidth="1.5" strokeDasharray="4 7" strokeLinecap="round" className="animate-flow" />
      <path d={`M${x - 4} ${y - 4}l8 8m0-8l-8 8`} stroke={WARNING} strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

/** Channels pulling away from a shared goal, with the links between them broken. */
function ScatteredChannels() {
  return (
    <svg viewBox="0 0 360 200" className="size-full" fill="none">
      <circle cx="180" cy="102" r="30" fill="rgb(245 243 236 / 0.04)" stroke="rgb(245 243 236 / 0.22)" strokeDasharray="3 5" />
      <text x="180" y="107" textAnchor="middle" className={MUTED}>
        Goal
      </text>

      <BrokenLink d="M104 54 L158 84" x={129} y={68} />
      <BrokenLink d="M256 58 L204 86" x={231} y={71} />
      <BrokenLink d="M180 158 L180 134" x={180} y={146} />

      <Chip x={18} y={22} label="Search" dx="-7px" dy="-6px" />
      <Chip x={256} y={26} label="Ads" dx="8px" dy="-5px" delay="-1.1s" />
      <Chip x={137} y={158} label="Social" dx="-3px" dy="7px" delay="-2s" />
    </svg>
  );
}

const BARS = [46, 66, 88, 110, 132];

/** Clicks keep climbing while the line that matters stays flat. */
function FlatReport() {
  return (
    <svg viewBox="0 0 360 200" className="size-full" fill="none">
      <circle cx="28" cy="24" r="4" fill="var(--color-sage)" />
      <text x="40" y="28" className={MUTED}>
        Clicks
      </text>
      <circle cx="98" cy="24" r="4" fill={WARNING} />
      <text x="110" y="28" className={MUTED}>
        Sales
      </text>

      {BARS.map((height, index) => (
        <rect
          key={height}
          x={50 + index * 56}
          y={176 - height}
          width="36"
          height={height}
          rx="7"
          fill="var(--color-sage)"
          fillOpacity={0.3 + index * 0.13}
          className="animate-grow"
          style={{ animationDelay: `${index * -0.35}s` }}
        />
      ))}

      <path d="M30 156 H334" stroke={WARNING} strokeWidth="2.5" strokeDasharray="8 7" strokeLinecap="round" className="animate-flow" />
      <circle cx="334" cy="156" r="5" fill={WARNING} />
      <path d="M30 177 H334" stroke="rgb(245 243 236 / 0.18)" />
    </svg>
  );
}

const LEAKS = [
  { cx: 136, cy: 62, dx: '-46px', dy: '62px', delay: '0s' },
  { cx: 224, cy: 62, dx: '46px', dy: '62px', delay: '-0.7s' },
  { cx: 158, cy: 94, dx: '-34px', dy: '58px', delay: '-1.3s' },
  { cx: 202, cy: 94, dx: '34px', dy: '58px', delay: '-1.9s' },
];

const INFLOW = [
  { cx: 150, delay: '0s' },
  { cx: 180, delay: '-0.8s' },
  { cx: 210, delay: '-1.6s' },
];

/** Visitors pour in, and most drip out before they become a lead. */
function LeakyFunnel() {
  return (
    <svg viewBox="0 0 360 200" className="size-full" fill="none">
      <text x="24" y="28" className={MUTED}>
        Visitors
      </text>
      <text x="336" y="182" textAnchor="end" className={MUTED}>
        Leads
      </text>

      {INFLOW.map((dot) => (
        <circle key={dot.cx} cx={dot.cx} cy="10" r="4.5" fill="rgb(245 243 236 / 0.85)" className="animate-leak" style={{ '--dx': '0px', '--dy': '48px', animationDelay: dot.delay }} />
      ))}

      <path d="M112 40 H248 L205 112 V150 H155 V112 Z" fill="rgb(245 243 236 / 0.05)" stroke="rgb(245 243 236 / 0.4)" strokeWidth="1.5" strokeLinejoin="round" />

      {LEAKS.map((leak) => (
        <g key={leak.cx}>
          <circle cx={leak.cx} cy={leak.cy} r="5" fill="var(--color-forest)" stroke={WARNING} strokeWidth="1.5" />
          <circle cx={leak.cx} cy={leak.cy} r="3.5" fill={WARNING} className="animate-leak" style={{ '--dx': leak.dx, '--dy': leak.dy, animationDelay: leak.delay }} />
        </g>
      ))}

      <circle cx="180" cy="168" r="6" fill="var(--color-sage)" className="animate-pulse-dot" />
      <path d="M190 176 H300" stroke="rgb(245 243 236 / 0.22)" strokeDasharray="3 5" />
    </svg>
  );
}

const ART = { layers: ScatteredChannels, 'chart-column': FlatReport, gauge: LeakyFunnel };

/** Illustrates a problem, chosen by the item's icon. No figures, so nothing reads as a result. */
export default function ProblemArt({ icon }) {
  const Art = ART[icon];

  return (
    <div className="relative h-44 rounded-[var(--radius-card)] bg-forest-soft/60 ring-1 ring-ivory/10" aria-hidden="true">
      {Art ? (
        <div className="relative size-full p-3">
          <Art />
        </div>
      ) : (
        <div className="relative grid size-full place-items-center text-sage">
          <Icon name={icon} className="size-12" strokeWidth={1.25} />
        </div>
      )}
    </div>
  );
}
