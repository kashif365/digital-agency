'use client';

import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <div className="rounded-2xl bg-white px-5 py-2 shadow-[0_6px_28px_rgb(12_14_26/0.1)] md:px-6">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.id ?? index} className="border-b border-line last:border-b-0">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
                className="flex w-full items-center justify-between gap-5 py-5 text-left font-display text-[1.125rem] font-bold leading-snug text-teal transition hover:text-brand"
              >
                {item.question}
                <Plus className={cn('size-5 shrink-0 transition-transform duration-300', open && 'rotate-45 text-brand')} aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn('grid transition-[grid-template-rows] duration-300', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
            >
              <div className={cn('overflow-hidden', !open && 'invisible')}>
                <p className="pb-6 leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
