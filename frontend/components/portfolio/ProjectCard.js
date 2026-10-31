import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/ui/AppLink';
import CoverArt from '@/components/ui/CoverArt';

export function IllustrativeBadge({ className = '' }) {
  return (
    <span className={`inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-heading shadow-sm ${className}`}>
      Illustrative example
    </span>
  );
}

export default function ProjectCard({ project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_6px_28px_rgb(12_14_26/0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image.url}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <CoverArt seed={project.slug} icon={project.is_illustrative ? 'layers' : 'briefcase'} className="size-full" />
        )}
        {project.is_illustrative ? <IllustrativeBadge className="absolute right-3 top-3" /> : null}
      </div>
      <div className="flex flex-1 flex-col p-7">
        {project.client_name || project.industry ? (
          <p className="text-sm font-semibold text-brand">{[project.client_name, project.industry].filter(Boolean).join(' · ')}</p>
        ) : null}
        <h3 className="mt-1 font-display text-xl font-medium leading-snug text-heading">{project.title}</h3>
        <p className="mt-2.5 flex-1 leading-relaxed text-muted">{project.summary}</p>
        {project.services.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.services.map((service) => (
              <li key={service.slug} className="rounded-full bg-brand-tint px-2.5 py-1 text-xs font-medium text-brand-dark">
                {service.title}
              </li>
            ))}
          </ul>
        ) : null}
        <span className="mt-5 flex items-center justify-end gap-1.5 border-t border-line pt-4 text-sm font-medium text-ink">
          View Project
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
