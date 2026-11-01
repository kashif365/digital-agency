'use client';

import { m, useScroll } from 'motion/react';

/** Thin bar along the top of the window showing how far down the page the visitor is. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return <m.div aria-hidden="true" style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-brand-light" />;
}
