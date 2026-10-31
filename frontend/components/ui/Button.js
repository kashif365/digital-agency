import { ArrowRight } from 'lucide-react';
import Link from '@/components/ui/AppLink';
import { cn } from '@/lib/utils';

const VARIANTS = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  dark: 'bg-heading text-white hover:bg-brand',
  white: 'bg-white text-heading hover:bg-brand-tint',
  outline: 'border border-line bg-white text-heading hover:border-brand hover:text-brand',
  ghost: 'border border-white/25 text-white hover:border-white/60 hover:bg-white/10',
};

const BASE =
  'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-center font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60';

function Arrow() {
  return <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />;
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
