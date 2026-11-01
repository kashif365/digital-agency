'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

/** One-field first step: carries the visitor's website into the full consultation form. */
export default function QuickStart({ label, target = '#consultation' }) {
  const [website, setWebsite] = useState('');

  function submit(event) {
    event.preventDefault();

    const section = target.startsWith('#') ? document.querySelector(target) : null;

    if (!section) {
      window.location.assign(target.startsWith('#') ? '/free-consultation' : target);

      return;
    }

    window.dispatchEvent(new CustomEvent('consultation:start', { detail: { website: website.trim() } }));
    section.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <form onSubmit={submit} className="flex max-w-xl flex-col gap-2 rounded-[1.75rem] bg-white p-2 shadow-float focus-within:ring-2 focus-within:ring-brand-light sm:flex-row sm:items-center sm:rounded-full">
      <label htmlFor="quick-website" className="sr-only">
        Your website address
      </label>
      <input
        id="quick-website"
        type="text"
        inputMode="url"
        autoComplete="url"
        placeholder="Enter your website"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        className="min-h-12 min-w-0 flex-1 rounded-full bg-transparent px-5 text-heading placeholder:text-muted focus:outline-none"
      />
      <Button type="submit" arrow className="shrink-0">
        {label}
      </Button>
    </form>
  );
}
