import Button, { TextLink } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Rings from '@/components/ui/Rings';

export const metadata = { title: { absolute: 'Page not found' }, robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-40">
      <Rings seed={404} count={12} gap={24} className="absolute -right-40 top-1/2 -z-10 size-[40rem] -translate-y-1/2 text-forest/10" />
      <Container>
        <p className="label text-muted">Error 404</p>
        <h1 className="type-h1 mt-6 max-w-3xl text-forest">
          This page has <em className="accent text-moss">wandered off.</em>
        </h1>
        <p className="type-lead mt-7 max-w-xl text-muted">It may have moved, or the address may be mistyped. These links should get you back on track.</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href="/" arrow>
            Back to the homepage
          </Button>
          <TextLink href="/services">Browse services</TextLink>
        </div>
      </Container>
    </section>
  );
}
