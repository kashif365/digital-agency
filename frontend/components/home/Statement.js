import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Prose from '@/components/ui/Prose';
import Reveal from '@/components/ui/Reveal';
import { Eyebrow, Heading } from '@/components/ui/SectionHeading';

export default function Statement({ data }) {
  const items = data.items ?? [];

  return (
    <section className="py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <Reveal>
          {data.eyebrow ? <Eyebrow>{data.eyebrow}</Eyebrow> : null}
          <Heading text={data.heading} className="mt-4 md:text-[3.5rem]" />
          <Prose html={data.body} className="mt-6 max-w-xl text-muted md:text-lg" />
          {data.cta_label ? (
            <Button href={data.cta_url} variant="dark" arrow className="mt-8">
              {data.cta_label}
            </Button>
          ) : null}
        </Reveal>

        {items.length > 0 ? (
          <Reveal delay={0.1}>
            <ul className="divide-y divide-line border-y border-line">
              {items.map((item) => (
                <li key={item.title} className="flex gap-5 py-7">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-tint text-brand-dark">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-medium leading-snug text-heading">{item.title}</h3>
                    {item.text ? <p className="mt-1.5 leading-relaxed text-muted">{item.text}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
