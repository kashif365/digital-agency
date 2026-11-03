import { ArrowRight } from 'lucide-react';
import Link from '@/components/ui/AppLink';
import { cn } from '@/lib/utils';

const VARIANTS = {
  primary: 'bg-forest text-ivory hover:bg-charcoal',
  outline: 'border border-forest/25 text-forest hover:border-forest hover:bg-forest hover:text-ivory',
  // For dark sections.
  light: 'bg-sage text-forest hover:bg-ivory',
  ghost: 'border border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory hover:text-forest',
};

const BASE =
  'group inline-flex min-h-12 items-center justify-center gap-3 rounded-[var(--radius-sm)] px-6 py-3 text-center text-[0.9375rem] font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-60';

function Arrow() {
  return <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />;
}

export default function Button({ href, variant = 'primary', arrow = false, className, children, ...props }) {
  const classes = cn(BASE, VARIANTS[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
        {arrow ? <Arrow /> : null}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}

/** Quiet text link with an arrow, for secondary actions beside a button. */
export function TextLink({ href, dark = false, className, children, ...props }) {
  return (
    <Link href={href} className={cn('group inline-flex items-center gap-2 font-semibold', dark ? 'text-ivory' : 'text-forest', className)} {...props}>
      <span className="link-underline pb-0.5">{children}</span>
      <ArrowRight className={cn('size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1', dark ? 'text-sage' : 'text-clay-deep')} aria-hidden="true" />
    </Link>
  );
}
