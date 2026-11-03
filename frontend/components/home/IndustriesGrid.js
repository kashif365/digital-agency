import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/ui/AppLink';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Stagger from '@/components/ui/Stagger';

function Tile({ industry, detailed }) {
  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-forest">
        {industry.image ? (
          <Image src={industry.image.url} alt={industry.image.alt} fill sizes="(min-width: 1024px) 320px, 50vw" className="object-cover transition duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/10 to-transparent" aria-hidden="true" />
        <p className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3 font-display text-xl leading-snug text-ivory">
          {industry.name}
          {industry.has_page ? <ArrowRight className="mb-1 size-5 shrink-0 text-sage transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /> : null}
        </p>
      </div>
      {detailed ? <p className="mt-4 leading-relaxed text-muted">{industry.short_description}</p> : null}
    </>
  );

  return industry.has_page ? (
    <Link href={`/industries/${industry.slug}`} className="group block">
      {content}
    </Link>
  ) : (
    <div>{content}</div>
  );
}

export default function IndustriesGrid({ data, industries, page }) {
  if (industries.length === 0) {
    return null;
  }

  // The industries page explains each one; the homepage shows the photos and names.
  const detailed = page?.slug === 'industries';

  return (
    <section className={detailed ? 'py-16 md:py-24' : 'py-20 md:py-28'}>
      <Container>
        {data.heading ? (
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} className="lg:col-span-8" />
            {data.cta_label ? (
              <div className="lg:col-span-4 lg:text-right">
                <Button href={data.cta_url} variant="outline" arrow>
                  {data.cta_label}
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}
        <Stagger className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
          {industries.map((industry) => (
            <Tile key={industry.slug} industry={industry} detailed={detailed} />
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
