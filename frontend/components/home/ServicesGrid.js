import ServiceCard from '@/components/services/ServiceCard';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import SectionHeading, { Eyebrow } from '@/components/ui/SectionHeading';
import { groupByCategory } from '@/lib/utils';

function Grid({ services }) {
  return (
    <Reveal className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </Reveal>
  );
}

export default function ServicesGrid({ data, featured, allServices }) {
  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} center className="mb-12" />

        {data.show_all ? (
          <div className="space-y-16">
            {groupByCategory(allServices).map((category) => (
              <div key={category.slug} id={category.slug} className="scroll-mt-28">
                <Eyebrow className="mb-6 text-xl">{category.name}</Eyebrow>
                <Grid services={category.services} />
              </div>
            ))}
          </div>
        ) : (
          <Grid services={featured} />
        )}

        {data.cta_label ? (
          <div className="mt-12 text-center">
            <Button href={data.cta_url} variant="dark" arrow>
              {data.cta_label}
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
