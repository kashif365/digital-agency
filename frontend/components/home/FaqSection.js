import Accordion from '@/components/ui/Accordion';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

export function FaqBlock({ eyebrow, heading, lead, items }) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <SectionHeading eyebrow={eyebrow} heading={heading} lead={lead} className="lg:sticky lg:top-32" />
      </div>
      <div className="lg:col-span-7">
        <Accordion items={items} />
      </div>
    </div>
  );
}

export default function FaqSection({ data, faqs }) {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-line py-24 md:py-36">
      <Container>
        <FaqBlock eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} items={faqs} />
      </Container>
    </section>
  );
}
