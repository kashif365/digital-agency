'use client';

import { useId, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Accordion({ items, dark = false }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <div className={cn('border-t', dark ? 'border-ivory/15' : 'border-line')}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.id ?? index} className={cn('border-b', dark ? 'border-ivory/15' : 'border-line')}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
                className={cn(
                  'group flex w-full items-start justify-between gap-6 py-6 text-left font-display text-xl leading-snug transition md:text-[1.375rem]',
                  dark ? 'text-ivory' : 'text-forest'
                )}
              >
                <span className="link-underline pb-0.5">{item.question}</span>
                <span className="relative mt-2 size-3.5 shrink-0" aria-hidden="true">
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                  <span className={cn('absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-300', open && 'scale-y-0')} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn('grid transition-[grid-template-rows] duration-300', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
            >
              <div className={cn('overflow-hidden', !open && 'invisible')}>
                <p className={cn('max-w-2xl pb-7 text-[1.0625rem] leading-relaxed', dark ? 'text-ivory/70' : 'text-muted')}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
