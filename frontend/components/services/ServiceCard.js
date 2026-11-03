import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/ui/AppLink';
import CoverArt, { artKind } from '@/components/ui/CoverArt';
import { cn } from '@/lib/utils';

function Photo({ service, sizes, className }) {
  return (
    <div className={cn('relative overflow-hidden rounded-[var(--radius-card)] bg-stone', className)}>
      {service.image ? (
        <Image src={service.image.url} alt={service.image.alt} fill sizes={sizes} className="object-cover transition duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]" />
      ) : (
        <CoverArt seed={service.slug} kind={artKind({ services: [service], category: service.category?.slug })} className="absolute inset-0 size-full" />
      )}
    </div>
  );
}

function More({ service }) {
  return (
    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.9375rem] font-semibold text-forest">
      Learn More
      <span className="sr-only">about {service.title}</span>
      <ArrowRight className="size-4 text-clay-deep transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </span>
  );
}

/**
 * Service with its photo. `layout="row"` sets a large image beside the text for featured
 * services; `layout="compact"` is a small thumbnail beside the text for longer lists.
 */
export default function ServiceCard({ service, layout = 'card', reverse = false, number }) {
  const href = `/services/${service.slug}`;

  if (layout === 'row') {
    return (
      <Link href={href} className="group grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
        <Photo service={service} sizes="(min-width: 768px) 620px, 100vw" className={cn('aspect-[4/3]', reverse && 'md:order-2')} />
        <div className="flex flex-col">
          {number ? <span className="font-display text-lg text-clay-deep">{number}</span> : null}
          <p className="mt-2 text-sm font-medium text-moss">{service.category?.name}</p>
          <h3 className="type-h2 mt-2 text-forest">{service.title}</h3>
          <p className="mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-muted">{service.short_description}</p>
          <More service={service} />
        </div>
      </Link>
    );
  }

  if (layout === 'compact') {
    return (
      <Link href={href} className="group flex h-full gap-5 rounded-[var(--radius-card)] border border-forest/10 bg-paper p-4 transition hover:border-forest/30">
        <Photo service={service} sizes="140px" className="aspect-square w-28 shrink-0 sm:w-32" />
        <div className="flex min-w-0 flex-col py-1">
          <h3 className="font-display text-xl leading-snug text-forest">{service.title}</h3>
          <p className="mt-1.5 line-clamp-3 text-[0.9375rem] leading-relaxed text-muted">{service.short_description}</p>
          <More service={service} />
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group flex h-full flex-col">
      <Photo service={service} sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw" className="aspect-[3/2]" />
      <h3 className="type-h3 mt-5 text-forest">{service.title}</h3>
      <p className="mt-2 leading-relaxed text-muted">{service.short_description}</p>
      <More service={service} />
    </Link>
  );
}
