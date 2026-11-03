import ServiceCard from '@/components/services/ServiceCard';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Stagger from '@/components/ui/Stagger';
import { groupByCategory } from '@/lib/utils';

const pad = (number) => String(number).padStart(2, '0');

/** The services page: one chapter per category, each with its services as photo cards. */
function AllServices({ categories }) {
  return (
    <div className="space-y-20 md:space-y-28">
      {categories.map((category, index) => (
        <section key={category.slug} id={category.slug} aria-labelledby={`${category.slug}-title`} className="scroll-mt-28">
          <div className="mb-10 flex items-baseline gap-4 border-b border-forest pb-5">
            <span className="font-display text-lg text-clay-deep">{pad(index + 1)}</span>
            <h2 id={`${category.slug}-title`} className="type-h2 text-forest">
              {category.name}
            </h2>
            <span className="ml-auto hidden text-sm text-muted sm:block">
              {category.services.length} {category.services.length === 1 ? 'service' : 'services'}
            </span>
          </div>
          <Stagger className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {category.services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </Stagger>
        </section>
      ))}
    </div>
  );
}

export default function ServicesGrid({ data, allServices }) {
  const featured = allServices.filter((service) => service.is_featured);
  const list = featured.length ? featured : allServices;
  const lead = list.slice(0, 3);
  const others = list.slice(3);

  if (data.show_all) {
    return (
      <section className="py-16 md:py-24">
        <Container>
          <AllServices categories={groupByCategory(allServices)} />
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} className="lg:col-span-8" />
          {data.cta_label ? (
            <div className="lg:col-span-4 lg:text-right">
              <Button href={data.cta_url} variant="outline" arrow>
                {data.cta_label}
              </Button>
            </div>
          ) : null}
        </div>

        <div className="space-y-16 md:space-y-20">
          {lead.map((service, index) => (
            <ServiceCard key={service.slug} service={service} layout="row" reverse={index % 2 === 1} number={pad(index + 1)} />
          ))}
        </div>

        {others.length ? (
          <Stagger className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.map((service) => (
              <ServiceCard key={service.slug} service={service} layout="compact" />
            ))}
          </Stagger>
        ) : null}
      </Container>
    </section>
  );
}
