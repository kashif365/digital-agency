import Container from '@/components/ui/Container';
import Prose from '@/components/ui/Prose';

/** Long-form text such as legal pages: a narrow reading column, offset to the right of a label rail. */
export default function RichText({ data }) {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">{data.heading ? <h2 className="font-display text-2xl text-forest lg:sticky lg:top-32">{data.heading}</h2> : null}</div>
        <Prose html={data.body} className="max-w-[68ch] lg:col-span-8 [&_h2:first-child]:mt-0" />
      </Container>
    </section>
  );
}
