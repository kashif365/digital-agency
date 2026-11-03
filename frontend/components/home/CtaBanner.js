import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Highlight from '@/components/ui/Highlight';
import Rings from '@/components/ui/Rings';

/** Closing invitation: one large line, one action, and the ring motif growing in from the edge. */
export default function CtaBanner({ data }) {
  return (
    <section className="relative isolate overflow-hidden bg-forest py-24 text-ivory md:py-36">
      <Rings seed={29} count={12} gap={26} className="absolute -bottom-72 -right-40 -z-10 size-[44rem] text-sage/[0.16]" />
      <Container>
        <h2 className="type-h1 max-w-4xl">
          <Highlight text={data.heading} dark />
        </h2>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {data.lead ? <p className="type-lead max-w-xl text-ivory/75">{data.lead}</p> : null}
          {data.cta_label ? (
            <Button href={data.cta_url} variant="light" arrow className="shrink-0 self-start md:self-auto">
              {data.cta_label}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
