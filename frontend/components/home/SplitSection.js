import Image from 'next/image';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

export default function SplitSection({ data }) {
  const items = data.items ?? [];
  const reverse = Boolean(data.reverse);

  return (
    <section className="py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className={cn(reverse && 'lg:order-2')}>
          <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} />
          <ol className="mt-8 divide-y divide-line border-y border-line">
            {items.map((item, index) => (
              <li key={item.title} className="flex gap-5 py-6">
                <span className="font-display text-xl font-medium text-brand">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-xl font-medium leading-snug text-heading">{item.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {data.image ? (
          <Reveal className={cn('relative aspect-[9/10] overflow-hidden rounded-[1.75rem]', reverse && 'lg:order-1')}>
            <Image src={data.image.url} alt={data.image.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
