import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Prose from '@/components/ui/Prose';
import Reveal from '@/components/ui/Reveal';
import { Eyebrow, Heading } from '@/components/ui/SectionHeading';
import Stagger from '@/components/ui/Stagger';
import { cn } from '@/lib/utils';
import ProblemArt from './ProblemArt';

/** A dark band that names the problem, then breaks it into columns divided by hairlines. */
export default function Statement({ data }) {
  const items = data.items ?? [];

  return (
    <section className="bg-forest py-24 text-ivory md:py-36">
      <Container>
        <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            {data.eyebrow ? <Eyebrow dark>{data.eyebrow}</Eyebrow> : null}
            <Heading text={data.heading} dark className="mt-5" />
          </div>
          <div className="lg:col-span-5">
            <Prose html={data.body} className="text-ivory/75 md:text-lg [&_*]:text-inherit" />
            {data.cta_label ? (
              <Button href={data.cta_url} variant="light" arrow className="mt-7">
                {data.cta_label}
              </Button>
            ) : null}
          </div>
        </Reveal>

        {items.length > 0 ? (
          <Stagger className="mt-16 grid border-t border-ivory/15 md:mt-24 md:grid-cols-3" itemClassName="h-full">
            {items.map((item, index) => (
              <article key={item.title} className={cn('flex h-full flex-col pt-8 md:px-8 md:pb-2', index === 0 ? 'md:pl-0' : 'mt-6 border-t border-ivory/15 md:mt-0 md:border-l md:border-t-0', index === items.length - 1 && 'md:pr-0')}>
                <ProblemArt icon={item.icon} />
                <p className="mt-8 font-display text-sm text-sage">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="type-h3 mt-2 text-ivory">{item.title}</h3>
                {item.text ? <p className="mt-3 leading-relaxed text-ivory/70">{item.text}</p> : null}
              </article>
            ))}
          </Stagger>
        ) : null}
      </Container>
    </section>
  );
}
