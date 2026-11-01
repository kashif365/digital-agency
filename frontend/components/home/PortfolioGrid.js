import { Info } from 'lucide-react';
import ProjectCard from '@/components/portfolio/ProjectCard';
import ProjectGallery from '@/components/portfolio/ProjectGallery';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Stagger from '@/components/ui/Stagger';
import { cn } from '@/lib/utils';

function IllustrativeNote({ dark = false, className }) {
  return (
    <p className={cn('flex items-start gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-medium', dark ? 'bg-white/8 text-white/85' : 'bg-brand-tint text-heading', className)}>
      <Info className={cn('mt-0.5 size-4 shrink-0', dark ? 'text-brand-light' : 'text-brand-dark')} aria-hidden="true" />
      These are illustrative examples of our deliverables. They are not client projects and show no real results.
    </p>
  );
}

export default function PortfolioGrid({ data, portfolio, page }) {
  const projects = portfolio?.data ?? [];

  if (projects.length === 0) {
    return null;
  }

  // The dedicated portfolio page lists every project; everywhere else gets the gallery.
  if (page?.slug === 'portfolio') {
    return (
      <section className="bg-surface py-20 md:py-28">
        <Container>
          {portfolio.meta?.illustrative_only ? <IllustrativeNote className="mb-8" /> : null}
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </Stagger>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-night py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} dark center className="mb-10" />
        {portfolio.meta?.illustrative_only ? <IllustrativeNote dark className="mx-auto mb-10 w-fit" /> : null}

        <Reveal>
          <ProjectGallery projects={projects} />
        </Reveal>

        {data.cta_label ? (
          <div className="mt-10 text-center">
            <Button href={data.cta_url} variant="ghost" arrow>
              {data.cta_label}
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
