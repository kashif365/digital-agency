import ContactForm from '@/components/forms/ContactForm';
import { TextLink } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Prose from '@/components/ui/Prose';
import SectionHeading from '@/components/ui/SectionHeading';
import SocialIcons from '@/components/ui/SocialIcons';

function Detail({ label, href, children }) {
  return (
    <div className="border-t border-line py-5">
      <dt className="label text-muted">{label}</dt>
      <dd className="mt-2 whitespace-pre-line font-display text-xl text-forest">
        {href ? (
          <a href={href} className="group break-words">
            <span className="link-underline">{children}</span>
          </a>
        ) : (
          children
        )}
      </dd>
    </div>
  );
}

export default function ContactSection({ data, settings }) {
  const { contact = {}, social = {} } = settings;
  const hasSocial = Object.values(social).some(Boolean);

  return (
    <section className="py-20 md:py-28">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading heading={data.heading} lead={data.lead} />
          <Prose html={data.body} className="mt-5 text-muted" />

          {contact.email || contact.phone || contact.address ? (
            <dl className="mt-10 border-b border-line">
              {contact.email ? (
                <Detail label="Email" href={`mailto:${contact.email}`}>
                  {contact.email}
                </Detail>
              ) : null}
              {contact.phone ? (
                <Detail label="Phone" href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>
                  {contact.phone}
                </Detail>
              ) : null}
              {contact.address ? <Detail label="Address">{contact.address}</Detail> : null}
            </dl>
          ) : null}

          {hasSocial ? (
            <div className="mt-8 w-fit rounded-full bg-forest p-1.5">
              <SocialIcons social={social} />
            </div>
          ) : null}

          <div className="mt-10 border-l-2 border-clay pl-4">
            <p className="text-muted">Planning a project and want to talk it through properly?</p>
            <TextLink href="/free-consultation" className="mt-2">
              Request a free consultation
            </TextLink>
          </div>
        </div>

        <div className="rounded-[var(--radius-card)] border border-line bg-paper p-6 sm:p-10 lg:col-span-7">
          <ContactForm ctaLabel={data.cta_label} />
        </div>
      </Container>
    </section>
  );
}
