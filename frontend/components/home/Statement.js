import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Highlight from '@/components/ui/Highlight';
import Prose from '@/components/ui/Prose';
import { GreenRule, PillBadge } from '@/components/ui/SectionHeading';

export default function Statement({ data }) {
  return (
    <section className="bg-surface py-16 md:py-24">
      <Container className="max-w-4xl text-center">
        {data.eyebrow ? <PillBadge>{data.eyebrow}</PillBadge> : null}
        <h2 className="mx-auto mt-6 text-[2.125rem] font-bold leading-[1.16] text-heading md:text-[3.25rem]">
          <Highlight text={data.heading} />
        </h2>
        <GreenRule center />
        <Prose html={data.body} className="mt-8 text-muted md:text-lg" />
        {data.cta_label ? (
          <Button href={data.cta_url} shape="soft" className="mt-9 px-10 py-4">
            {data.cta_label}
          </Button>
        ) : null}
      </Container>
    </section>
  );
}
