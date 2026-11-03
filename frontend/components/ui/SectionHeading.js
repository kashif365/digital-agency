import { cn } from '@/lib/utils';
import Highlight from './Highlight';

/** Small uppercase label. The clay seed dot is the one place the warm accent appears by default. */
export function Eyebrow({ dark = false, center = false, index, className, children }) {
  return (
    <p className={cn('label flex items-center gap-3', center && 'justify-center', dark ? 'text-ivory/70' : 'text-muted', className)}>
      {index ? (
        <span className={cn('font-display text-sm font-normal normal-case tracking-normal', dark ? 'text-sage' : 'text-clay-deep')}>{index}</span>
      ) : (
        <span className="size-1.5 shrink-0 rounded-full bg-clay" aria-hidden="true" />
      )}
      {children}
    </p>
  );
}

export function Heading({ text, as: Tag = 'h2', dark = false, className }) {
  return (
    <Tag className={cn('type-h2', dark ? 'text-ivory' : 'text-forest', className)}>
      <Highlight text={text} dark={dark} />
    </Tag>
  );
}

export default function SectionHeading({ eyebrow, index, heading, lead, dark = false, center = false, className }) {
  if (!eyebrow && !heading && !lead) {
    return null;
  }

  return (
    <div className={cn('max-w-3xl', center && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <Eyebrow dark={dark} center={center} index={index}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      {heading ? <Heading text={heading} dark={dark} className={eyebrow ? 'mt-5' : undefined} /> : null}
      {lead ? <p className={cn('type-lead mt-6 max-w-2xl', center && 'mx-auto', dark ? 'text-ivory/75' : 'text-muted')}>{lead}</p> : null}
    </div>
  );
}
