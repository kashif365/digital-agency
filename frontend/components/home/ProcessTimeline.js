'use client';

import { m } from 'motion/react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Stagger from '@/components/ui/Stagger';
import { cn } from '@/lib/utils';

const LINE = { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.9, ease: 'easeOut' } } };
const pad = (number) => String(number).padStart(2, '0');

/** Horizontal steps, used inside service pages where the process is short. */
export function ProcessSteps({ items, dark = false }) {
  return (
    <Stagger
      as="ol"
      itemAs="li"
      className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))]"
      itemClassName={cn('relative border-t pt-8', dark ? 'border-ivory/20' : 'border-forest/20')}
      style={{ '--steps': items.length }}
    >
      {items.map((item, index) => (
        <div key={item.title}>
          <m.span variants={LINE} className={cn('absolute -top-px left-0 h-px w-full origin-left', dark ? 'bg-sage' : 'bg-forest')} aria-hidden="true" />
          <span className={cn('font-display text-sm', dark ? 'text-sage' : 'text-clay-deep')}>Step {pad(index + 1)}</span>
          <h3 className={cn('type-h3 mt-3', dark ? 'text-ivory' : 'text-forest')}>{item.title}</h3>
          {item.text ? <p className={cn('mt-3 leading-relaxed', dark ? 'text-ivory/70' : 'text-muted')}>{item.text}</p> : null}
        </div>
      ))}
    </Stagger>
  );
}

/** The working process: a photo beside the stages, so the section is never a heading over empty space. */
export default function ProcessTimeline({ data }) {
  const items = data.items ?? [];

  return (
    <section id="process" className="bg-stone py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} className="mb-12 md:mb-16" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {data.image ? (
            <div className="relative min-h-72 overflow-hidden rounded-[var(--radius-card)] lg:col-span-5">
              <Image src={data.image.url} alt={data.image.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
            </div>
          ) : null}
          <Stagger as="ol" itemAs="li" className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', data.image ? 'lg:col-span-7' : 'lg:col-span-12 lg:grid-cols-4')}>
            {items.map((item, index) => (
              <div key={item.title} className="flex h-full flex-col rounded-[var(--radius-card)] bg-paper p-7">
                <span className="grid size-11 place-items-center rounded-full bg-forest font-display text-lg text-sage" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="type-h3 mt-5 text-forest">
                  <span className="sr-only">Step {index + 1}: </span>
                  {item.title}
                </h3>
                {item.text ? <p className="mt-2.5 leading-relaxed text-muted">{item.text}</p> : null}
              </div>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
