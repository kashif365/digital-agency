import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import ConsultationForm from '@/components/forms/ConsultationForm';
import Link from '@/components/ui/AppLink';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Highlight from '@/components/ui/Highlight';
import Icon from '@/components/ui/Icon';
import { groupByCategory } from '@/lib/utils';

const CATEGORY_ICONS = {
  'search-marketing': 'search',
  'social-content': 'share-2',
  'web-creative': 'monitor-smartphone',
  'growth-analytics': 'chart-column',
};

function CategoryCards({ services }) {
  return (
    <ul className="relative z-10 mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
      {groupByCategory(services).map((category) => (
        <li key={category.slug}>
          <Link
            href={`/services#${category.slug}`}
            className="group flex h-full items-center gap-4 rounded-[1.25rem] bg-white p-5 text-heading shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand text-white">
              <Icon name={CATEGORY_ICONS[category.slug] ?? 'sparkles'} className="size-7" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg font-bold uppercase leading-tight">{category.name}</span>
              <span className="mt-0.5 block text-sm text-muted">{category.services.length} services</span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-brand" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Hero({ data, allServices, settings }) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      {data.image ? (
        <Image src={data.image.url} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      ) : null}
      <div className="absolute inset-0 -z-10 bg-night/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-night/95 lg:via-night/80 lg:to-night/55" aria-hidden="true" />

      <Container className="pb-10 pt-10 md:pt-14 lg:pb-12 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_27rem] lg:gap-10 xl:grid-cols-[1fr_35rem] xl:gap-14">
          <div className="animate-rise">
            {data.eyebrow ? (
              <p className="inline-flex rounded-full bg-brand px-5 py-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-white sm:text-[0.8125rem]">
                {data.eyebrow}
              </p>
            ) : null}
            <h1 className="mt-7 text-[2.125rem] font-extrabold leading-[1.14] text-white md:text-[2.75rem]">
              <Highlight text={data.heading} dark />
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/85">{data.lead}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {data.cta_label ? (
                <Button href={data.cta_url} arrow className="xl:whitespace-nowrap">
                  {data.cta_label}
                </Button>
              ) : null}
              {data.secondary_cta_label ? (
                <Button href={data.secondary_cta_url} variant="ghost" className="xl:whitespace-nowrap">
                  {data.secondary_cta_label}
                </Button>
              ) : null}
            </div>
          </div>

          <div id="consultation" className="scroll-mt-28 animate-rise [animation-delay:120ms]">
            <div className="rounded-[1.25rem] border border-white/20 bg-night/60 p-6 shadow-float backdrop-blur-md sm:p-8">
              {data.form_heading ? (
                <h2 className="mb-5 text-center text-[1.75rem] font-bold leading-tight text-white">
                  <Highlight text={data.form_heading} dark />
                </h2>
              ) : null}
              <ConsultationForm
                services={allServices}
                budgets={settings.forms?.budget_ranges}
                ctaLabel={data.form_cta}
                phone={settings.contact?.phone}
                idPrefix="hero"
                wizard
                dark
              />
            </div>
          </div>
        </div>

        <CategoryCards services={allServices} />
      </Container>
    </section>
  );
}
