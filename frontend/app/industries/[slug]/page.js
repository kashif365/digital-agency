import Image from 'next/image';
import { notFound } from 'next/navigation';
import CtaBanner from '@/components/home/CtaBanner';
import { HeroShell } from '@/components/home/PageHero';
import { NumberedList, SideLabel } from '@/components/services/Ledger';
import ServiceCard from '@/components/services/ServiceCard';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Prose from '@/components/ui/Prose';
import Reveal from '@/components/ui/Reveal';
import SectionHeading, { Eyebrow } from '@/components/ui/SectionHeading';
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
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Eyebrow>Industries</Eyebrow>
            <h1 className="type-h1 mt-6 text-forest">Digital Marketing for {industry.name}</h1>
            <p className="type-lead mt-6 max-w-xl text-muted">{industry.short_description}</p>
            <Button href="/free-consultation" arrow className="mt-9">
              Get a Free Quote
            </Button>
          </div>
          {industry.image ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-stone lg:col-span-6">
              <Image src={industry.image.url} alt={industry.image.alt} fill preload sizes="(min-width: 1024px) 620px, 100vw" className="object-cover" />
            </div>
          ) : null}
        </div>
      </HeroShell>

      {industry.overview ? (
        <section className="py-24 md:py-32">
          <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <SideLabel>The landscape</SideLabel>
            <Reveal className="lg:col-span-8">
              <Prose html={industry.overview} className="prose-lead max-w-3xl" />
            </Reveal>
          </Container>
        </section>
      ) : null}

      {industry.challenges.length > 0 || industry.approach.length > 0 ? (
        <section className="bg-stone py-24 md:py-32">
          <Container>
            <SectionHeading eyebrow="Challenges and approach" heading={`Marketing Challenges in ${industry.name}`} className="mb-14" />
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-12">
              {industry.challenges.length > 0 ? <NumberedList title="Common challenges" items={industry.challenges} /> : null}
              {industry.approach.length > 0 ? <NumberedList title="How we would approach it" items={industry.approach} /> : null}
            </div>
          </Container>
        </section>
      ) : null}

      {industry.services.length > 0 ? (
        <section className="py-24 md:py-32">
          <Container>
            <SectionHeading eyebrow="Recommended services" heading="Where We Usually Start" className="mb-12" />
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {industry.services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBanner
        data={{
          heading: `Let's Talk About Your ${industry.name} Marketing`,
          lead: 'Share your goals and we will follow up to discuss what could work for your business.',
          cta_label: 'Get a free consultation',
          cta_url: '/free-consultation',
        }}
      />
    </>
  );
}
