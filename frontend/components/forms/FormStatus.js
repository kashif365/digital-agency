import { CircleAlert, CircleCheck } from 'lucide-react';

export function FormError({ message }) {
  if (!message) {
    return null;
  }

  return (
    <p role="alert" className="flex items-start gap-2 rounded-xl bg-danger/8 px-4 py-3 text-sm font-medium text-danger">
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function FormSuccess({ message }) {
  return (
    <div role="status" className="rounded-2xl bg-brand-tint px-6 py-10 text-center">
      <CircleCheck className="mx-auto size-11 text-brand" aria-hidden="true" />
      <p className="mt-4 font-display text-2xl font-medium text-heading">Request received</p>
      <p className="mx-auto mt-2 max-w-sm leading-relaxed text-muted">{message}</p>
    </div>
  );
}
