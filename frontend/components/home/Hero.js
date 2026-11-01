import { ArrowRight } from 'lucide-react';
import Link from '@/components/ui/AppLink';
import Container from '@/components/ui/Container';
import Highlight from '@/components/ui/Highlight';
import { Eyebrow } from '@/components/ui/SectionHeading';
import HeroShowcase from './HeroShowcase';
import QuickStart from './QuickStart';

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
      <div className="backdrop-glow absolute inset-0 -z-20" aria-hidden="true" />
      <div className="backdrop-grid absolute inset-0 -z-10" aria-hidden="true" />

      <Container className="pb-16 pt-14 md:pt-16 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            {data.eyebrow ? (
              <div className="animate-rise">
                <Eyebrow dark>{data.eyebrow}</Eyebrow>
              </div>
            ) : null}
            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.03] tracking-[-0.03em] text-white sm:text-6xl xl:text-[4.5rem]">
              <Highlight text={data.heading} dark animated />
            </h1>

            <div className="animate-rise [animation-delay:450ms]">
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">{data.lead}</p>

              {data.cta_label ? (
                <div className="mt-9">
                  <QuickStart label={data.cta_label} target={data.cta_url} />
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-2 text-[0.9375rem]">
                {data.note ? <p className="text-white/70">{data.note}</p> : null}
                {data.secondary_cta_label ? (
                  <Link href={data.secondary_cta_url} className="group inline-flex items-center gap-1.5 font-medium text-white transition hover:text-brand-light">
                    {data.secondary_cta_label}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          {data.items?.length ? <HeroShowcase slides={data.items} /> : null}
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
