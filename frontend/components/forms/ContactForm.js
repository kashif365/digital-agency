'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import { submitForm } from '@/lib/forms';
import { contactSchema } from '@/lib/validation';
import { Honeypot, TextAreaField, TextField } from './fields';
import { FormError, FormSuccess } from './FormStatus';

export default function ContactForm({ ctaLabel = 'Send Message' }) {
  const pathname = usePathname();
  const [renderedAt] = useState(() => Date.now());
  const [status, setStatus] = useState({ sent: false, message: null });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '', company_fax: '' },
  });

  async function onSubmit(values) {
    setStatus({ sent: false, message: null });

    const result = await submitForm('/contact', {
      ...values,
      phone: values.phone || null,
      subject: values.subject || null,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative grid gap-4 sm:grid-cols-2">
      <TextField id="contact-name" label="Your Name" autoComplete="name" error={errors.name?.message} register={register('name')} />
      <TextField id="contact-email" label="Email Address" type="email" autoComplete="email" error={errors.email?.message} register={register('email')} />
      <TextField id="contact-phone" label="Phone Number" optional type="tel" autoComplete="tel" error={errors.phone?.message} register={register('phone')} />
      <TextField id="contact-subject" label="Subject" optional error={errors.subject?.message} register={register('subject')} />
      <TextAreaField id="contact-message" label="Message" rows={5} error={errors.message?.message} register={register('message')} className="sm:col-span-2" />
      <Honeypot register={register('company_fax')} />
      <div className="space-y-3 sm:col-span-2">
        <FormError message={status.message} />
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? 'Sending...' : ctaLabel}
        </Button>
      </div>
    </form>
  );
}
