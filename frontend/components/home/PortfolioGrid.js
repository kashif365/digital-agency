import { Info } from 'lucide-react';
import { ProjectGrid } from '@/components/portfolio/ProjectCard';
import ProjectFilter from '@/components/portfolio/ProjectFilter';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

export function IllustrativeNote({ className }) {
  return (
    <p className={cn('flex max-w-2xl items-start gap-3 rounded-[var(--radius-card)] bg-stone px-5 py-4 text-[0.9375rem] leading-relaxed text-ink', className)}>
      <Info className="mt-0.5 size-4 shrink-0 text-clay-deep" aria-hidden="true" />
      These are concept projects for fictional businesses. They show the kind of work we produce and how we document it. They are not client projects and make no claims about results.
    </p>
  );
}

export default function PortfolioGrid({ data, portfolio, page }) {
  const projects = portfolio?.data ?? [];
  const illustrative = portfolio?.meta?.illustrative_only;

  if (projects.length === 0) {
    return null;
  }

  // The dedicated portfolio page lists every project with filters; elsewhere shows a selection.
  if (page?.slug === 'portfolio') {
    return (
      <section className="bg-white py-16 md:py-24">
        <Container>
          {illustrative ? <IllustrativeNote className="mb-12" /> : null}
          {projects.length >= 4 ? <ProjectFilter projects={projects} /> : <ProjectGrid projects={projects} />}
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} className="lg:col-span-8" />
          {data.cta_label ? (
            <div className="lg:col-span-4 lg:text-right">
              <Button href={data.cta_url} variant="outline" arrow>
                {data.cta_label}
              </Button>
            </div>
          ) : null}
        </div>

        <ProjectGrid projects={projects.slice(0, 6)} />

        {data.cta_label && projects.length > 6 ? (
          <div className="mt-14 text-center">
            <Button href={data.cta_url} arrow>
              {data.cta_label}
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
