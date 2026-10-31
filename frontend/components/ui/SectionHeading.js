import { cn } from '@/lib/utils';
import Highlight from './Highlight';

export function Eyebrow({ dark = false, center = false, className, children }) {
  return (
    <p
      className={cn(
        'flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.12em]',
        center && 'justify-center',
        dark ? 'text-brand-light' : 'text-brand-dark',
        className
      )}
    >
      <span className="h-px w-7 bg-current" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Heading({ text, dark = false, className }) {
  return (
    <h2 className={cn('text-[2.125rem] font-semibold leading-[1.08] md:text-5xl', dark ? 'text-white' : 'text-heading', className)}>
      <Highlight text={text} dark={dark} />
    </h2>
  );
}

export default function SectionHeading({ eyebrow, heading, lead, dark = false, center = false, className }) {
  if (!eyebrow && !heading && !lead) {
    return null;
  }

  return (
    <div className={cn('max-w-3xl', center && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <Eyebrow dark={dark} center={center}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      {heading ? <Heading text={heading} dark={dark} className="mt-4" /> : null}
      {lead ? <p className={cn('mt-5 text-lg leading-relaxed', dark ? 'text-white/70' : 'text-muted')}>{lead}</p> : null}
    </div>
  );
}
