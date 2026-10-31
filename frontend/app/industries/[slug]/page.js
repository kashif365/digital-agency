import { notFound } from 'next/navigation';
import CtaBanner from '@/components/home/CtaBanner';
import { HeroShell } from '@/components/home/PageHero';
import ItemCards, { CheckList } from '@/components/services/ItemCards';
import ServiceCard from '@/components/services/ServiceCard';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Prose from '@/components/ui/Prose';
import SectionHeading from '@/components/ui/SectionHeading';
import { getIndustry, getSettings } from '@/lib/api';
import { buildMetadata } from '@/lib/seo';

// Renders each page on first visit, then serves it from the ISR cache.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [industry, settings] = await Promise.all([getIndustry(slug), getSettings()]);

  return industry ? buildMetadata({ seo: industry.seo, settings, path: `/industries/${slug}`, title: industry.name }) : {};
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industry = await getIndustry(slug);

  if (!industry) {
    notFound();
  }

  return (
    <>
      <HeroShell breadcrumbs={[{ label: 'Industries', href: '/industries' }, { label: industry.name }]}>
        <div className="mt-10 max-w-4xl">
          <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-brand-light ring-1 ring-white/15">
            <Icon name={industry.icon} className="size-6" />
          </span>
          <h1 className="mt-5 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-6xl">Digital Marketing for {industry.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{industry.short_description}</p>
          <Button href="/free-consultation" arrow className="mt-9">
            Get a free consultation
          </Button>
        </div>
      </HeroShell>

      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <Prose html={industry.overview} />
        </Container>
      </section>

      {industry.challenges.length > 0 ? (
        <section className="bg-surface py-20 md:py-28">
          <Container>
            <SectionHeading eyebrow="Common challenges" heading={`What ${industry.name} Marketers Face`} className="mb-12" />
            <ItemCards items={industry.challenges} />
          </Container>
        </section>
      ) : null}

      {industry.approach.length > 0 ? (
        <section className="py-20 md:py-28">
          <Container>
            <SectionHeading eyebrow="How we help" heading="Our approach" className="mb-12" />
            <CheckList items={industry.approach} />
          </Container>
        </section>
      ) : null}

      {industry.services.length > 0 ? (
        <section className="bg-surface py-20 md:py-28">
          <Container>
            <SectionHeading eyebrow="Recommended services" heading="Where we would start" className="mb-12" />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {industry.services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBanner
        data={{
          heading: `Let's talk about your *${industry.name}* marketing`,
          lead: 'Share your goals and we will follow up to discuss what could work for your business.',
          cta_label: 'Get a free consultation',
          cta_url: '/free-consultation',
        }}
      />
    </>
  );
}
