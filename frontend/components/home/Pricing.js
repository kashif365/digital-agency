import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Stagger from '@/components/ui/Stagger';
import { cn } from '@/lib/utils';

function Plan({ plan }) {
  const dark = plan.is_recommended;

  return (
    <div className={cn('flex h-full flex-col rounded-[var(--radius-card)] p-7 md:p-9', dark ? 'bg-forest text-ivory' : 'border border-line bg-paper text-forest')}>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="type-h3">{plan.name}</h3>
        {dark ? <span className="label text-sage">Recommended</span> : null}
      </div>
      {plan.description ? <p className={cn('mt-4 min-h-[3lh] leading-relaxed', dark ? 'text-ivory/75' : 'text-muted')}>{plan.description}</p> : null}

      <div className={cn('mt-8 border-t pt-6', dark ? 'border-ivory/20' : 'border-line')}>
        <p className="font-display text-[2.75rem] leading-none tracking-[-0.03em]">{plan.price}</p>
        {plan.period ? <p className={cn('mt-2 text-sm', dark ? 'text-ivory/65' : 'text-muted')}>{plan.period}</p> : null}
      </div>

      <p className={cn('label mt-8', dark ? 'text-ivory/55' : 'text-muted')}>What is included</p>
      <ul className="mt-4 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="grid grid-cols-[1.25rem_minmax(0,1fr)] leading-snug">
            <span className={cn('mt-2.5 h-px w-2.5', dark ? 'bg-sage' : 'bg-clay')} aria-hidden="true" />
            <span className={dark ? 'text-ivory/90' : 'text-ink'}>{feature}</span>
          </li>
        ))}
      </ul>

      {plan.cta_label ? (
        <Button href={plan.cta_url} variant={dark ? 'light' : 'outline'} arrow className="mt-10 w-full">
          {plan.cta_label}
          <span className="sr-only">: {plan.name} plan</span>
        </Button>
      ) : null}
    </div>
  );
}

export default function Pricing({ data, pricing }) {
  if (pricing.length === 0) {
    return null;
  }

  return (
    <section id="pricing" className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} className="mb-14" />
        <Stagger className="grid items-stretch gap-5 lg:grid-cols-3">
          {pricing.map((plan) => (
            <Plan key={plan.id} plan={plan} />
          ))}
        </Stagger>
        {data.note ? <p className="mt-10 max-w-2xl border-l-2 border-clay pl-4 text-[0.9375rem] leading-relaxed text-muted">{data.note}</p> : null}
      </Container>
    </section>
  );
}
