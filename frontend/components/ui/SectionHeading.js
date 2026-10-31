import { cn } from '@/lib/utils';
import Highlight from './Highlight';

function Diamond({ className }) {
  return (
    <svg viewBox="0 0 32 18" className={cn('h-4 w-7 shrink-0', className)} fill="none" strokeWidth="2" aria-hidden="true">
      <path d="M9.5 1.5 17 9l-7.5 7.5L2 9z" stroke="var(--color-brand)" />
      <path d="M21.5 1.5 29 9l-7.5 7.5L14 9z" stroke="currentColor" />
    </svg>
  );
}

export function Eyebrow({ dark = false, center = false, className, children }) {
  return (
    <p
      className={cn(
        'flex items-center gap-2.5 font-display text-[0.9375rem] font-medium uppercase tracking-[0.04em]',
        center && 'justify-center',
        dark ? 'text-white' : 'text-heading',
        className
      )}
    >
      <Diamond />
      {children}
    </p>
  );
}

export function PillBadge({ children }) {
  return (
    <p className="inline-flex rounded-full bg-brand-tint px-5 py-2 font-display text-[0.8125rem] font-extrabold uppercase tracking-[0.12em] text-brand-dark">
      {children}
    </p>
  );
}

export function GreenRule({ center = false }) {
  return <span className={cn('mt-6 block h-[5px] w-20 rounded-full bg-brand', center && 'mx-auto')} aria-hidden="true" />;
}

export default function SectionHeading({ eyebrow, heading, lead, dark = false, center = false, rule = false, className }) {
  if (!eyebrow && !heading && !lead) {
    return null;
  }

  return (
    <div className={cn('max-w-3xl', center && 'mx-auto text-center', className)}>
      {eyebrow ? <Eyebrow dark={dark} center={center}>{eyebrow}</Eyebrow> : null}
      {heading ? (
        <h2 className={cn('mt-3 text-3xl font-bold leading-[1.16] md:text-[2.75rem]', dark ? 'text-white' : 'text-heading')}>
          <Highlight text={heading} dark={dark} />
        </h2>
      ) : null}
      {rule ? <GreenRule center={center} /> : null}
      {lead ? <p className={cn('mt-4 text-[1.0625rem] leading-relaxed', dark ? 'text-white/75' : 'text-muted')}>{lead}</p> : null}
    </div>
  );
}
