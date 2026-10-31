import { Info } from 'lucide-react';
import ProjectCard from '@/components/portfolio/ProjectCard';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

export default function PortfolioGrid({ data, portfolio }) {
  const projects = portfolio?.data ?? [];

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="bg-surface-alt py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} center className="mb-10" />

        {portfolio.meta?.illustrative_only ? (
          <p className="mb-8 flex items-start gap-2.5 rounded-xl bg-brand-tint px-5 py-3.5 text-sm font-medium text-heading">
            <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
            These are illustrative examples of our deliverables. They are not client projects and show no real results.
          </p>
        ) : null}

        <Reveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Reveal>

        {data.cta_label ? (
          <div className="mt-11 text-center">
            <Button href={data.cta_url} variant="dark" arrow>
              {data.cta_label}
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
