import { cn } from '@/lib/utils';

/** Small seeded generator, so the same seed always draws the same rings on server and client. */
function random(seed) {
  let value = seed >>> 0;

  return () => {
    value = (value + 0x6d2b79f5) >>> 0;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (value) => Math.round(value * 10) / 10;

/** Closed Catmull-Rom curve through the points, written as cubic Beziers. */
function smoothPath(points) {
  const count = points.length;
  let d = `M${round(points[0][0])} ${round(points[0][1])}`;

  for (let i = 0; i < count; i++) {
    const [x0, y0] = points[(i - 1 + count) % count];
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % count];
    const [x3, y3] = points[(i + 2) % count];

    d += `C${round(x1 + (x2 - x0) / 6)} ${round(y1 + (y2 - y0) / 6)} ${round(x2 - (x3 - x1) / 6)} ${round(y2 - (y3 - y1) / 6)} ${round(x2)} ${round(y2)}`;
  }

  return `${d}Z`;
}

/**
 * Growth rings: the brand's signature motif. Each ring wobbles like a tree's annual
 * ring, and the centre drifts slightly outward, the way real growth is never even.
 */
export function ringPaths({ seed = 7, count = 9, gap = 20, start = 16 }) {
  const next = random(seed);
  const waves = [2, 3, 5].map((frequency) => ({ frequency, phase: next() * Math.PI * 2, amount: 0.018 + next() * 0.03 }));
  const drift = next() * Math.PI * 2;
  const samples = 48;

  return Array.from({ length: count }, (_, ring) => {
    const radius = start + ring * gap * (0.92 + next() * 0.16);
    const cx = 200 + Math.cos(drift) * ring * 2.2;
    const cy = 200 + Math.sin(drift) * ring * 2.2;

    const points = Array.from({ length: samples }, (_, i) => {
      const angle = (i / samples) * Math.PI * 2;
      const wobble = waves.reduce((total, wave) => total + wave.amount * Math.sin(wave.frequency * angle + wave.phase + ring * 0.08), 0);
      const r = radius * (1 + wobble * (0.6 + ring / count));

      return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
    });

    return smoothPath(points);
  });
}

export default function Rings({ seed, count, gap, start, animated = false, className, strokeWidth = 1 }) {
  const paths = ringPaths({ seed, count, gap, start });

  return (
    <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={cn('pointer-events-none', className)} aria-hidden="true">
      {paths.map((d, index) => (
        <path
          key={d}
          d={d}
          vectorEffect="non-scaling-stroke"
          pathLength={animated ? 1 : undefined}
          strokeDasharray={animated ? 1 : undefined}
          className={animated ? 'animate-draw' : undefined}
          style={animated ? { animationDelay: `${index * 90}ms` } : undefined}
        />
      ))}
    </svg>
  );
}
