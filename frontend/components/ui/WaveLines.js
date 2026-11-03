import { cn } from '@/lib/utils';

const round = (value) => Math.round(value * 10) / 10;
const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Two families of closely spaced curves. Each line moves its start, control points, and
 * end a little further than the last, so together they read as one folded ribbon.
 */
function ribbon({ count, from, to }) {
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const p = (key) => [round(lerp(from[key][0], to[key][0], t)), round(lerp(from[key][1], to[key][1], t))];
    const [s, c1, c2, e] = ['start', 'c1', 'c2', 'end'].map(p);

    return `M${s[0]} ${s[1]}C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${e[0]} ${e[1]}`;
  });
}

// Drawn on a wide 16:9 canvas, so the ribbon arches through the middle of a hero.
const OUTER = ribbon({
  count: 64,
  from: { start: [360, 900], c1: [260, 240], c2: [980, -90], end: [1600, 170] },
  to: { start: [780, 900], c1: [700, 470], c2: [1160, 250], end: [1600, 570] },
});

const INNER = ribbon({
  count: 36,
  from: { start: [1600, 650], c1: [1260, 570], c2: [1100, 780], end: [1150, 900] },
  to: { start: [1600, 850], c1: [1420, 770], c2: [1310, 860], end: [1330, 900] },
});

/** Decorative wave of fine lines in the brand greens. Purely visual and never interactive. */
export default function WaveLines({ className }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none" className={cn('pointer-events-none select-none', className)} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="wave-outer" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#112c25" stopOpacity="0" />
          <stop offset="0.3" stopColor="#112c25" stopOpacity="0.2" />
          <stop offset="0.65" stopColor="#47612f" stopOpacity="0.3" />
          <stop offset="1" stopColor="#8fa86a" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="wave-inner" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fa86a" stopOpacity="0.5" />
          <stop offset="1" stopColor="#112c25" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <g stroke="url(#wave-outer)" strokeWidth="1">
        {OUTER.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <g stroke="url(#wave-inner)" strokeWidth="1">
        {INNER.map((d) => (
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}
