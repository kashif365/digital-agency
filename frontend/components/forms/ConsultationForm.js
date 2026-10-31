'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import { submitForm } from '@/lib/forms';
import { cn } from '@/lib/utils';
import { consultationSchema } from '@/lib/validation';
import { Honeypot, SelectField, TextAreaField, TextField } from './fields';
import { FormError, FormSuccess } from './FormStatus';

const STEPS = [
  { title: 'Your Project', fields: ['service_id', 'budget', 'website'] },
  { title: 'Your Details', fields: ['full_name', 'business_name', 'email', 'phone'] },
  { title: 'Your Goals', fields: ['message'] },
];

export default function ConsultationForm({
  services,
  budgets = [],
  ctaLabel = 'Request My Free Consultation',
  defaultServiceId,
  idPrefix = 'consultation',
  wizard = false,
  dark = false,
  phone,
}) {
  const pathname = usePathname();
  const [renderedAt] = useState(() => Date.now());
  const [status, setStatus] = useState({ sent: false, message: null });
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    setError,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      full_name: '',
      business_name: '',
      email: '',
      phone: '',
      website: '',
      service_id: defaultServiceId ? String(defaultServiceId) : '',
      budget: '',
      message: '',
      company_fax: '',
    },
  });

  async function goNext() {
    if (await trigger(STEPS[step].fields)) {
      setStep(step + 1);
    }
  }

  async function onSubmit(values) {
    setStatus({ sent: false, message: null });

    const result = await submitForm('/leads', {
      ...values,
      service_id: Number(values.service_id),
      website: values.website || null,
      budget: values.budget || null,
      rendered_at: renderedAt,
      source_page: pathname,
    });

    if (result.ok) {
      setStatus({ sent: true, message: result.message });

      return;
    }

    const fields = Object.keys(result.fieldErrors ?? {});

    fields.forEach((field) => setError(field, { message: result.fieldErrors[field][0] }));

    // Server errors can belong to an earlier step, which would otherwise be hidden.
    const errorStep = STEPS.findIndex((item) => item.fields.some((field) => fields.includes(field)));

    if (wizard && errorStep >= 0) {
      setStep(errorStep);
    }

    setStatus({ sent: false, message: result.message });
  }

  if (status.sent) {
    return <FormSuccess message={status.message} dark={dark} />;
  }

  const id = (name) => `${idPrefix}-${name}`;
  const lastStep = !wizard || step === STEPS.length - 1;
  const show = (index) => !wizard || step === index;

  const submit = (event) => {
    if (lastStep) {
      handleSubmit(onSubmit)(event);
    } else {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <form onSubmit={submit} noValidate className="relative grid gap-4 sm:grid-cols-2 sm:items-end">
      {wizard ? (
        <div className="sm:col-span-2">
          <p className={cn('font-display text-lg font-bold', dark ? 'text-white' : 'text-heading')}>{STEPS[step].title}</p>
          <div className="mt-2 flex gap-1.5" aria-label={`Step ${step + 1} of ${STEPS.length}`} role="img">
            {STEPS.map((item, index) => (
              <span key={item.title} className={cn('h-1 flex-1 rounded-full', index <= step ? 'bg-brand-light' : 'bg-white/25')} />
            ))}
          </div>
        </div>
      ) : null}

      {show(0) ? (
        <>
          <SelectField
            id={id('service')}
            dark={dark}
            label="Service Interested In"
            placeholder="Choose a service"
            options={services.map((service) => ({ value: String(service.id), label: service.title }))}
            error={errors.service_id?.message}
            register={register('service_id')}
            className="sm:col-span-2"
          />
          <TextField id={id('website')} dark={dark} label="Website URL" optional inputMode="url" autoComplete="url" error={errors.website?.message} register={register('website')} className={cn(wizard && 'sm:col-span-2')} />
          <SelectField
            id={id('budget')}
            dark={dark}
            label="Monthly Marketing Budget"
            optional
            placeholder="Select a range"
            options={budgets.map((budget) => ({ value: budget, label: budget }))}
            error={errors.budget?.message}
            register={register('budget')}
            className={cn(wizard && 'sm:col-span-2')}
          />
        </>
      ) : null}

      {show(1) ? (
        <>
          <TextField id={id('name')} dark={dark} label="Full Name" autoComplete="name" error={errors.full_name?.message} register={register('full_name')} />
          <TextField id={id('business')} dark={dark} label="Business Name" autoComplete="organization" error={errors.business_name?.message} register={register('business_name')} />
          <TextField id={id('email')} dark={dark} label="Business Email" type="email" autoComplete="email" error={errors.email?.message} register={register('email')} />
          <TextField id={id('phone')} dark={dark} label="Phone Number" type="tel" autoComplete="tel" error={errors.phone?.message} register={register('phone')} />
        </>
      ) : null}

      {show(2) ? (
        <TextAreaField id={id('message')} dark={dark} label="Message / Business Goals" rows={wizard ? 5 : 4} error={errors.message?.message} register={register('message')} className="sm:col-span-2" />
      ) : null}

      <Honeypot register={register('company_fax')} />

      <div className="space-y-3 sm:col-span-2">
        <FormError message={status.message} dark={dark} />

        {lastStep && !wizard ? (
          <Button type="submit" shape="soft" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Sending...' : ctaLabel}
          </Button>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {step > 0 ? (
              <Button type="button" variant="ghost" shape="soft" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            ) : phone ? (
              <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="grid place-items-center rounded-full bg-brand px-3 py-2 text-center font-display text-sm font-bold leading-tight text-white transition hover:bg-brand-dark">
                Call Us Now: {phone}
              </a>
            ) : (
              <span aria-hidden="true" />
            )}
            {lastStep ? (
              <Button type="submit" shape="soft" disabled={isSubmitting} className="px-3 text-[0.9375rem]">
                {isSubmitting ? 'Sending...' : 'Request Consultation'}
              </Button>
            ) : (
              <Button type="button" variant="white" shape="soft" onClick={goNext} className="border-2 border-brand">
                Next
              </Button>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
