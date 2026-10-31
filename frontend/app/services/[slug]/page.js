import { notFound } from 'next/navigation';
import { ConsultationPanel } from '@/components/home/ConsultationSection';
import { FaqBlock } from '@/components/home/FaqSection';
import { HeroShell } from '@/components/home/PageHero';
import { ProcessSteps } from '@/components/home/ProcessTimeline';
import ProjectCard from '@/components/portfolio/ProjectCard';
import ItemCards, { CheckList } from '@/components/services/ItemCards';
import ServiceCard from '@/components/services/ServiceCard';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import JsonLd from '@/components/ui/JsonLd';
import Prose from '@/components/ui/Prose';
import Reveal from '@/components/ui/Reveal';
import SectionHeading, { Eyebrow } from '@/components/ui/SectionHeading';
import { getService, getServices, getSettings } from '@/lib/api';
import { serviceSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

// Renders each page on first visit, then serves it from the ISR cache.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getService(slug), getSettings()]);

  return service ? buildMetadata({ seo: service.seo, settings, path: `/services/${slug}`, title: service.title }) : {};
}

function RowList({ eyebrow, heading, items }) {
  return (
    <div>
      <SectionHeading eyebrow={eyebrow} heading={heading} />
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <li key={item.title} className="py-5">
            <h3 className="text-xl font-medium leading-snug text-heading">{item.title}</h3>
            {item.text ? <p className="mt-1.5 leading-relaxed text-muted">{item.text}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const [service, settings, allServices] = await Promise.all([getService(slug), getSettings(), getServices()]);

  if (!service) {
    notFound();
  }

  const name = service.title;

  return (
    <>
      <JsonLd data={serviceSchema(service)} />

      <HeroShell breadcrumbs={[{ label: 'Services', href: '/services' }, { label: name }]}>
        <div className="mt-10 max-w-4xl">
          <Eyebrow dark className="[&>span]:hidden">
            <Icon name={service.icon} className="size-5" />
            {name}
          </Eyebrow>
          <h1 className="mt-5 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-6xl">{service.hero_heading}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{service.hero_text}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#consultation" arrow>
              Get a free consultation
            </Button>
            <Button href="/services" variant="ghost">
              All services
            </Button>
          </div>
        </div>
      </HeroShell>

      <section className="py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow="Overview" heading={`What ${name} involves`} />
          <Prose html={service.overview} />
        </Container>
      </section>

      {service.audience.length > 0 || service.problems.length > 0 ? (
        <section className="bg-surface py-20 md:py-28">
          <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            {service.audience.length > 0 ? <RowList eyebrow="Who it helps" heading="Is this right for you?" items={service.audience} /> : null}
            {service.problems.length > 0 ? <RowList eyebrow="What it solves" heading="The problems we fix" items={service.problems} /> : null}
          </Container>
        </section>
      ) : null}

      {service.deliverables.length > 0 ? (
        <section className="py-20 md:py-28">
          <Container>
            <SectionHeading eyebrow="Deliverables" heading="What you receive" className="mb-12" />
            <ItemCards items={service.deliverables} columns={4} />
          </Container>
        </section>
      ) : null}

      {service.process.length > 0 ? (
        <section className="bg-night py-20 md:py-28">
          <Container>
            <SectionHeading eyebrow="Process" heading="How it works" dark className="mb-14" />
            <ProcessSteps items={service.process} dark />
          </Container>
        </section>
      ) : null}

      {service.benefits.length > 0 ? (
        <section className="py-20 md:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading eyebrow="Benefits" heading={`Why invest in ${name}`} />
            <CheckList items={service.benefits} />
          </Container>
        </section>
      ) : null}

      {service.portfolios.length > 0 ? (
        <section className="bg-surface py-20 md:py-28">
          <Container>
            <SectionHeading eyebrow="Relevant work" heading="See how we plan it" className="mb-12" />
            <Reveal className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {service.portfolios.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </Reveal>
          </Container>
        </section>
      ) : null}

      {service.faqs.length > 0 ? (
        <section className="py-20 md:py-28">
          <Container>
            <FaqBlock eyebrow="FAQ" heading={`*${name}* questions`} items={service.faqs} />
          </Container>
        </section>
      ) : null}

      {service.related.length > 0 ? (
        <section className="bg-surface py-20 md:py-28">
          <Container>
            <SectionHeading eyebrow="Related services" heading="Services that work well together" className="mb-12" />
            <Reveal className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {service.related.map((related) => (
                <ServiceCard key={related.slug} service={related} />
              ))}
            </Reveal>
          </Container>
        </section>
      ) : null}

      <ConsultationPanel
        eyebrow="Free consultation"
        heading="Find out what is *holding your growth back*"
        lead={`Tell us about your business and what you want ${name.toLowerCase()} to achieve. We will review your request and follow up to talk through the options.`}
        services={allServices}
        budgets={settings.forms?.budget_ranges}
        defaultServiceId={service.id}
        idPrefix="service"
      />
    </>
  );
}
