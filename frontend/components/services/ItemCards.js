import { Check } from 'lucide-react';
import Stagger from '@/components/ui/Stagger';

/** Simple titled cards used across the service and industry templates. */
export default function ItemCards({ items, columns = 3 }) {
  const grid = columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <Stagger className={`grid gap-5 ${grid}`}>
      {items.map((item) => (
        <div key={item.title} className="rounded-[var(--radius-card)] border border-line bg-white p-7">
          <h3 className="text-xl font-medium leading-snug text-heading">{item.title}</h3>
          {item.text ? <p className="mt-2.5 leading-relaxed text-muted">{item.text}</p> : null}
        </div>
      ))}
    </Stagger>
  );
}

export function CheckList({ items }) {
  return (
    <ul className="grid gap-x-10 gap-y-6 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.title} className="flex gap-3.5">
          <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand text-white">
            <Check className="size-4" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-lg font-medium text-heading">{item.title}</h3>
            {item.text ? <p className="mt-1 leading-relaxed text-muted">{item.text}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
