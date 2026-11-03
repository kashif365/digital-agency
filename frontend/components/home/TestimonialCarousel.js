'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { formatDate } from '@/lib/utils';

export default function TestimonialCarousel({ testimonials }) {
  const track = useRef(null);

  const scroll = (direction) => {
    const element = track.current;

    element?.scrollBy({ left: direction * (element.firstElementChild?.clientWidth ?? 320), behavior: 'smooth' });
  };

  return (
    <div>
      <ul ref={track} className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]" tabIndex={0} aria-label="Client testimonials">
        {testimonials.map((item) => (
          <li key={item.id} className="w-full shrink-0 snap-start pr-8">
            <figure className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <blockquote className="type-quote text-forest lg:col-span-9">&ldquo;{item.body}&rdquo;</blockquote>
              <figcaption className="flex items-center gap-4 border-t border-forest/20 pt-5 lg:col-span-3 lg:flex-col lg:items-start lg:self-end">
                {item.avatar ? <Image src={item.avatar.url} alt="" width={48} height={48} className="size-12 rounded-full object-cover" /> : null}
                <span>
                  <span className="block font-semibold text-forest">{item.customer_name}</span>
                  {item.company_name || item.date ? (
                    <span className="mt-0.5 block text-sm text-muted">{[item.company_name, formatDate(item.date)].filter(Boolean).join(' · ')}</span>
                  ) : null}
                  {item.rating ? <span className="mt-1 block text-sm text-muted">Rated {item.rating} out of 5</span> : null}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {testimonials.length > 1 ? (
        <div className="mt-10 flex gap-3">
          {[
            [-1, 'Previous testimonial', ArrowLeft],
            [1, 'Next testimonial', ArrowRight],
          ].map(([direction, label, Arrow]) => (
            <button
              key={label}
              type="button"
              onClick={() => scroll(direction)}
              aria-label={label}
              className="grid size-12 place-items-center rounded-full border border-forest/20 text-forest transition hover:border-forest hover:bg-forest hover:text-ivory"
            >
              <Arrow className="size-5" aria-hidden="true" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
