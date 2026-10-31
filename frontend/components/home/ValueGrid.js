import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ValueGrid({ data }) {
  const items = data.items ?? [];

  return (
    <section className="bg-dark py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} dark center className="mb-12" />
        <Reveal className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:border-brand-light">
              <span className="grid size-14 place-items-center rounded-2xl bg-brand text-white">
                <Icon name={item.icon} className="size-7" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-2.5 leading-relaxed text-white/75">{item.text}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
