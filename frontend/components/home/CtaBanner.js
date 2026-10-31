import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { Heading } from '@/components/ui/SectionHeading';

export default function CtaBanner({ data }) {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-night px-7 py-14 text-center md:px-12 md:py-20">
          <div className="backdrop-glow absolute inset-0 -z-20" aria-hidden="true" />
          <div className="backdrop-grid absolute inset-0 -z-10" aria-hidden="true" />
          <Heading text={data.heading} dark className="mx-auto max-w-3xl" />
          {data.lead ? <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{data.lead}</p> : null}
          {data.cta_label ? (
            <Button href={data.cta_url} arrow className="mt-9">
              {data.cta_label}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
