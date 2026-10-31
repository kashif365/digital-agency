'use client';

import { m } from 'motion/react';

/** Fades a block in once as it scrolls into view. Use per section, not per card, and never above the fold. */
export default function Reveal({ delay = 0, className, children }) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </m.div>
  );
}
