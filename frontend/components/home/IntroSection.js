import Image from 'next/image';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Highlight from '@/components/ui/Highlight';
import Icon from '@/components/ui/Icon';
import Prose from '@/components/ui/Prose';
import Reveal from '@/components/ui/Reveal';

export default function IntroSection({ data }) {
  const items = data.items ?? [];

  return (
    <section className="overflow-hidden py-16 md:py-24">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <Reveal className="relative">
          {data.image ? (
            <div className="relative aspect-[4/4.2] overflow-hidden rounded-[1.25rem] shadow-card sm:aspect-[5/4] lg:aspect-[1/1]">
              <Image src={data.image.url} alt={data.image.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
            </div>
          ) : null}
          {data.badge ? (
            <p className="absolute left-5 top-5 max-w-[10rem] rounded-2xl bg-brand px-5 py-4 text-center font-display text-lg font-extrabold leading-tight text-white shadow-lift">
              {data.badge}
            </p>
          ) : null}
          {data.float_title ? (
            <div className="absolute -bottom-6 right-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-card">
              <span className="grid size-12 place-items-center rounded-full bg-brand-tint text-brand">
                <Icon name="handshake" className="size-6" />
              </span>
              <span>
                <span className="block font-display text-lg font-bold leading-tight text-brand">{data.float_title}</span>
                <span className="block text-sm text-muted">{data.float_text}</span>
              </span>
            </div>
          ) : null}
        </Reveal>

        <Reveal delay={0.1}>
          {data.eyebrow ? (
            <p className="inline-block border-b-2 border-brand font-display text-xl font-bold uppercase tracking-[0.04em] text-heading md:text-2xl">{data.eyebrow}</p>
          ) : null}
          <h2 className="mt-3 text-3xl font-bold leading-[1.16] text-heading md:text-[2.5rem]">
            <Highlight text={data.heading} />
          </h2>
          {data.lead ? <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">{data.lead}</p> : null}
          <Prose html={data.body} className="mt-4 text-muted" />

          {items.length > 0 ? (
            <ul className="mt-7 grid gap-x-7 gap-y-5 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item.title} className="flex gap-3.5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-alt text-brand">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-medium leading-snug text-heading">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-4">
            {data.cta_label ? <Button href={data.cta_url}>{data.cta_label}</Button> : null}
            {data.secondary_cta_label ? (
              <Button href={data.secondary_cta_url} variant="outline">
                {data.secondary_cta_label}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
