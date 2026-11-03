'use client';

import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

export default function Error({ reset }) {
  return (
    <section className="py-24 md:py-40">
      <Container>
        <p className="label text-muted">Something went wrong</p>
        <h1 className="type-h1 mt-6 max-w-3xl text-forest">This page could not be loaded</h1>
        <p className="type-lead mt-7 max-w-xl text-muted">The problem is on our side. Please try again in a moment.</p>
        <Button type="button" onClick={reset} arrow className="mt-10">
          Try again
        </Button>
      </Container>
    </section>
  );
}
