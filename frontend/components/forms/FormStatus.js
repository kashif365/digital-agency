import { CircleAlert } from 'lucide-react';
import Rings from '@/components/ui/Rings';

export function FormError({ message }) {
  if (!message) {
    return null;
  }

  return (
    <p role="alert" className="flex items-start gap-2.5 rounded-[var(--radius-sm)] border border-danger/30 bg-danger/[0.06] px-4 py-3 text-sm font-medium text-danger">
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function FormSuccess({ message, title = 'Thank you. Your message is with us.' }) {
  return (
    <div role="status" className="relative isolate overflow-hidden py-10">
      <Rings seed={17} count={7} className="absolute -right-10 -top-10 -z-10 size-56 text-forest/15" />
      <p className="label flex items-center gap-3 text-moss">
        <span className="size-1.5 rounded-full bg-clay" aria-hidden="true" />
        Received
      </p>
      <p className="mt-4 max-w-md font-display text-3xl leading-tight text-forest">{title}</p>
      {message ? <p className="mt-4 max-w-md leading-relaxed text-muted">{message}</p> : null}
    </div>
  );
}
