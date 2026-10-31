'use client';

import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { formatDate } from '@/lib/utils';

function Rating({ value }) {
  return (
    <div className="flex items-center gap-2" role="img" aria-label={`Rated ${value} out of 5`}>
      <span className="rounded-full bg-brand-dark px-2.5 py-0.5 text-xs font-bold text-white">{value}</span>
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} className={`size-4 ${index < value ? 'fill-brand-dark text-brand-dark' : 'text-line'}`} aria-hidden="true" />
        ))}
      </span>
    </div>
  );
}

export default function TestimonialCarousel({ testimonials }) {
  const track = useRef(null);

  const scroll = (direction) => {
    const element = track.current;

    element?.scrollBy({ left: direction * ((element.firstElementChild?.clientWidth ?? 320) + 24), behavior: 'smooth' });
  };

  return (
    <div>
      <ul ref={track} className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:none]" tabIndex={0} aria-label="Client testimonials">
        {testimonials.map((item) => (
          <li key={item.id} className="w-[88%] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
            <figure className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border-2 border-brand bg-white shadow-card">
              <div className="flex-1 p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <figcaption className="flex items-center gap-3">
                    {item.avatar ? <Image src={item.avatar.url} alt="" width={40} height={40} className="size-10 rounded-full object-cover" /> : null}
                    <span className="font-bold text-heading">{item.customer_name}</span>
                  </figcaption>
                  {item.rating ? <Rating value={item.rating} /> : null}
                </div>
                <Quote className="mt-3 size-6 fill-brand-tint text-brand-tint" aria-hidden="true" />
                <blockquote className="mt-2 leading-relaxed text-ink">{item.body}</blockquote>
              </div>
              {item.company_name || item.date ? (
                <p className="mx-3 mb-3 rounded-b-2xl border-t border-line bg-surface px-5 py-4 text-sm font-semibold uppercase tracking-wide text-muted">
                  {[item.company_name, formatDate(item.date)].filter(Boolean).join(' · ')}
                </p>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>

      {testimonials.length > 1 ? (
        <div className="mt-2 flex justify-center gap-3">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous testimonial" className="grid size-12 place-items-center rounded-full border border-line bg-white text-heading transition hover:border-brand hover:text-brand">
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next testimonial" className="grid size-12 place-items-center rounded-full border border-line bg-white text-heading transition hover:border-brand hover:text-brand">
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
