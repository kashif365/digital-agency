'use client';

import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import Link from '@/components/ui/AppLink';
import Icon from '@/components/ui/Icon';

const BAR_WIDTH = 20;

export default function IndustriesCarousel({ eyebrow, heading, industries }) {
  const track = useRef(null);
  const [progress, setProgress] = useState(0);

  const scroll = (direction) => {
    const element = track.current;

    element?.scrollBy({ left: direction * ((element.firstElementChild?.clientWidth ?? 320) + 30), behavior: 'smooth' });
  };

  const onScroll = (event) => {
    const element = event.currentTarget;
    const room = element.scrollWidth - element.clientWidth;

    setProgress(room > 0 ? element.scrollLeft / room : 0);
  };

  return (
    <div>
      <div className="mb-9 flex items-end justify-between gap-6">
        <div className="max-w-3xl">
          {heading ? <h2 className="text-[1.75rem] font-medium leading-tight text-ink md:text-[2rem]">{heading}</h2> : null}
          {eyebrow ? <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-brand">{eyebrow}</p> : null}
        </div>
        <div className="hidden shrink-0 gap-3 sm:flex">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous industries" className="grid size-14 place-items-center rounded-full border border-line text-heading transition hover:border-brand hover:text-brand">
            <ArrowLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next industries" className="grid size-14 place-items-center rounded-full border border-line text-heading transition hover:border-brand hover:text-brand">
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul ref={track} onScroll={onScroll} className="relative flex snap-x snap-mandatory gap-[1.875rem] overflow-x-auto pb-3 [scrollbar-width:none]" tabIndex={0} aria-label="Industries">
        {industries.map((industry) => (
          <li key={industry.slug} className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.94rem)] lg:w-[calc(25%-1.41rem)]">
            <div className="group flex h-full flex-col rounded-[var(--radius-card)] border border-heading bg-white p-8 transition duration-300 hover:border-brand hover:shadow-lift">
              <span className="grid size-[3.75rem] place-items-center rounded-2xl bg-brand text-white">
                <Icon name={industry.icon} className="size-7" />
              </span>
              <h3 className="mt-6 font-display text-[1.375rem] font-medium leading-snug text-heading transition group-hover:text-brand">{industry.name}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{industry.short_description}</p>
              {industry.has_page ? (
                <Link href={`/industries/${industry.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-heading transition hover:text-brand">
                  Learn More
                  <span className="sr-only"> about {industry.name}</span>
                  <ChevronRight className="size-4" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-10 h-1 w-full max-w-sm rounded-full bg-line" aria-hidden="true">
        <div className="h-full rounded-full bg-brand" style={{ width: `${BAR_WIDTH}%`, marginLeft: `${progress * (100 - BAR_WIDTH)}%` }} />
      </div>
    </div>
  );
}
