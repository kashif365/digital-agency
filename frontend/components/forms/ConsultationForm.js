'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import { submitForm } from '@/lib/forms';
import { consultationSchema } from '@/lib/validation';
import { Honeypot, SelectField, TextAreaField, TextField } from './fields';
import { FormError, FormSuccess } from './FormStatus';

export default function ConsultationForm({ services, budgets = [], ctaLabel = 'Request my free consultation', defaultServiceId, idPrefix = 'consultation' }) {
  const pathname = usePathname();
  const [renderedAt] = useState(() => Date.now());
  const [status, setStatus] = useState({ sent: false, message: null });

  const {
    register,
    handleSubmit,
    setError,
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

    Object.entries(result.fieldErrors ?? {}).forEach(([field, messages]) => {
      setError(field, { message: messages[0] });
    });
    setStatus({ sent: false, message: result.message });
  }

  if (status.sent) {
    return <FormSuccess message={status.message} />;
  }

  const id = (name) => `${idPrefix}-${name}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative grid gap-4 sm:grid-cols-2">
      <TextField id={id('name')} label="Full name" autoComplete="name" error={errors.full_name?.message} register={register('full_name')} />
      <TextField id={id('business')} label="Business name" autoComplete="organization" error={errors.business_name?.message} register={register('business_name')} />
      <TextField id={id('email')} label="Business email" type="email" autoComplete="email" error={errors.email?.message} register={register('email')} />
      <TextField id={id('phone')} label="Phone number" type="tel" autoComplete="tel" error={errors.phone?.message} register={register('phone')} />
      <SelectField
        id={id('service')}
        label="What do you need help with?"
        placeholder="Choose a service"
        options={services.map((service) => ({ value: String(service.id), label: service.title }))}
        error={errors.service_id?.message}
        register={register('service_id')}
        className="sm:col-span-2"
      />
      <TextField id={id('website')} label="Website" optional inputMode="url" autoComplete="url" error={errors.website?.message} register={register('website')} />
      <SelectField
        id={id('budget')}
        label="Monthly budget"
        optional
        placeholder="Select a range"
        options={budgets.map((budget) => ({ value: budget, label: budget }))}
        error={errors.budget?.message}
        register={register('budget')}
      />
      <TextAreaField id={id('message')} label="What are you trying to achieve?" rows={4} error={errors.message?.message} register={register('message')} className="sm:col-span-2" />

      <Honeypot register={register('company_fax')} />

      <div className="space-y-3 sm:col-span-2">
        <FormError message={status.message} />
        <Button type="submit" arrow disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Sending...' : ctaLabel}
        </Button>
      </div>
    </form>
  );
}
