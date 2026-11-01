import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Prose from '@/components/ui/Prose';
import Reveal from '@/components/ui/Reveal';
import { Eyebrow, Heading } from '@/components/ui/SectionHeading';
import Stagger from '@/components/ui/Stagger';
import ProblemArt from './ProblemArt';

export default function Statement({ data }) {
  const items = data.items ?? [];

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <div>
            {data.eyebrow ? <Eyebrow>{data.eyebrow}</Eyebrow> : null}
            <Heading text={data.heading} className="mt-4 md:text-[3.5rem]" />
          </div>
          <div>
            <Prose html={data.body} className="text-muted md:text-lg" />
            {data.cta_label ? (
              <Button href={data.cta_url} variant="dark" arrow className="mt-6">
                {data.cta_label}
              </Button>
            ) : null}
          </div>
        </Reveal>

        {items.length > 0 ? (
          <Stagger className="mt-14 grid gap-5 lg:grid-cols-3">
            {items.map((item, index) => (
              <article
                key={item.title}
                className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-3 transition duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-lift md:flex-row md:items-center lg:flex-col lg:items-stretch"
              >
                <div className="md:w-1/2 md:shrink-0 lg:w-full">
                  <ProblemArt icon={item.icon} />
                </div>
                <div className="flex-1 px-4 pb-4 pt-6 md:py-4 lg:pb-4 lg:pt-6">
                  <p className="font-display text-sm font-semibold text-brand-dark">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-1.5 text-[1.5rem] font-medium leading-tight text-heading">{item.title}</h3>
                  {item.text ? <p className="mt-2.5 leading-relaxed text-muted">{item.text}</p> : null}
                </div>
              </article>
            ))}
          </Stagger>
        ) : null}
      </Container>
    </section>
  );
}
