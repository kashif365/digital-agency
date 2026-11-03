import Link from '@/components/ui/AppLink';
import { breadcrumbSchema } from '@/lib/schema';
import { cn } from '@/lib/utils';
import JsonLd from './JsonLd';

export default function Breadcrumbs({ items, dark = false }) {
  const trail = [{ label: 'Home', href: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={breadcrumbSchema(trail)} />
      <ol className={cn('flex flex-wrap items-center gap-x-2 gap-y-1 text-sm', dark ? 'text-ivory/60' : 'text-muted')}>
        {trail.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden="true" className={dark ? 'text-ivory/30' : 'text-line'}>
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className={cn('transition', dark ? 'hover:text-ivory' : 'hover:text-forest')}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={cn('line-clamp-1', dark ? 'text-ivory' : 'text-forest')}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
