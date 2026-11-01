import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Stagger from '@/components/ui/Stagger';
import { cn } from '@/lib/utils';

function PlanCard({ plan }) {
  const dark = plan.is_recommended;

  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-[var(--radius-card)] p-8 transition duration-300 hover:-translate-y-2 hover:shadow-lift md:p-9',
        dark ? 'bg-night text-white ring-2 ring-brand-light lg:-my-4 lg:py-12' : 'border border-line bg-white text-heading'
      )}
    >
      {dark ? <span className="absolute -top-3.5 left-8 rounded-full bg-brand px-4 py-1 text-[0.8125rem] font-semibold text-white">Recommended</span> : null}
      <h3 className="text-2xl font-medium">{plan.name}</h3>
      {plan.description ? <p className={cn('mt-3 leading-relaxed', dark ? 'text-white/70' : 'text-muted')}>{plan.description}</p> : null}

      <p className="mt-7 font-display text-[2.75rem] font-semibold leading-none tracking-tight">{plan.price}</p>
      {plan.period ? <p className={cn('mt-2 text-sm', dark ? 'text-white/70' : 'text-muted')}>{plan.period}</p> : null}

      <ul className={cn('mt-7 flex-1 space-y-3.5 border-t pt-7', dark ? 'border-white/15' : 'border-line')}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className={cn('mt-0.5 grid size-5 shrink-0 place-items-center rounded-full', dark ? 'bg-brand text-white' : 'bg-brand-tint text-brand-dark')}>
              <Check className="size-3" strokeWidth={3} aria-hidden="true" />
            </span>
            <span className={dark ? 'text-white/85' : 'text-ink'}>{feature}</span>
          </li>
        ))}
      </ul>

      {plan.cta_label ? (
        <Button href={plan.cta_url} variant={dark ? 'primary' : 'outline'} arrow className="mt-8 w-full">
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
    <section id="pricing" className="bg-surface py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} center className="mb-16" />
        <Stagger className="grid items-stretch gap-6 lg:grid-cols-3">
          {pricing.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </Stagger>
        {data.note ? <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-muted">{data.note}</p> : null}
      </Container>
    </section>
  );
}
