import Image from 'next/image';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Highlight from '@/components/ui/Highlight';
import { Eyebrow } from '@/components/ui/SectionHeading';
import GrowthSystem from './GrowthSystem';

function ServiceList({ services, hidden = false }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {services.map((service) => (
        <li key={service.slug} className="flex items-center whitespace-nowrap font-display text-lg text-white/60">
          <span className="px-7">{service.title}</span>
          <span className="size-1.5 rounded-full bg-brand-light" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export default function Hero({ data, allServices }) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      {data.image ? <Image src={data.image.url} alt="" fill preload sizes="100vw" className="-z-30 object-cover opacity-25" /> : null}
      <div className="backdrop-glow absolute inset-0 -z-20" aria-hidden="true" />
      <div className="backdrop-grid absolute inset-0 -z-10" aria-hidden="true" />

      <Container className="pb-16 pt-14 md:pt-20 lg:pb-24 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
          <div className="animate-rise">
            {data.eyebrow ? <Eyebrow dark>{data.eyebrow}</Eyebrow> : null}
            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.03] tracking-[-0.03em] text-white sm:text-6xl xl:text-[4.75rem]">
              <Highlight text={data.heading} dark />
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">{data.lead}</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {data.cta_label ? (
                <Button href={data.cta_url} arrow>
                  {data.cta_label}
                </Button>
              ) : null}
              {data.secondary_cta_label ? (
                <Button href={data.secondary_cta_url} variant="ghost">
                  {data.secondary_cta_label}
                </Button>
              ) : null}
            </div>
          </div>

          {data.items?.length ? <GrowthSystem label={data.badge} title={data.float_title} outcome={data.float_text} channels={data.items} /> : null}
        </div>
      </Container>

      {allServices.length > 0 ? (
        <div className="marquee-mask overflow-hidden border-t border-white/10 py-5">
          <div className="flex w-max animate-marquee">
            <ServiceList services={allServices} />
            <ServiceList services={allServices} hidden />
          </div>
        </div>
      ) : null}
    </section>
  );
}
