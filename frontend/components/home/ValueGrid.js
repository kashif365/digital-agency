import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Stagger from '@/components/ui/Stagger';

/** Principles as a numbered list of statements, set large, rather than a row of icon cards. */
export default function ValueGrid({ data }) {
  const items = data.items ?? [];

  return (
    <section className="bg-forest py-20 text-ivory md:py-28">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} dark className="mb-12 md:mb-16" />
        <Stagger as="ol" itemAs="li" className="grid gap-x-12 md:grid-cols-2" itemClassName="border-t border-ivory/15">
          {items.map((item, index) => (
            <div key={item.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] py-8 md:py-10">
              <span className="pt-1.5 font-display text-sm text-sage">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="type-h3 text-ivory">{item.title}</h3>
                {item.text ? <p className="mt-3 max-w-md text-[1.0625rem] leading-relaxed text-ivory/70">{item.text}</p> : null}
              </div>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
