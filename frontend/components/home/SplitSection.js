import Image from 'next/image';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import Rings from '@/components/ui/Rings';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

export default function SplitSection({ data }) {
  const items = data.items ?? [];
  const reverse = Boolean(data.reverse);

  return (
    <section className="bg-white py-20 md:py-28">
      <Container className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-12">
        <Reveal className={cn('lg:col-span-6', reverse && 'lg:order-2')}>
          <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} />
          <ol className="mt-10 border-t border-forest/20">
            {items.map((item, index) => (
              <li key={item.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] border-b border-line py-6">
                <span className="pt-1 font-display text-sm text-clay-deep">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-xl text-forest">{item.title}</h3>
                  {item.text ? <p className="mt-1.5 leading-relaxed text-muted">{item.text}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className={cn('relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-forest lg:col-span-5', reverse ? 'lg:order-1' : 'lg:col-start-8')}>
          {data.image ? (
            <Image src={data.image.url} alt={data.image.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          ) : (
            <Rings seed={13} count={14} gap={22} className="absolute inset-0 size-full scale-150 text-sage/25" />
          )}
        </Reveal>
      </Container>
    </section>
  );
}
