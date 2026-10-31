import { cn } from '@/lib/utils';

const CONTROL = 'w-full border-2 text-[0.9375rem] transition focus:outline-none';

function controlClasses(error, dark) {
  return cn(
    CONTROL,
    dark
      ? 'bg-transparent text-white placeholder:text-white/70 focus:border-brand-light [&>option]:text-heading'
      : 'bg-white text-ink placeholder:text-muted/70 focus:border-brand',
    error ? 'border-danger' : dark ? 'border-white/80' : 'border-[#ced4da] hover:border-brand/60'
  );
}

function Field({ id, label, optional, error, dark, className, children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={cn('mb-1.5 block font-display text-[0.9375rem] font-bold', dark ? 'text-white' : 'text-heading')}>
        {label}
        {optional ? <span className={cn('font-normal', dark ? 'text-white/70' : 'text-muted')}> (optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className={cn('mt-1.5 text-[0.8125rem] font-medium', dark ? 'text-[#ffb4b9]' : 'text-danger')}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function aria(id, error) {
  return { id, 'aria-invalid': error ? true : undefined, 'aria-describedby': error ? `${id}-error` : undefined };
}

export function TextField({ id, label, optional, error, register, className, dark = false, ...props }) {
  return (
    <Field id={id} label={label} optional={optional} error={error} dark={dark} className={className}>
      <input {...aria(id, error)} {...register} {...props} className={cn(controlClasses(error, dark), 'h-12 rounded-lg px-4')} />
    </Field>
  );
}

export function SelectField({ id, label, optional, error, register, placeholder, options, className, dark = false }) {
  return (
    <Field id={id} label={label} optional={optional} error={error} dark={dark} className={className}>
      <select {...aria(id, error)} {...register} className={cn(controlClasses(error, dark), 'h-12 rounded-lg px-3')}>
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

export function TextAreaField({ id, label, optional, error, register, className, rows = 4, dark = false, ...props }) {
  return (
    <Field id={id} label={label} optional={optional} error={error} dark={dark} className={className}>
      <textarea {...aria(id, error)} {...register} {...props} rows={rows} className={cn(controlClasses(error, dark), 'rounded-lg px-4 py-3')} />
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
