import { cn } from '@/lib/utils';

function controlClasses(error) {
  return cn(
    'w-full rounded-[var(--radius-sm)] border bg-ivory/60 text-forest transition placeholder:text-muted/70 focus:border-forest focus:bg-paper focus:outline-none focus:ring-2 focus:ring-forest/10',
    error ? 'border-danger' : 'border-line hover:border-forest/40'
  );
}

function Field({ id, label, optional, error, className, children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-forest">
        {label}
        {optional ? <span className="font-normal text-muted"> (optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.8125rem] font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function aria(id, error) {
  return { id, 'aria-invalid': error ? true : undefined, 'aria-describedby': error ? `${id}-error` : undefined };
}

export function TextField({ id, label, optional, error, register, className, ...props }) {
  return (
    <Field id={id} label={label} optional={optional} error={error} className={className}>
      <input {...aria(id, error)} {...register} {...props} className={cn(controlClasses(error), 'h-12 px-4')} />
    </Field>
  );
}

export function SelectField({ id, label, optional, error, register, placeholder, options, className }) {
  return (
    <Field id={id} label={label} optional={optional} error={error} className={className}>
      <select {...aria(id, error)} {...register} className={cn(controlClasses(error), 'h-12 px-3')}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function TextAreaField({ id, label, optional, error, register, className, rows = 4, ...props }) {
  return (
    <Field id={id} label={label} optional={optional} error={error} className={className}>
      <textarea {...aria(id, error)} {...register} {...props} rows={rows} className={cn(controlClasses(error), 'px-4 py-3')} />
    </Field>
  );
}

/** Invisible to people, tempting to bots. The API treats any value here as spam. */
export function Honeypot({ register }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
      <label>
        Fax
        <input type="text" tabIndex={-1} autoComplete="off" {...register} />
      </label>
    </div>
  );
}
