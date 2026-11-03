'use client';

import { useEffect, useRef, useState } from 'react';
import { easeIn, easeOut } from 'motion/react';

/*
 * Bottom-to-top black wipe on first load. The bottom edge of the curtain rises into a dome
 * (ease-in), then flattens against the top of the screen (ease-out).
 * Each frame is [left edge, centre, right edge offset] in a 1000-unit viewBox.
 */
const COVER = [1005, 995, 5];
const DOME = [502, 272, 230];
const GONE = [0, 0, 0];
const STEP = 500;
// Measured from navigation start, so a slow hydration counts toward it instead of adding to it.
const HOLD = 400;
const FONT_WAIT = 1200;

const shape = ([left, centre, right]) => `M0 ${left}S175 ${centre} 500 ${centre}s500 ${right} 500 ${right}V0H0Z`;
const mix = (from, to, progress) => from.map((value, i) => value + (to[i] - value) * progress);

/** Rendered by the server so the first paint is already covered. Lives in the root layout, so client navigation never replays it. */
export default function PageCurtain() {
  const [done, setDone] = useState(false);
  const curtain = useRef(null);
  const path = useRef(null);

  useEffect(() => {
    let frame;
    let cancelled = false;
    // Reduced motion: CSS already keeps the curtain unpainted, so it is only removed.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fonts = Promise.race([document.fonts?.ready, new Promise((resolve) => setTimeout(resolve, FONT_WAIT))]);
    const hold = new Promise((resolve) => setTimeout(resolve, Math.max(0, HOLD - performance.now())));

    (reduced ? Promise.resolve() : Promise.all([fonts, hold])).then(() => {
      if (cancelled) return;
      // A very slow load may have reached the CSS fallback already; restarting would black the page out again.
      if (reduced || getComputedStyle(curtain.current).opacity !== '1') {
        setDone(true);
        return;
      }
      // JS has taken over, so the CSS fallback that hides a stuck curtain must not cut the wipe short.
      curtain.current.style.animation = 'none';
      curtain.current.style.pointerEvents = 'none';
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        if (elapsed >= STEP * 2) {
          setDone(true);
          return;
        }
        const frameShape =
          elapsed < STEP ? mix(COVER, DOME, easeIn(elapsed / STEP)) : mix(DOME, GONE, easeOut((elapsed - STEP) / STEP));
        path.current.setAttribute('d', shape(frameShape));
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, []);

  if (done) return null;

  return (
    <div ref={curtain} className="page-curtain" aria-hidden="true">
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path ref={path} d={shape(COVER)} />
      </svg>
    </div>
  );
}
