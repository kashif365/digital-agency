import { ArrowUpRight } from 'lucide-react';
import ServiceCard from '@/components/services/ServiceCard';
import Link from '@/components/ui/AppLink';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn, groupByCategory } from '@/lib/utils';

function CategoryPanel({ category, index, dark }) {
  return (
    <div className={cn('flex flex-col rounded-[var(--radius-card)] p-7 md:p-9', dark ? 'bg-night text-white' : 'border border-line bg-white text-heading')}>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[1.75rem] font-medium leading-tight">{category.name}</h3>
        <span className={cn('font-display text-sm', dark ? 'text-white/60' : 'text-muted')}>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <ul className={cn('mt-6 divide-y', dark ? 'divide-white/10' : 'divide-line')}>
        {category.services.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className={cn('group flex items-center justify-between gap-4 py-3.5 font-medium transition', dark ? 'text-white/85 hover:text-white' : 'text-ink hover:text-brand')}
            >
              {service.title}
              <ArrowUpRight className={cn('size-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5', dark ? 'text-brand-light' : 'text-brand')} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AllServices({ categories }) {
  return (
    <div className="space-y-16 md:space-y-20">
      {categories.map((category) => (
        <div key={category.slug} id={category.slug} className="grid scroll-mt-8 gap-6 lg:grid-cols-[17rem_1fr] lg:gap-12">
          <h2 className="text-3xl font-medium leading-tight text-heading lg:sticky lg:top-28 lg:self-start">{category.name}</h2>
          <Reveal className="grid gap-5 md:grid-cols-2">
            {category.services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </Reveal>
        </div>
      ))}
    </div>
  );
}

export default function ServicesGrid({ data, allServices }) {
  const categories = groupByCategory(allServices);

  return (
    <section className="bg-surface py-20 md:py-28">
      <Container>
        {data.show_all ? (
          <AllServices categories={categories} />
        ) : (
          <>
            <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} />
              {data.cta_label ? (
                <Button href={data.cta_url} variant="outline" arrow className="shrink-0 self-start lg:self-auto">
                  {data.cta_label}
                </Button>
              ) : null}
            </div>
            <Reveal className="grid gap-5 md:grid-cols-2">
              {categories.map((category, index) => (
                <CategoryPanel key={category.slug} category={category} index={index} dark={index === 0 || index === 3} />
              ))}
            </Reveal>
          </>
        )}
      </Container>
    </section>
  );
}
