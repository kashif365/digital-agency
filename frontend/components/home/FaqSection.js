import Accordion from '@/components/ui/Accordion';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

export function FaqBlock({ eyebrow, heading, lead, items }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading eyebrow={eyebrow} heading={heading} lead={lead} />
      </div>
      <Accordion items={items} />
    </div>
  );
}

export default function FaqSection({ data, faqs }) {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="bg-surface py-20 md:py-28">
      <Container>
        <FaqBlock eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} items={faqs} />
      </Container>
    </section>
  );
}
