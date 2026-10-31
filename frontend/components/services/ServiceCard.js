import { ArrowRight } from 'lucide-react';
import Link from '@/components/ui/AppLink';
import Icon from '@/components/ui/Icon';

export default function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-9 transition duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lift"
    >
      <span className="grid size-[3.75rem] place-items-center rounded-2xl bg-white text-brand shadow-[0_6px_18px_rgb(12_14_26/0.1)] transition duration-300 group-hover:bg-brand group-hover:text-white">
        <Icon name={service.icon} className="size-7" />
      </span>
      <h3 className="mt-6 text-2xl font-bold leading-tight text-heading">{service.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{service.short_description}</p>
      <span className="mt-6 grid size-10 place-items-center rounded-full bg-brand-tint text-brand transition group-hover:bg-brand group-hover:text-white">
        <span className="sr-only">Learn More about {service.title}</span>
        <ArrowRight className="size-5" aria-hidden="true" />
      </span>
    </Link>
  );
}
