import { Eyebrow } from '@/components/ui/SectionHeading';

/** Left-rail label that stays in view beside long content. */
export function SideLabel({ children }) {
  return (
    <div className="lg:col-span-4">
      <Eyebrow className="lg:sticky lg:top-32">{children}</Eyebrow>
    </div>
  );
}

/** A titled, numbered list of title and text pairs, set as ruled rows. */
export function NumberedList({ title, items }) {
  return (
    <div>
      {title ? <h3 className="label border-b border-forest pb-4 text-forest">{title}</h3> : null}
      <ol>
        {items.map((item, index) => (
          <li key={item.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] border-b border-forest/15 py-6">
            <span className="pt-1 font-display text-sm text-clay-deep">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <p className="font-display text-xl leading-snug text-forest">{item.title}</p>
              {item.text ? <p className="mt-1.5 leading-relaxed text-muted">{item.text}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
