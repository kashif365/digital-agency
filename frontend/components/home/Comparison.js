import { Check, X } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

/** Each item's title is the usual approach, and its text is what this business does instead. */
export default function Comparison({ data, settings }) {
  const items = data.items ?? [];

  return (
    <section className="bg-white py-20 md:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <div className={cn(data.image ? 'lg:col-span-5' : 'lg:col-span-12')}>
          <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} />
          {data.image ? (
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
              <Image src={data.image.url} alt={data.image.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
            </div>
          ) : null}
        </div>

        <Reveal className={cn(data.image ? 'lg:col-span-7 lg:pt-4' : 'lg:col-span-12')}>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">How {settings.company?.name} compares with the usual approach</caption>
            <thead>
              <tr>
                <th scope="col" className="w-1/2 pb-4 pr-4 text-sm font-semibold text-muted">
                  The usual agency approach
                </th>
                <th scope="col" className="rounded-t-[var(--radius-card)] bg-forest px-5 pb-4 pt-5 text-sm font-semibold text-sage">
                  Working with {settings.company?.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.title} className="align-top">
                  <td className="border-t border-line py-5 pr-4 leading-snug text-muted">
                    <span className="flex gap-2.5">
                      <X className="mt-0.5 size-4 shrink-0 text-clay-deep" aria-hidden="true" />
                      {item.title}
                    </span>
                  </td>
                  <td className={cn('border-t border-ivory/15 bg-forest px-5 py-5 font-medium leading-snug text-ivory', index === items.length - 1 && 'rounded-b-[var(--radius-card)]')}>
                    <span className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-sage" aria-hidden="true" />
                      {item.text}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.cta_label ? (
            <Button href={data.cta_url} arrow className="mt-10">
              {data.cta_label}
            </Button>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
