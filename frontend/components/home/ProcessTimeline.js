import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const DEFAULT_ICONS = ['search', 'compass', 'rocket', 'trending-up'];

export function ProcessSteps({ items, dark = false }) {
  return (
    <Reveal>
      <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))]" style={{ '--steps': items.length }}>
        {items.map((item, index) => (
          <li key={item.title} className={cn('relative border-t pt-7', dark ? 'border-white/15' : 'border-line')}>
            <span className="absolute -top-[5px] left-0 size-[9px] rounded-full bg-brand-light" aria-hidden="true" />
            <div className="flex items-center justify-between">
              <span className={cn('font-display text-5xl font-medium tracking-tight', dark ? 'text-white' : 'text-heading')}>{String(index + 1).padStart(2, '0')}</span>
              <span className={cn('grid size-11 place-items-center rounded-2xl', dark ? 'bg-white/8 text-brand-light' : 'bg-brand-tint text-brand-dark')}>
                <Icon name={item.icon ?? DEFAULT_ICONS[index % 4]} className="size-5" />
              </span>
            </div>
            <h3 className={cn('mt-6 text-2xl font-medium leading-snug', dark ? 'text-white' : 'text-heading')}>{item.title}</h3>
            {item.text ? <p className={cn('mt-2 leading-relaxed', dark ? 'text-white/70' : 'text-muted')}>{item.text}</p> : null}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

export default function ProcessTimeline({ data }) {
  return (
    <section id="process" className="bg-night py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} dark className="mb-16" />
        <ProcessSteps items={data.items ?? []} dark />
      </Container>
    </section>
  );
}
