import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

const DEFAULT_ICONS = ['search', 'compass', 'rocket', 'chart-column'];

export function ProcessSteps({ items }) {
  return (
    <Reveal>
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))] lg:gap-8" style={{ '--steps': items.length }}>
        {items.map((item, index) => (
          <li key={item.title} className={`relative text-center max-lg:rounded-2xl max-lg:border max-lg:border-line max-lg:p-6 ${index % 2 ? 'lg:mt-8' : ''}`}>
            {index < items.length - 1 ? (
              <span
                className={`absolute left-[calc(50%+5.5rem)] top-9 hidden w-[calc(100%-8.5rem)] border-t-2 border-dotted border-heading/70 lg:block ${index % 2 ? '-rotate-[5deg]' : 'rotate-[6deg]'}`}
                aria-hidden="true"
              />
            ) : null}
            <span className="relative mx-auto grid size-24 place-items-center text-heading">
              <Icon name={item.icon ?? DEFAULT_ICONS[index % 4]} className="size-14" strokeWidth={1.1} />
              <span className="absolute -right-3 -top-1 grid size-12 place-items-center rounded-full bg-charcoal font-display text-sm font-bold text-white">
                {String(index + 1).padStart(2, '0')}.
              </span>
            </span>
            <h3 className="mt-5 font-display text-2xl font-medium leading-snug text-heading">{item.title}</h3>
            {item.text ? <p className="mt-2 leading-relaxed text-muted">{item.text}</p> : null}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

export default function ProcessTimeline({ data }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} center className="mb-14" />
        <ProcessSteps items={data.items ?? []} />
      </Container>
    </section>
  );
}
