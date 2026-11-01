'use client';

import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Link from '@/components/ui/AppLink';
import CoverArt from '@/components/ui/CoverArt';
import { cn } from '@/lib/utils';
import { IllustrativeBadge } from './ProjectCard';

function Photo({ project, index, sizes }) {
  if (project.image) {
    return <Image src={project.image.url} alt={project.image.alt} fill sizes={sizes} className="object-cover" />;
  }

  return <CoverArt seed={project.slug} variant={index} icon="layers" className="absolute inset-0 size-full" />;
}

function ProjectLink({ project }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group/link inline-flex w-fit items-center gap-1.5 font-semibold text-brand-light transition hover:text-white">
      View project
      <span className="sr-only">: {project.title}</span>
      <ArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

function Panel({ project, index, open, onOpen }) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <article
      onPointerEnter={(event) => event.pointerType === 'mouse' && onOpen()}
      className={cn('relative min-w-0 overflow-hidden rounded-2xl transition-all duration-500', open ? 'flex-[5]' : 'flex-1')}
    >
      <Photo project={project} index={index} sizes="(min-width: 768px) 640px, 1px" />
      <span className={cn('absolute inset-0 transition-colors duration-500', open ? 'bg-night/40' : 'bg-night/80')} aria-hidden="true" />
      {open ? <span className="absolute inset-0 animate-rise bg-gradient-to-r from-night via-night/85 to-transparent" aria-hidden="true" /> : null}
      <span className="absolute left-1/2 top-6 -translate-x-1/2 font-display text-3xl font-bold tracking-widest text-white/70" aria-hidden="true">
        {number}
      </span>

      {open ? (
        <div className="relative z-10 flex h-full animate-rise flex-col justify-center gap-4 p-8 lg:p-12">
          {project.is_illustrative ? <IllustrativeBadge className="absolute right-4 top-4" /> : null}
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Project {number}</p>
          <h3 className="text-2xl font-bold leading-tight text-brand-light lg:text-4xl">{project.title}</h3>
          <p className="max-w-lg leading-relaxed text-white">{project.summary}</p>
          {project.services.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {project.services.map((service) => (
                <li key={service.slug} className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                  {service.title}
                </li>
              ))}
            </ul>
          ) : null}
          <ProjectLink project={project} />
        </div>
      ) : (
        <button type="button" onClick={onOpen} aria-label={`Show ${project.title}`} className="absolute inset-0 z-10 flex items-center justify-center px-2 pb-6 pt-20 text-white">
          <span className="max-h-full rotate-180 text-center font-display text-base font-bold leading-tight [writing-mode:vertical-rl] lg:text-[1.375rem]">{project.title}</span>
        </button>
      )}
    </article>
  );
}

function AccordionItem({ project, index, open, onOpen }) {
  const panelId = `project-panel-${index}`;

  return (
    <li className={cn('overflow-hidden rounded-2xl border transition-colors duration-300', open ? 'border-brand-light/60 bg-white/[0.06]' : 'border-white/12 bg-white/[0.04]')}>
      <h3>
        <button
          type="button"
          onClick={onOpen}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-display text-lg font-semibold leading-snug text-white"
        >
          {index + 1}. {project.title}
          <ChevronDown className={cn('size-5 shrink-0 text-brand-light transition-transform duration-300', open && 'rotate-180')} aria-hidden="true" />
        </button>
      </h3>

      {open ? (
        <div id={panelId} className="animate-rise px-5 pb-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
            <Photo project={project} index={index} sizes="100vw" />
            {project.is_illustrative ? <IllustrativeBadge className="absolute right-3 top-3" /> : null}
          </div>
          <p className="mt-4 leading-relaxed text-white/80">{project.summary}</p>
          <div className="mt-4">
            <ProjectLink project={project} />
          </div>
        </div>
      ) : null}
    </li>
  );
}

/** Tall panels that open on hover or tap, becoming a numbered accordion on small screens. */
export default function ProjectGallery({ projects }) {
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="hidden h-[560px] gap-2 md:flex">
        {projects.map((project, index) => (
          <Panel key={project.slug} project={project} index={index} open={index === active} onOpen={() => setActive(index)} />
        ))}
      </div>

      <ul className="space-y-3 md:hidden">
        {projects.map((project, index) => (
          <AccordionItem key={project.slug} project={project} index={index} open={index === active} onOpen={() => setActive(index === active ? -1 : index)} />
        ))}
      </ul>
    </>
  );
}
