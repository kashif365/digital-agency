'use client';

import { m } from 'motion/react';
import { Children } from 'react';

const GROUP = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const ITEM = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } } };

/** Brings a grid's items in one after another as it scrolls into view. */
export default function Stagger({ as = 'div', itemAs = 'div', className, itemClassName = 'h-full', style, children }) {
  const Group = m[as];
  const Item = m[itemAs];

  return (
    <Group className={className} style={style} variants={GROUP} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
      {Children.toArray(children).map((child, index) => (
        <Item key={child.key ?? index} data-reveal className={itemClassName} variants={ITEM}>
          {child}
        </Item>
      ))}
    </Group>
  );
}
