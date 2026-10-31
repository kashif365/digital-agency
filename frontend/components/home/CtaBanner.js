import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';

/** Dark bar that overlaps the footer when it is the last thing on the page. */
export default function CtaBanner({ data, last = false }) {
  return (
    <section className={cn('relative z-10 pt-12 md:pt-16', last ? '-mb-20' : 'pb-12')}>
      <Container>
        <div className="topo-lines flex flex-col items-start justify-between gap-7 rounded-2xl bg-charcoal px-7 py-10 md:px-12 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <h2 className="text-[1.75rem] font-bold leading-tight text-white md:text-[2.25rem]">{data.heading}</h2>
            {data.lead ? <p className="mt-3 leading-relaxed text-white/80">{data.lead}</p> : null}
          </div>
          {data.cta_label ? (
            <Button href={data.cta_url} shape="soft" arrow className="shrink-0">
              {data.cta_label}
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
