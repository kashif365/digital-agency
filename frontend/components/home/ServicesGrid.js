import { ArrowUpRight } from 'lucide-react';
import ServiceCard from '@/components/services/ServiceCard';
import Link from '@/components/ui/AppLink';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import SectionHeading from '@/components/ui/SectionHeading';
import Slider from '@/components/ui/Slider';
import Stagger from '@/components/ui/Stagger';
import { cn, groupByCategory } from '@/lib/utils';

function ServiceSlide({ service, dark }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      draggable={false}
      className={cn(
        'group flex h-full min-h-[23rem] flex-col rounded-[var(--radius-card)] p-8 transition duration-300 hover:-translate-y-1.5 hover:shadow-lift',
        dark ? 'bg-night text-white' : 'border border-line bg-white text-heading'
      )}
    >
      <div className="flex items-start justify-between">
        <span className={cn('grid size-14 place-items-center rounded-2xl transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-110', dark ? 'bg-brand text-white' : 'bg-brand-tint text-brand-dark')}>
          <Icon name={service.icon} className="size-7" />
        </span>
        <ArrowUpRight className={cn('size-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1', dark ? 'text-brand-light' : 'text-brand')} aria-hidden="true" />
      </div>
      <p className={cn('mt-auto pt-10 text-sm font-medium', dark ? 'text-brand-light' : 'text-brand-dark')}>{service.category?.name}</p>
      <h3 className="mt-1.5 text-[1.625rem] font-medium leading-tight">{service.title}</h3>
      <p className={cn('mt-3 leading-relaxed', dark ? 'text-white/70' : 'text-muted')}>{service.short_description}</p>
    </Link>
  );
}

function AllServices({ categories }) {
  return (
    <div className="space-y-16 md:space-y-20">
      {categories.map((category) => (
        <div key={category.slug} id={category.slug} className="grid scroll-mt-8 gap-6 lg:grid-cols-[17rem_1fr] lg:gap-12">
          <h2 className="text-3xl font-medium leading-tight text-heading lg:sticky lg:top-28 lg:self-start">{category.name}</h2>
          <Stagger className="grid gap-5 md:grid-cols-2">
            {category.services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </Stagger>
        </div>
      ))}
    </div>
  );
}

export default function ServicesGrid({ data, allServices }) {
  const featured = allServices.filter((service) => service.is_featured);

  return (
    <section className="overflow-hidden bg-surface py-20 md:py-28">
      <Container>
        {data.show_all ? (
          <AllServices categories={groupByCategory(allServices)} />
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
            <Slider label="Our services" autoplay slideClassName="basis-[86%] sm:basis-1/2 lg:basis-1/3">
              {(featured.length ? featured : allServices).map((service, index) => (
                <ServiceSlide key={service.slug} service={service} dark={index % 2 === 0} />
              ))}
            </Slider>
          </>
        )}
      </Container>
    </section>
  );
}
