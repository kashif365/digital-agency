'use client';

import { useState } from 'react';
import { cn, WORK_CATEGORIES, workCategories } from '@/lib/utils';
import ProjectCard from './ProjectCard';

/** Category buttons above an even grid. Only categories with at least one project are offered. */
export default function ProjectFilter({ projects }) {
  const [active, setActive] = useState('all');
  const tagged = projects.map((project) => ({ project, categories: workCategories(project) }));
  const options = WORK_CATEGORIES.filter((category) => tagged.some((item) => item.categories.includes(category.slug)));
  const visible = active === 'all' ? tagged : tagged.filter((item) => item.categories.includes(active));

  const button = (slug, label, count) => (
    <button
      key={slug}
      type="button"
      aria-pressed={active === slug}
      onClick={() => setActive(slug)}
      className={cn(
        'min-h-11 rounded-full border px-5 text-[0.9375rem] font-medium transition',
        active === slug ? 'border-forest bg-forest text-ivory' : 'border-forest/20 bg-paper text-forest hover:border-forest'
      )}
    >
      {label} <span className={active === slug ? 'text-ivory/60' : 'text-muted'}>{count}</span>
    </button>
  );

  return (
    <div>
      <div role="group" aria-label="Filter projects by service" className="mb-12 flex flex-wrap gap-2.5">
        {button('all', 'All Projects', projects.length)}
        {options.map((category) => button(category.slug, category.label, tagged.filter((item) => item.categories.includes(category.slug)).length))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
      </p>
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ project }) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
