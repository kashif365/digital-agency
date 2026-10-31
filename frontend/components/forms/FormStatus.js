import { CircleAlert, CircleCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FormError({ message, dark = false }) {
  if (!message) {
    return null;
  }

  return (
    <p role="alert" className={cn('flex items-start gap-2 rounded-xl px-4 py-3 text-sm font-medium', dark ? 'bg-white text-danger' : 'bg-danger/8 text-danger')}>
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function FormSuccess({ message, dark = false }) {
  return (
    <div role="status" className={cn('rounded-2xl px-6 py-10 text-center', dark ? 'bg-white/10' : 'bg-brand-tint')}>
      <CircleCheck className={cn('mx-auto size-11', dark ? 'text-brand-light' : 'text-brand')} aria-hidden="true" />
      <p className={cn('mt-4 font-display text-xl font-bold', dark ? 'text-white' : 'text-heading')}>Request received</p>
      <p className={cn('mx-auto mt-2 max-w-sm leading-relaxed', dark ? 'text-white/85' : 'text-muted')}>{message}</p>
    </div>
  );
}
