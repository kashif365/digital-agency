import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Highlight from '@/components/ui/Highlight';

export function FaqBlock({ heading, lead, items, cta }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
      <div>
        <h2 className="text-3xl font-bold leading-tight text-heading md:text-[2.25rem]">
          <Highlight text={heading} />
        </h2>
        <span className="mt-5 block h-px w-64 max-w-full bg-heading" aria-hidden="true" />
        {lead ? <p className="mt-5 leading-relaxed text-ink">{lead}</p> : null}
        {cta ? (
          <Button href={cta.href} variant="dark" shape="soft" className="mt-5 min-h-10 px-5 py-2 font-sans text-[0.9375rem] font-normal">
            {cta.label}
          </Button>
        ) : null}
      </div>
      <Accordion items={items} />
    </div>
  );
}

export default function FaqSection({ data, faqs, settings }) {
  if (faqs.length === 0) {
    return null;
  }

  const cta = settings.cta?.header_label ? { href: settings.cta.header_url, label: settings.cta.header_label } : null;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <FaqBlock heading={data.heading} lead={data.lead} items={faqs} cta={cta} />
      </Container>
    </section>
  );
}
