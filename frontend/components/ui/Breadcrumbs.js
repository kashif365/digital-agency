import { ChevronRight } from 'lucide-react';
import Link from '@/components/ui/AppLink';
import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from './JsonLd';

export default function Breadcrumbs({ items }) {
  const trail = [{ label: 'Home', href: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={breadcrumbSchema(trail)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
        {trail.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 ? <ChevronRight className="size-3.5 text-white/40" aria-hidden="true" /> : null}
            {item.href ? (
              <Link href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-white">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
