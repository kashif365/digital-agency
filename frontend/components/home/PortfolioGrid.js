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
    <section className="bg-surface py-20 md:py-28">
      <Container>
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} />
          {data.cta_label ? (
            <Button href={data.cta_url} variant="outline" arrow className="shrink-0 self-start lg:self-auto">
              {data.cta_label}
            </Button>
          ) : null}
        </div>

        {portfolio.meta?.illustrative_only ? (
          <p className="mb-8 flex items-start gap-2.5 rounded-2xl bg-brand-tint px-5 py-3.5 text-sm font-medium text-heading">
            <Info className="mt-0.5 size-4 shrink-0 text-brand-dark" aria-hidden="true" />
            These are illustrative examples of our deliverables. They are not client projects and show no real results.
          </p>
        ) : null}

        <Reveal className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
