import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Stagger from '@/components/ui/Stagger';

export default function DualCta({ data }) {
  return (
    <section className="bg-night py-16 md:py-20">
      <Container>
        <Stagger className="grid gap-5 lg:grid-cols-2">
          {(data.items ?? []).map((item) => (
            <div key={item.title} className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-8 md:p-12">
              {item.text ? <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-light">{item.text}</p> : null}
              <h2 className="mt-4 text-3xl font-medium leading-tight text-white">{item.title}</h2>
              {item.cta_label ? (
                <Button href={item.cta_url} variant="white" arrow className="mt-7">
                  {item.cta_label}
                </Button>
              ) : null}
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
