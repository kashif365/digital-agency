import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';

/** Two routes forward, side by side: the first on forest, the second on stone. */
export default function DualCta({ data }) {
  const items = data.items ?? [];

  return (
    <section className="py-16 md:py-24">
      <Container className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {items.map((item, index) => {
          const dark = index % 2 === 0;

          return (
            <div key={item.title} className={cn('flex flex-col rounded-[var(--radius-card)] p-8 md:p-12', dark ? 'bg-forest text-ivory' : 'bg-stone text-forest')}>
              {item.text ? <p className={cn('label', dark ? 'text-sage' : 'text-muted')}>{item.text}</p> : null}
              <h2 className="type-h3 mt-4 max-w-md">{item.title}</h2>
              {item.cta_label ? (
                <Button href={item.cta_url} variant={dark ? 'light' : 'primary'} arrow className="mt-10 self-start">
                  {item.cta_label}
                </Button>
              ) : null}
            </div>
          );
        })}
      </Container>
    </section>
  );
}
