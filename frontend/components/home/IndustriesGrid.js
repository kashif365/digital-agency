import { ArrowUpRight } from 'lucide-react';
import Link from '@/components/ui/AppLink';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

function Cell({ industry }) {
  const content = (
    <>
      <span className="flex items-center justify-between">
        <span className="grid size-12 place-items-center rounded-2xl bg-brand-tint text-brand-dark transition duration-300 group-hover:bg-brand group-hover:text-white">
          <Icon name={industry.icon} className="size-5" />
        </span>
        {industry.has_page ? <ArrowUpRight className="size-5 text-muted transition group-hover:text-brand" aria-hidden="true" /> : null}
      </span>
      <span className="mt-6 block font-display text-xl font-medium leading-snug tracking-[-0.022em] text-heading">{industry.name}</span>
      <span className="mt-2 block text-[0.9375rem] leading-relaxed text-muted">{industry.short_description}</span>
    </>
  );

  return industry.has_page ? (
    <Link href={`/industries/${industry.slug}`} className="group block h-full bg-white p-7 transition hover:bg-surface">
      {content}
    </Link>
  ) : (
    <div className="group h-full bg-white p-7">{content}</div>
  );
}

export default function IndustriesGrid({ data, industries }) {
  if (industries.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} className="mb-12" />
        <Reveal>
          <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Cell industry={industry} />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
