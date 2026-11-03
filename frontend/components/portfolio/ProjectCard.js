import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/ui/AppLink';
import CoverArt, { artKind } from '@/components/ui/CoverArt';
import { cn, WORK_CATEGORIES, workCategories } from '@/lib/utils';

export function IllustrativeBadge({ className = '' }) {
  return <span className={cn('label inline-flex rounded-[var(--radius-sm)] bg-ivory/95 px-2.5 py-1.5 text-forest shadow-sm', className)}>Concept</span>;
}

export function ProjectVisual({ project, sizes, className, preload = false }) {
  return (
    <div className={cn('relative overflow-hidden rounded-[var(--radius-card)] border border-forest/10 bg-stone', className)}>
      {project.image ? (
        <Image
          src={project.image.url}
          alt={project.image.alt}
          fill
          preload={preload}
          sizes={sizes}
          className="object-cover object-top transition duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
        />
      ) : (
        <CoverArt seed={project.slug} kind={artKind(project)} className="absolute inset-0 size-full" />
      )}
      {project.is_illustrative ? <IllustrativeBadge className="absolute left-4 top-4" /> : null}
    </div>
  );
}

function Meta({ project }) {
  const discipline = WORK_CATEGORIES.find((category) => category.slug === workCategories(project)[0])?.label;
  const parts = [project.client_name, discipline ?? project.services[0]?.title, project.industry].filter(Boolean);

  return parts.length ? <p className="text-sm font-medium text-moss">{parts.join(' · ')}</p> : null;
}

/** Large preview with the project's details beneath. `feature` sets the image beside the text instead. */
export default function ProjectCard({ project, feature = false, className }) {
  if (feature) {
    return (
      <Link href={`/portfolio/${project.slug}`} className={cn('group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12', className)}>
        <ProjectVisual project={project} sizes="(min-width: 1024px) 780px, 100vw" className="aspect-[16/10] lg:col-span-8" />
        <div className="lg:col-span-4">
          <Meta project={project} />
          <h3 className="type-h2 mt-3 text-forest">{project.title}</h3>
          <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>
          <ServiceTags project={project} />
          <span className="mt-7 inline-flex items-center gap-2 font-semibold text-forest">
            View Project
            <span className="sr-only">: {project.title}</span>
            <ArrowRight className="size-4 text-clay-deep transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/portfolio/${project.slug}`} className={cn('group flex flex-col', className)}>
      <ProjectVisual project={project} sizes="(min-width: 1024px) 620px, (min-width: 768px) 50vw, 100vw" className="aspect-[16/10]" />
      <div className="mt-5">
        <Meta project={project} />
        <h3 className="type-h3 mt-2 text-forest">
          <span className="link-underline">{project.title}</span>
        </h3>
        <p className="mt-2.5 line-clamp-2 leading-relaxed text-muted">{project.summary}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-forest">
          View Project
          <span className="sr-only">: {project.title}</span>
          <ArrowRight className="size-4 text-clay-deep transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function ServiceTags({ project, className }) {
  if (!project.services.length) {
    return null;
  }

  return (
    <ul className={cn('mt-5 flex flex-wrap gap-2', className)}>
      {project.services.map((service) => (
        <li key={service.slug} className="rounded-full border border-forest/15 px-3 py-1 text-xs font-medium text-forest">
          {service.title}
        </li>
      ))}
    </ul>
  );
}

/** One featured project, then two side by side, then the rest three to a row. */
export function ProjectGrid({ projects }) {
  const [first, ...rest] = projects;
  const pair = rest.slice(0, 2);
  const others = rest.slice(2);

  return (
    <div className="space-y-16 md:space-y-20">
      {first ? <ProjectCard project={first} feature /> : null}
      {pair.length ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {pair.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : null}
      {others.length ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {others.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
