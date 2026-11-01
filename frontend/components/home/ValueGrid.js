import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Stagger from '@/components/ui/Stagger';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ValueGrid({ data }) {
  const items = data.items ?? [];

  return (
    <section className="bg-surface py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} className="mb-12" />
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="rounded-[var(--radius-card)] border border-line bg-white p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-tint text-brand-dark">
                <Icon name={item.icon} className="size-5" />
              </span>
              <h3 className="mt-6 text-xl font-medium text-heading">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
