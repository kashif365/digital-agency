import ConsultationForm from '@/components/forms/ConsultationForm';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ConsultationSection({ data, allServices, settings }) {
  return (
    <section className="bg-surface py-14 md:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
        <div>
          <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} />
          <ol className="mt-8 space-y-6">
            {(data.items ?? []).map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-heading">{item.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div id="consultation" className="scroll-mt-28 rounded-3xl border border-line bg-white p-5 shadow-card sm:p-8">
          {data.form_heading ? <h2 className="mb-5 text-2xl font-extrabold text-heading">{data.form_heading}</h2> : null}
          <ConsultationForm services={allServices} budgets={settings.forms?.budget_ranges} ctaLabel={data.form_cta} idPrefix="page" />
        </div>
      </Container>
    </section>
  );
}
