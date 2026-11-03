import { ArrowUpRight, Check, Info } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ConsultationPanel } from '@/components/home/ConsultationSection';
import { HeroShell } from '@/components/home/PageHero';
import ProjectCard, { ProjectVisual } from '@/components/portfolio/ProjectCard';
import Container from '@/components/ui/Container';
import { WorkImage } from '@/components/ui/DeviceFrames';
import Prose from '@/components/ui/Prose';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { getPortfolio, getProject, getServices, getSettings } from '@/lib/api';
import { buildMetadata } from '@/lib/seo';
import { cn, formatDate } from '@/lib/utils';

// Renders each page on first visit, then serves it from the ISR cache.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([getProject(slug), getSettings()]);

  return project ? buildMetadata({ seo: project.seo, settings, path: `/portfolio/${slug}`, title: project.title }) : {};
}

function Step({ number, title, className, children }) {
  return (
    <section className={cn('py-16 md:py-20', className)}>
      <Container>
        <Eyebrow index={number}>{title}</Eyebrow>
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}

/** Related work: projects sharing a service come first. */
function related(project, list) {
  const mine = new Set(project.services.map((service) => service.slug));
  const score = (item) => item.services.filter((service) => mine.has(service.slug)).length;

  return list
    .filter((item) => item.slug !== project.slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, 3);
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const [project, portfolio, services, settings] = await Promise.all([getProject(slug), getPortfolio(), getServices(), getSettings()]);

  if (!project) {
    notFound();
  }

  const facts = [
    ['Client', project.client_name],
    ['Industry', project.industry],
    ['Services', project.services.map((service) => service.title).join(', ')],
    ['Completed', project.completed_on ? formatDate(project.completed_on) : null],
    ['Type', project.is_illustrative ? 'Concept project for a fictional business' : null],
  ].filter(([, value]) => value);

  const gallery = project.gallery ?? [];
  const wide = gallery.filter((entry) => entry.kind !== 'mobile');
  const phones = gallery.filter((entry) => entry.kind === 'mobile');
  const others = related(project, portfolio?.data ?? []);

  return (
    <>
      <HeroShell breadcrumbs={[{ label: 'Our Work', href: '/portfolio' }, { label: project.title }]}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <Eyebrow index="01">{project.is_illustrative ? 'Concept project' : 'Case study'}</Eyebrow>
            <h1 className="type-h1 mt-6 text-forest">{project.title}</h1>
            {project.summary ? <p className="type-lead mt-6 max-w-2xl text-muted">{project.summary}</p> : null}
          </div>
          {project.website_url ? (
            <div className="lg:col-span-4 lg:text-right">
              <a href={project.website_url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-sm)] border border-forest/25 px-6 font-semibold text-forest transition hover:bg-forest hover:text-ivory">
                Visit the live website
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          ) : null}
        </div>
      </HeroShell>

      <section className="pt-12 md:pt-16">
        <Container>
          <ProjectVisual project={project} preload sizes="(min-width: 1360px) 1280px, 100vw" className="aspect-[16/10] md:aspect-[16/8]" />
          {facts.length > 0 ? (
            <dl className="mt-8 grid grid-cols-1 gap-6 rounded-[var(--radius-card)] bg-white p-6 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt className="label text-muted">{label}</dt>
                  <dd className="mt-2 text-forest">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {project.is_illustrative ? (
            <p className="mt-6 flex max-w-3xl items-start gap-3 text-[0.9375rem] leading-relaxed text-muted">
              <Info className="mt-0.5 size-4 shrink-0 text-clay-deep" aria-hidden="true" />
              This is a concept project for a fictional business. It shows how we plan, design, and document this kind of work. It is not a client project and makes no claims about results.
            </p>
          ) : null}
        </Container>
      </section>

      {project.overview || project.challenges || project.strategy ? (
        <section className="py-16 md:py-24">
          <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow index="02">The client&rsquo;s requirement</Eyebrow>
              <Prose html={project.overview} className="mt-6 [&>p:first-child]:text-lg [&>p:first-child]:text-forest" />
              <Prose html={project.challenges} className="mt-5" />
            </div>
            {project.strategy ? (
              <div>
                <Eyebrow index="03">Our approach</Eyebrow>
                <Prose html={project.strategy} className="mt-6" />
              </div>
            ) : null}
          </Container>
        </section>
      ) : null}

      {gallery.length > 0 ? (
        <Step number="04" title="The completed work" className="bg-stone">
          <div className={cn('grid grid-cols-1 items-start gap-10', phones.length > 0 && wide.length > 0 && 'lg:grid-cols-12')}>
            {wide.length > 0 ? (
              <div className={cn('space-y-10', phones.length > 0 && 'lg:col-span-9')}>
                {wide.map((entry) => (
                  <figure key={entry.image.url}>
                    <WorkImage entry={entry} sizes={phones.length ? '(min-width: 1024px) 940px, 100vw' : '(min-width: 1360px) 1280px, 100vw'} />
                    {entry.caption ? <figcaption className="mt-3 text-sm text-muted">{entry.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            ) : null}
            {phones.length > 0 ? (
              <div className={cn('flex flex-wrap justify-center gap-8', wide.length > 0 && 'lg:col-span-3 lg:sticky lg:top-28 lg:flex-col lg:items-center')}>
                {phones.map((entry) => (
                  <figure key={entry.image.url} className="w-full max-w-[18rem]">
                    <WorkImage entry={entry} />
                    {entry.caption ? <figcaption className="mt-3 text-center text-sm text-muted">{entry.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        </Step>
      ) : null}

      {project.deliverables?.length || project.outcomes ? (
        <Step number="05" title="Deliverables and outcome">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {project.deliverables?.length ? (
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
                {project.deliverables.map((item) => (
                  <li key={item.title} className="flex gap-3.5 rounded-[var(--radius-card)] bg-white p-5">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-forest text-sage">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-semibold text-forest">{item.title}</span>
                      {item.text ? <span className="mt-1 block text-[0.9375rem] leading-relaxed text-muted">{item.text}</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="lg:col-span-5">
              <h2 className="type-h3 text-forest">Outcome</h2>
              {project.outcomes ? (
                <Prose html={project.outcomes} className="mt-4" />
              ) : (
                <p className="mt-4 leading-relaxed text-muted">
                  {project.is_illustrative
                    ? 'As a concept, this project has no real-world results to report. For client work, we only publish outcomes the client has verified and approved.'
                    : 'Results for this project have not been published yet.'}
                </p>
              )}
            </div>
          </div>
        </Step>
      ) : null}

      {others.length > 0 ? (
        <Step number="06" title="Related projects" className="bg-white">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <ProjectCard key={item.slug} project={item} />
            ))}
          </div>
        </Step>
      ) : null}

      <ConsultationPanel
        eyebrow="07 · Start a project"
        heading="Planning Something Similar?"
        lead="Tell us about your business and what you need. We will review your request and follow up with a clear recommendation and quote."
        services={services}
        budgets={settings.forms?.budget_ranges}
        defaultServiceId={project.services[0] ? services.find((service) => service.slug === project.services[0].slug)?.id : undefined}
        idPrefix="project"
      />
    </>
  );
}
