import Image from 'next/image';
import { Info } from 'lucide-react';
import { notFound } from 'next/navigation';
import CtaBanner from '@/components/home/CtaBanner';
import { HeroShell } from '@/components/home/PageHero';
import { IllustrativeBadge } from '@/components/portfolio/ProjectCard';
import Container from '@/components/ui/Container';
import CoverArt from '@/components/ui/CoverArt';
import Prose from '@/components/ui/Prose';
import { getProject, getSettings } from '@/lib/api';
import { buildMetadata } from '@/lib/seo';

// Renders each page on first visit, then serves it from the ISR cache.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([getProject(slug), getSettings()]);

  return project ? buildMetadata({ seo: project.seo, settings, path: `/portfolio/${slug}`, title: project.title }) : {};
}

function Block({ title, html }) {
  if (!html) {
    return null;
  }

  return (
    <div>
      <h2 className="text-3xl font-medium text-heading">{title}</h2>
      <Prose html={html} className="mt-3" />
    </div>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const facts = [
    ['Client', project.client_name],
    ['Industry', project.industry],
    ['Services', project.services.map((service) => service.title).join(', ')],
  ].filter(([, value]) => value);

  return (
    <>
      <HeroShell breadcrumbs={[{ label: 'Our Work', href: '/portfolio' }, { label: project.title }]} image={project.image}>
        <div className="mt-10 max-w-4xl">
          {project.is_illustrative ? <IllustrativeBadge className="mb-4" /> : null}
          <h1 className="text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-6xl">{project.title}</h1>
          {project.summary ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{project.summary}</p> : null}
        </div>
      </HeroShell>

      <section className="py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-20">
          <div className="space-y-10">
            {project.is_illustrative ? (
              <p className="flex items-start gap-2.5 rounded-2xl bg-brand-tint px-5 py-3.5 text-sm font-medium text-heading">
                <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                This is an illustrative example of our deliverables. It is not a client project and shows no real results.
              </p>
            ) : null}
            <Block title="Overview" html={project.overview} />
            <Block title="Challenges" html={project.challenges} />
            <Block title="Strategy" html={project.strategy} />
            <Block title="Outcomes" html={project.outcomes} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[5/3] overflow-hidden rounded-[var(--radius-card)]">
              {project.image ? (
                <Image src={project.image.url} alt={project.image.alt} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
              ) : (
                <CoverArt seed={project.slug} icon="layers" className="size-full" />
              )}
            </div>
            {facts.length > 0 ? (
              <dl className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
                {facts.map(([label, value]) => (
                  <div key={label} className="[&+&]:mt-4">
                    <dt className="text-sm text-muted">{label}</dt>
                    <dd className="font-semibold text-heading">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </aside>
        </Container>
      </section>

      <CtaBanner
        data={{
          heading: 'Have a project *in mind*?',
          lead: 'Tell us what you are working on and we will follow up to discuss how we can help.',
          cta_label: 'Get a free consultation',
          cta_url: '/free-consultation',
        }}
      />
    </>
  );
}
