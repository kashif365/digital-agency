import { Check, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

/** Each item's title is the usual approach, and its text is how this business does it. */
export default function Comparison({ data, settings }) {
  const items = data.items ?? [];

  return (
    <section className="py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} />
          {data.cta_label ? (
            <Button href={data.cta_url} arrow className="mt-8">
              {data.cta_label}
            </Button>
          ) : null}
        </div>

        <Reveal>
          <table className="w-full table-fixed border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th scope="col" className="px-3 pb-4 text-sm font-semibold text-muted sm:px-6">
                  The usual way
                </th>
                <th scope="col" className="rounded-t-[var(--radius-card)] bg-night px-4 pb-4 pt-6 font-display text-lg font-medium text-white sm:px-7">
                  {settings.company?.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const last = index === items.length - 1;

                return (
                  <tr key={item.title}>
                    <td className="border-t border-line px-3 py-5 align-top leading-snug text-muted sm:px-6">
                      <span className="flex gap-2.5">
                        <X className="mt-0.5 hidden size-4 shrink-0 text-muted sm:block" aria-hidden="true" />
                        {item.title}
                      </span>
                    </td>
                    <td className={`border-t border-white/10 bg-night px-4 py-5 align-top font-medium leading-snug text-white sm:px-7 ${last ? 'rounded-b-[var(--radius-card)]' : ''}`}>
                      <span className="flex gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-light" aria-hidden="true" />
                        {item.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </section>
  );
}
