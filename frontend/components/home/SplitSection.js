import Image from 'next/image';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

export default function SplitSection({ data }) {
  const items = data.items ?? [];
  const reverse = Boolean(data.reverse);

  return (
    <section className="overflow-hidden py-12 md:py-16">
      <Container className={cn('grid items-center gap-10 lg:gap-16', reverse ? 'lg:grid-cols-[1fr_1.5fr]' : 'lg:grid-cols-[1.5fr_1fr]')}>
        <Reveal className={cn(reverse && 'lg:order-2')}>
          {data.eyebrow ? <Eyebrow className="text-lg md:text-[1.375rem]">{data.eyebrow}</Eyebrow> : null}
          {data.lead ? <p className="mt-3 leading-relaxed text-ink">{data.lead}</p> : null}
          <ol className="mt-8 space-y-8">
            {items.map((item, index) => (
              <li key={item.title}>
                <h3 className="font-display text-2xl font-bold leading-snug text-ink">
                  {reverse ? null : `${index + 1}. `}
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink">{item.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {data.image ? (
          <Reveal className={cn('relative', reverse && 'lg:order-1')}>
            {reverse ? <span className="absolute -right-3 -top-3 left-8 bottom-8 rounded-[2rem] bg-brand-bright" aria-hidden="true" /> : null}
            <div
              className={cn(
                'relative aspect-[9/10] overflow-hidden shadow-card',
                reverse ? 'mr-6 mt-6 rounded-[2rem] border-4 border-white' : 'rounded-[1.25rem] border border-brand'
              )}
            >
              <Image src={data.image.url} alt={data.image.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            </div>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
