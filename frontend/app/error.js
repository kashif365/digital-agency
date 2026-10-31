'use client';

import { RefreshCw } from 'lucide-react';
import Container from '@/components/ui/Container';

export default function Error({ reset }) {
  return (
    <section className="bg-surface py-24 md:py-36">
      <Container className="max-w-2xl text-center">
        <h1 className="text-5xl font-semibold text-heading">This page could not be loaded</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">Something went wrong on our side. Please try again in a moment.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition hover:bg-brand-dark"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          Try Again
        </button>
      </Container>
    </section>
  );
}
