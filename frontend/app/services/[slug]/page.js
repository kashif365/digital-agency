import { Check } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ConsultationPanel } from '@/components/home/ConsultationSection';
import { FaqBlock } from '@/components/home/FaqSection';
import { HeroShell } from '@/components/home/PageHero';
import { ProcessSteps } from '@/components/home/ProcessTimeline';
import ProjectCard from '@/components/portfolio/ProjectCard';
import ServiceCard from '@/components/services/ServiceCard';
import Link from '@/components/ui/AppLink';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import CoverArt, { artKind } from '@/components/ui/CoverArt';
import { BrowserFrame } from '@/components/ui/DeviceFrames';
import Highlight from '@/components/ui/Highlight';
import JsonLd from '@/components/ui/JsonLd';
import Prose from '@/components/ui/Prose';
import SectionHeading, { Eyebrow } from '@/components/ui/SectionHeading';
import Stagger from '@/components/ui/Stagger';
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

function CheckItem({ title, text }) {
  return (
    <li className="flex gap-3.5">
      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-forest text-sage">
        <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
      </span>
      <span>
        <span className="block font-semibold text-forest">{title}</span>
        {text ? <span className="mt-1 block leading-relaxed text-muted">{text}</span> : null}
      </span>
    </li>
  );
}

/**
 * Work examples, presented to suit the discipline: website services show the screens in a
 * browser, while search, social, and brand services show the deliverable itself.
 */
function Examples({ service }) {
  const screens = service.category?.slug === 'web-creative' && service.slug !== 'branding-graphic-design';
  const [first, ...rest] = service.portfolios;

  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <SectionHeading
            eyebrow="Examples"
            heading={screens ? 'Websites We Have Designed' : `${service.title} in Practice`}
            lead="Concept projects for fictional businesses, documented the way we handle client work."
            className="lg:col-span-8"
          />
          <div className="lg:col-span-4 lg:text-right">
            <Button href="/portfolio" variant="outline" arrow>
              View All Projects
            </Button>
          </div>
        </div>

        {screens && first?.image ? (
          <Link href={`/portfolio/${first.slug}`} className="group block">
            <BrowserFrame image={first.image} label={first.title} sizes="(min-width: 1360px) 1280px, 100vw" className="transition duration-500 group-hover:-translate-y-1" />
            <p className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-display text-2xl text-forest">{first.title}</span>
              <span className="text-sm text-muted">Concept project · View the full case study</span>
            </p>
          </Link>
        ) : first ? (
          <ProjectCard project={first} feature />
        ) : null}

        {rest.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
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
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Eyebrow>{service.category?.name ?? 'Service'}</Eyebrow>
            <h1 className="type-h1 mt-6 text-forest">{name}</h1>
            {service.hero_heading ? (
              <p className="mt-4 font-display text-2xl leading-snug text-forest">
                <Highlight text={service.hero_heading} />
              </p>
            ) : null}
            <p className="type-lead mt-5 max-w-xl text-muted">{service.hero_text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="#consultation" arrow>
                Get a Free Quote
              </Button>
              <Button href="/portfolio" variant="outline">
                View Our Work
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-stone">
              {service.image ? (
                <Image src={service.image.url} alt={service.image.alt} fill preload sizes="(min-width: 1024px) 620px, 100vw" className="object-cover" />
              ) : (
                <CoverArt seed={service.slug} kind={artKind({ services: [service], category: service.category?.slug })} className="absolute inset-0 size-full" />
              )}
            </div>
          </div>
        </div>
      </HeroShell>

      {service.overview || service.audience.length > 0 ? (
        <section className="py-20 md:py-28">
          <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading eyebrow="Overview" heading={`What ${name} Involves`} />
              <Prose html={service.overview} className="mt-6" />
            </div>
            {service.audience.length > 0 ? (
              <aside className="rounded-[var(--radius-card)] bg-stone p-7 md:p-9 lg:col-span-5 lg:self-start">
                <h2 className="type-h3 text-forest">Who It Is For</h2>
                <ul className="mt-6 space-y-5">
                  {service.audience.map((item) => (
                    <CheckItem key={item.title} title={item.title} text={item.text} />
                  ))}
                </ul>
              </aside>
            ) : null}
          </Container>
        </section>
      ) : null}

      {service.deliverables.length > 0 ? (
        <section className="bg-white py-20 md:py-28">
          <Container>
            <SectionHeading eyebrow="Deliverables" heading="What Is Included" className="mb-12" />
            <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {service.deliverables.map((item, index) => (
                <div key={item.title} className="flex h-full flex-col rounded-[var(--radius-card)] border border-forest/10 bg-ivory p-7">
                  <span className="font-display text-3xl text-clay-deep">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 font-display text-xl leading-snug text-forest">{item.title}</h3>
                  {item.text ? <p className="mt-2 leading-relaxed text-muted">{item.text}</p> : null}
                </div>
              ))}
            </Stagger>
          </Container>
        </section>
      ) : null}

      {service.portfolios.length > 0 ? <Examples service={service} /> : null}

      {service.problems.length > 0 || service.benefits.length > 0 ? (
        <section className="py-20 md:py-28">
          <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
            {service.problems.length > 0 ? (
              <div>
                <SectionHeading eyebrow="Common problems" heading="What We Help Fix" />
                <ul className="mt-8 space-y-6">
                  {service.problems.map((item) => (
                    <CheckItem key={item.title} title={item.title} text={item.text} />
                  ))}
                </ul>
              </div>
            ) : null}
            {service.benefits.length > 0 ? (
              <div>
                <SectionHeading eyebrow="Benefits" heading="What You Gain" />
                <ul className="mt-8 space-y-6">
                  {service.benefits.map((item) => (
                    <CheckItem key={item.title} title={item.title} text={item.text} />
                  ))}
                </ul>
              </div>
            ) : null}
          </Container>
        </section>
      ) : null}

      {service.process.length > 0 ? (
        <section className="bg-forest py-20 text-ivory md:py-28">
          <Container>
            <SectionHeading eyebrow="Process" heading={`How We Deliver ${name}`} dark className="mb-14" />
            <ProcessSteps items={service.process} dark />
          </Container>
        </section>
      ) : null}

      {service.faqs.length > 0 ? (
        <section className="bg-white py-20 md:py-28">
          <Container>
            <FaqBlock eyebrow="FAQ" heading={`${name} Questions`} items={service.faqs} />
          </Container>
        </section>
      ) : null}

      {service.related.length > 0 ? (
        <section className="py-20 md:py-28">
          <Container>
            <SectionHeading eyebrow="Related services" heading="Services That Work Well Together" className="mb-12" />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {service.related.map((related) => (
                <ServiceCard key={related.slug} service={related} layout="compact" />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <ConsultationPanel
        eyebrow="Get a Free Quote"
        heading={`Talk to Us About ${name}`}
        lead={`Tell us about your business and what you want ${name} to achieve. We will review your request and follow up with a clear recommendation.`}
        services={allServices}
        budgets={settings.forms?.budget_ranges}
        defaultServiceId={service.id}
        idPrefix="service"
      />
    </>
  );
}
