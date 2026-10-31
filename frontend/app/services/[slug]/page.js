import { notFound } from 'next/navigation';
import ConsultationForm from '@/components/forms/ConsultationForm';
import CtaBanner from '@/components/home/CtaBanner';
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
import SectionHeading from '@/components/ui/SectionHeading';
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
        <div className="mt-7 max-w-3xl">
          <span className="grid size-13 place-items-center rounded-2xl bg-white/10 text-brand-light ring-1 ring-white/15">
            <Icon name={service.icon} className="size-6" />
          </span>
          <p className="mt-5 font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-light">{name}</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] text-white md:text-[3.25rem]">{service.hero_heading}</h1>
          <p className="mt-5 text-lg leading-relaxed text-white/75">{service.hero_text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#consultation" variant="accent" arrow>
              Get a Free Consultation
            </Button>
            <Button href="/services" variant="ghost">
              All Services
            </Button>
          </div>
        </div>
      </HeroShell>

      <section className="py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-14">
          <SectionHeading eyebrow="Overview" heading={`What ${name} Involves`} />
          <Prose html={service.overview} />
        </Container>
      </section>

      {service.audience.length > 0 ? (
        <section className="bg-surface py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Who It Helps" heading="Is This the Right Service for You?" className="mb-10" />
            <ItemCards items={service.audience} />
          </Container>
        </section>
      ) : null}

      {service.problems.length > 0 ? (
        <section className="py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Problems We Address" heading="Challenges This Service Solves" className="mb-10" />
            <ItemCards items={service.problems} />
          </Container>
        </section>
      ) : null}

      {service.deliverables.length > 0 ? (
        <section className="bg-surface py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Key Deliverables" heading="What You Receive" className="mb-10" />
            <ItemCards items={service.deliverables} columns={4} />
          </Container>
        </section>
      ) : null}

      {service.process.length > 0 ? (
        <section className="py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Our Process" heading="How It Works" className="mb-12" />
            <ProcessSteps items={service.process} />
          </Container>
        </section>
      ) : null}

      {service.benefits.length > 0 ? (
        <section className="bg-surface py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Business Benefits" heading={`Why Invest in ${name}`} className="mb-10" />
            <CheckList items={service.benefits} />
          </Container>
        </section>
      ) : null}

      {service.related.length > 0 ? (
        <section className="py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Related Services" heading="Services That Work Well Together" className="mb-10" />
            <Reveal className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {service.related.map((related) => (
                <ServiceCard key={related.slug} service={related} />
              ))}
            </Reveal>
          </Container>
        </section>
      ) : null}

      {service.portfolios.length > 0 ? (
        <section className="bg-surface py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Relevant Work" heading="Related Projects" className="mb-10" />
            <Reveal className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {service.portfolios.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </Reveal>
          </Container>
        </section>
      ) : null}

      {service.faqs.length > 0 ? (
        <section className="py-16 md:py-20">
          <Container>
            <FaqBlock heading={`*${name}* Questions`} items={service.faqs} />
          </Container>
        </section>
      ) : null}

      <section className="bg-dark py-16 md:py-20">
        <Container className="grid items-start gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          <SectionHeading
            dark
            eyebrow="Free Consultation"
            heading="Let's Build Your Next Growth Strategy"
            lead={`Tell us about your business and what you want ${name.toLowerCase()} to achieve. We will review your request and follow up to talk through the options.`}
          />
          <div id="consultation" className="scroll-mt-28 rounded-3xl bg-white p-5 shadow-float sm:p-8">
            <ConsultationForm services={allServices} budgets={settings.forms?.budget_ranges} defaultServiceId={service.id} idPrefix="service" />
          </div>
        </Container>
      </section>

      <CtaBanner
        last
        data={{
          heading: `Ready to Talk About ${name}?`,
          lead: 'Tell us where your business is today and where you want it to go.',
          cta_label: "Let's Talk About Your Project",
          cta_url: '/free-consultation',
        }}
      />
    </>
  );
}
