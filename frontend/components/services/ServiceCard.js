import { ArrowRight } from 'lucide-react';
import Link from '@/components/ui/AppLink';
import Icon from '@/components/ui/Icon';

export default function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-7 transition duration-300 hover:border-brand/50 hover:shadow-lift"
    >
      <span className="grid size-12 place-items-center rounded-2xl bg-brand-tint text-brand-dark transition duration-300 group-hover:bg-brand group-hover:text-white">
        <Icon name={service.icon} className="size-5" />
      </span>
      <h3 className="mt-6 text-[1.375rem] font-medium leading-tight text-heading">{service.title}</h3>
      <p className="mt-2.5 flex-1 leading-relaxed text-muted">{service.short_description}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand">
        Learn more
        <span className="sr-only"> about {service.title}</span>
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
