import Image from 'next/image';
import { BrandMark } from '@/components/layout/Logo';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Prose from '@/components/ui/Prose';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

const TREES = ['right-[36%] bottom-[26%] size-44 text-brand/45', 'right-[12%] bottom-[8%] size-72 text-brand-light', '-right-[4%] bottom-[20%] size-40 text-brand/60'];

/** The brand's evergreen mark, grown into a grove. Used when no image has been uploaded. */
function Grove({ label, title, text }) {
  return (
    <div className="relative isolate flex aspect-square flex-col justify-between overflow-hidden rounded-[1.75rem] bg-night p-7 sm:aspect-[5/4] lg:aspect-square">
      <div className="backdrop-glow absolute inset-0 -z-20" aria-hidden="true" />
      <div className="backdrop-grid absolute inset-0 -z-10" aria-hidden="true" />
      {TREES.map((classes) => (
        <BrandMark key={classes} className={`absolute -z-10 ${classes}`} />
      ))}
      {label ? <p className="w-fit rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/15">{label}</p> : null}
      {title ? (
        <div className="mt-auto w-fit max-w-full rounded-2xl bg-white px-5 py-4">
          <p className="font-display text-lg font-medium leading-tight text-heading">{title}</p>
          {text ? <p className="mt-0.5 text-sm text-muted">{text}</p> : null}
        </div>
      ) : null}
    </div>
  );
}

export default function IntroSection({ data }) {
  const items = data.items ?? [];

  return (
    <section className="py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          {data.image ? (
            <div className="relative aspect-square overflow-hidden rounded-[1.75rem]">
              <Image src={data.image.url} alt={data.image.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
            </div>
          ) : (
            <Grove label={data.badge} title={data.float_title} text={data.float_text} />
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} />
          <Prose html={data.body} className="mt-5 text-muted" />

          {items.length > 0 ? (
            <ul className="mt-8 grid gap-x-7 gap-y-6 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item.title} className="flex gap-3.5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-tint text-brand-dark">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-medium leading-snug text-heading">{item.title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}

          {data.cta_label || data.secondary_cta_label ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {data.cta_label ? <Button href={data.cta_url}>{data.cta_label}</Button> : null}
              {data.secondary_cta_label ? (
                <Button href={data.secondary_cta_url} variant="outline">
                  {data.secondary_cta_label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
