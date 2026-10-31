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
        <div className="mt-7 max-w-3xl">
          <span className="grid size-13 place-items-center rounded-2xl bg-white/10 text-brand-light ring-1 ring-white/15">
            <Icon name={industry.icon} className="size-6" />
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] text-white md:text-[3.25rem]">Digital Marketing for {industry.name}</h1>
          <p className="mt-5 text-lg leading-relaxed text-white/75">{industry.short_description}</p>
          <Button href="/free-consultation" variant="accent" arrow className="mt-8">
            Get a Free Consultation
          </Button>
        </div>
      </HeroShell>

      <section className="py-16 md:py-20">
        <Container className="max-w-3xl">
          <Prose html={industry.overview} />
        </Container>
      </section>

      {industry.challenges.length > 0 ? (
        <section className="bg-surface py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Common Challenges" heading={`What ${industry.name} Marketers Face`} className="mb-10" />
            <ItemCards items={industry.challenges} />
          </Container>
        </section>
      ) : null}

      {industry.approach.length > 0 ? (
        <section className="py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="How We Help" heading="Our Approach" className="mb-10" />
            <CheckList items={industry.approach} />
          </Container>
        </section>
      ) : null}

      {industry.services.length > 0 ? (
        <section className="bg-surface py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Recommended Services" heading="Where We Would Start" className="mb-10" />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {industry.services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBanner
        last
        data={{
          heading: `Let's Talk About Your ${industry.name} Marketing`,
          lead: 'Share your goals and we will follow up to discuss what could work for your business.',
          cta_label: "Let's Talk About Your Project",
          cta_url: '/free-consultation',
        }}
      />
    </>
  );
}
