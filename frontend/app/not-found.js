import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

export const metadata = { title: { absolute: 'Page not found' }, robots: { index: false } };

export default function NotFound() {
  return (
    <section className="bg-surface py-24 md:py-36">
      <Container className="max-w-2xl text-center">
        <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-brand">Error 404</p>
        <h1 className="mt-4 text-4xl font-extrabold text-heading md:text-5xl">We could not find that page</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          The page may have moved, or the address may be mistyped. These links should get you back on track.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to Home</Button>
          <Button href="/services" variant="outline">
            View Services
          </Button>
        </div>
      </Container>
    </section>
  );
}
