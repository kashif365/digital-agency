'use client';

import { useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

/** Photo slider with a timed tab for each channel. The bar's animation drives the timing. */
export default function HeroShowcase({ slides }) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = slides[active];

  return (
    <div
      className="animate-rise [animation-delay:200ms]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/5 shadow-float">
        {slides.map((slide, index) =>
          slide.image ? (
            <Image
              key={slide.title}
              src={slide.image.url}
              alt={index === active ? slide.image.alt : ''}
              fill
              preload={index === 0}
              sizes="(min-width: 1024px) 620px, 100vw"
              className={cn('object-cover transition duration-700 ease-out', index === active ? 'scale-100 opacity-100' : 'scale-110 opacity-0')}
            />
          ) : null
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-transparent" aria-hidden="true" />

        <div key={current.title} className="absolute inset-x-0 bottom-0 animate-rise p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-light">{current.title}</p>
          <p className="mt-1.5 max-w-md font-display text-2xl font-medium leading-tight text-white md:text-[2rem]">{current.text}</p>
        </div>
      </div>

      <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {slides.map((slide, index) => (
          <li key={slide.title}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={index === active}
              className={cn(
                'relative flex h-full w-full items-center gap-2.5 overflow-hidden rounded-2xl border px-3 py-3.5 text-left text-sm font-medium leading-tight transition duration-300',
                index === active ? 'border-brand-light/60 bg-brand/25 text-white' : 'border-white/12 bg-white/[0.05] text-white/70 hover:border-white/30 hover:text-white'
              )}
            >
              <Icon name={slide.icon} className="size-4 shrink-0 text-brand-light" />
              {slide.title}
              {index === active && !reducedMotion ? (
                <span
                  key={active}
                  aria-hidden="true"
                  onAnimationEnd={() => setActive((active + 1) % slides.length)}
                  style={{ animationPlayState: paused ? 'paused' : 'running' }}
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left animate-fill bg-brand-light"
                />
              ) : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
