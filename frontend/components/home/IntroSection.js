import { Check } from 'lucide-react';
import Image from 'next/image';
import Button, { TextLink } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Prose from '@/components/ui/Prose';
import Reveal from '@/components/ui/Reveal';
import Rings from '@/components/ui/Rings';
import { Eyebrow, Heading } from '@/components/ui/SectionHeading';

/** Photo beside the story, with the key facts listed underneath. */
export default function IntroSection({ data }) {
  const items = data.items ?? [];

  return (
    <section className="py-20 md:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="absolute -bottom-5 -left-5 hidden h-2/3 w-2/3 rounded-[var(--radius-card)] bg-sage/60 sm:block" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-forest">
              {data.image ? (
                <Image src={data.image.url} alt={data.image.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
              ) : (
                <Rings seed={3} count={14} gap={22} className="absolute inset-0 size-full scale-150 text-sage/25" />
              )}
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          {data.eyebrow ? <Eyebrow>{data.eyebrow}</Eyebrow> : null}
          {data.heading ? <Heading text={data.heading} className="mt-5 max-w-3xl" /> : null}
          {data.lead ? <p className="type-lead mt-5 max-w-2xl text-muted">{data.lead}</p> : null}
          <Prose html={data.body} className="mt-6 max-w-2xl text-[1.0625rem]" />

          {items.length > 0 ? (
            <ul className="mt-9 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item.title} className="flex gap-3.5">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-forest text-sage">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-forest">{item.title}</span>
                    {item.text ? <span className="mt-1 block text-[0.9375rem] leading-relaxed text-muted">{item.text}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {data.cta_label || data.secondary_cta_label ? (
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              {data.cta_label ? (
                <Button href={data.cta_url} arrow>
                  {data.cta_label}
                </Button>
              ) : null}
              {data.secondary_cta_label ? <TextLink href={data.secondary_cta_url}>{data.secondary_cta_label}</TextLink> : null}
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
