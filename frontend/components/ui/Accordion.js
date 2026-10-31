'use client';

import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.id ?? index} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl font-medium leading-snug text-heading transition hover:text-brand"
              >
                {item.question}
                <span className={cn('grid size-9 shrink-0 place-items-center rounded-full border border-line transition duration-300', open && 'rotate-45 border-brand bg-brand text-white')}>
                  <Plus className="size-4" aria-hidden="true" />
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
                <p className="max-w-2xl pb-7 text-[1.0625rem] leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
