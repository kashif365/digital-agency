import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/ui/AppLink';
import CoverArt from '@/components/ui/CoverArt';

export function IllustrativeBadge({ className = '' }) {
  return (
    <span className={`inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-heading shadow-sm ${className}`}>
      Illustrative example
    </span>
  );
}

export default function ProjectCard({ project, index }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition duration-300 hover:border-brand/50 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image.url}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <CoverArt seed={project.slug} variant={index} icon={project.is_illustrative ? 'layers' : 'briefcase'} className="size-full" />
        )}
        {project.is_illustrative ? <IllustrativeBadge className="absolute right-3 top-3" /> : null}
      </div>
      <div className="flex flex-1 flex-col p-7">
        {project.client_name || project.industry ? (
          <p className="text-sm font-semibold text-brand">{[project.client_name, project.industry].filter(Boolean).join(' · ')}</p>
        ) : null}
        <h3 className="text-[1.375rem] font-medium leading-tight text-heading">{project.title}</h3>
        <p className="mt-2.5 flex-1 leading-relaxed text-muted">{project.summary}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand">
          View project
          <span className="sr-only">: {project.title}</span>
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
