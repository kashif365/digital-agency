import { ArrowRight } from 'lucide-react';
import Link from '@/components/ui/AppLink';
import { cn } from '@/lib/utils';

const VARIANTS = {
  primary: 'bg-brand text-white shadow-[0_14px_28px_-12px_rgb(0_136_84/0.65)] hover:bg-brand-dark',
  accent: 'bg-brand text-white shadow-[0_14px_28px_-12px_rgb(0_136_84/0.65)] hover:bg-brand-dark',
  dark: 'bg-dark text-white shadow-[0_14px_28px_-12px_rgb(6_11_26/0.6)] hover:bg-brand',
  white: 'bg-white text-heading hover:bg-brand-tint',
  outline: 'border border-line bg-white text-heading hover:border-brand hover:text-brand',
  ghost: 'border border-white/40 text-white hover:border-white hover:bg-white/10',
};

const BASE =
  'group inline-flex min-h-12 items-center justify-center gap-2 px-7 py-3 text-center font-display font-bold transition duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60';

const SHAPES = { pill: 'rounded-full', soft: 'rounded-xl' };

function Arrow() {
  return <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />;
}

export default function Button({ href, variant = 'primary', shape = 'pill', arrow = false, className, children, ...props }) {
  const classes = cn(BASE, SHAPES[shape], VARIANTS[variant], className);

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
