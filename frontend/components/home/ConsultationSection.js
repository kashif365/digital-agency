import ConsultationForm from '@/components/forms/ConsultationForm';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import SectionHeading from '@/components/ui/SectionHeading';

/** The page's main conversion point: what to expect, beside the form that starts it. */
export function ConsultationPanel({ eyebrow, heading, lead, items = [], formHeading, formCta, services, budgets, defaultServiceId, idPrefix }) {
  return (
    <section id="consultation" className="relative isolate overflow-hidden bg-night py-20 md:py-28">
      <div className="backdrop-glow absolute inset-0 -z-10" aria-hidden="true" />
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading dark eyebrow={eyebrow} heading={heading} lead={lead} />
          <ol className="mt-10 space-y-7">
            {items.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/8 text-brand-light">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-white">{item.title}</h3>
                  <p className="mt-1 leading-relaxed text-white/70">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[1.75rem] bg-white p-6 shadow-float sm:p-9">
          {formHeading ? <h2 className="mb-6 text-2xl font-medium text-heading">{formHeading}</h2> : null}
          <ConsultationForm services={services} budgets={budgets} ctaLabel={formCta} defaultServiceId={defaultServiceId} idPrefix={idPrefix} />
        </div>
      </Container>
    </section>
  );
}

export default function ConsultationSection({ data, allServices, settings }) {
  return (
    <ConsultationPanel
      eyebrow={data.eyebrow}
      heading={data.heading}
      lead={data.lead}
      items={data.items}
      formHeading={data.form_heading}
      formCta={data.form_cta}
      services={allServices}
      budgets={settings.forms?.budget_ranges}
      idPrefix="page"
    />
  );
}
