import Container from '@/components/ui/Container';
import Prose from '@/components/ui/Prose';

export default function RichText({ data }) {
  return (
    <section className="py-14 md:py-20">
      <Container className="max-w-3xl">
        {data.heading ? <h2 className="mb-6 text-3xl font-extrabold text-heading">{data.heading}</h2> : null}
        <Prose html={data.body} />
      </Container>
    </section>
  );
}
