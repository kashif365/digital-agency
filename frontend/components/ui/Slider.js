'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { Children, useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

/** Draggable, looping carousel. Autoplay pauses on hover and focus, and is off for reduced motion. */
export default function Slider({ children, label, autoplay = false, delay = 4200, align = 'start', slideClassName, controlsClassName, dark = false }) {
  const reducedMotion = useReducedMotion();
  const slides = Children.toArray(children);

  const plugins = useMemo(
    () => (autoplay && !reducedMotion ? [Autoplay({ delay, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true })] : []),
    [autoplay, delay, reducedMotion]
  );

  const [viewport, api] = useEmblaCarousel({ loop: true, align }, plugins);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) {
      return undefined;
    }

    const onSelect = () => setSelected(api.selectedScrollSnap());

    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  const buttonClasses = cn(
    'grid size-12 shrink-0 place-items-center rounded-full border transition duration-200 hover:-translate-y-0.5',
    dark ? 'border-white/25 text-white hover:border-brand-light hover:bg-brand' : 'border-line bg-white text-heading hover:border-brand hover:text-brand'
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={viewport} className="cursor-grab overflow-hidden active:cursor-grabbing">
        <div className="-ml-5 flex touch-pan-y">
          {slides.map((slide, index) => (
            <div
              key={slide.key ?? index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              data-active={index === selected}
              className={cn('min-w-0 shrink-0 grow-0 pl-5', slideClassName)}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className={cn('mt-9 flex items-center gap-5', controlsClassName)}>
        <div className={cn('h-1 flex-1 overflow-hidden rounded-full', dark ? 'bg-white/15' : 'bg-line')} aria-hidden="true">
          <div
            className="h-full rounded-full bg-brand-light transition-[margin] duration-500 ease-out"
            style={{ width: `${100 / slides.length}%`, marginLeft: `${(selected * 100) / slides.length}%` }}
          />
        </div>
        <button type="button" onClick={() => api?.scrollPrev()} aria-label={`Previous: ${label}`} className={buttonClasses}>
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => api?.scrollNext()} aria-label={`Next: ${label}`} className={buttonClasses}>
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
