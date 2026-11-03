import ConsultationForm from '@/components/forms/ConsultationForm';
import Container from '@/components/ui/Container';
import Rings from '@/components/ui/Rings';
import SectionHeading from '@/components/ui/SectionHeading';

/** The page's main conversion point: what to expect, beside the form that starts it. */
export function ConsultationPanel({ eyebrow, heading, lead, items = [], formHeading, formCta, services, budgets, defaultServiceId, idPrefix }) {
  return (
    <section id="consultation" className="relative isolate overflow-hidden bg-forest py-24 text-ivory md:py-36">
      <Rings seed={41} count={13} gap={26} className="absolute -left-64 -top-48 -z-10 size-[46rem] text-sage/[0.12]" />
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading dark eyebrow={eyebrow} heading={heading} lead={lead} />
          {items.length > 0 ? (
            <ol className="mt-12 border-t border-ivory/15">
              {items.map((item, index) => (
                <li key={item.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] border-b border-ivory/15 py-6">
                  <span className="font-display text-sm text-sage">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-xl text-ivory">{item.title}</h3>
                    {item.text ? <p className="mt-1.5 leading-relaxed text-ivory/70">{item.text}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          ) : null}
        </div>

        <div className="rounded-[var(--radius-card)] bg-paper p-6 text-ink sm:p-10 lg:col-span-7">
          {formHeading ? <h2 className="mb-8 font-display text-3xl text-forest">{formHeading}</h2> : null}
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
