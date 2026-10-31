import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import Container from '@/components/ui/Container';
import Prose from '@/components/ui/Prose';
import SectionHeading from '@/components/ui/SectionHeading';
import SocialIcons from '@/components/ui/SocialIcons';

function Detail({ icon: IconComponent, label, href, children }) {
  const content = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-tint text-brand-dark">
        <IconComponent className="size-5" aria-hidden="true" />
      </span>
      <span>
        <span className="block text-sm text-muted">{label}</span>
        <span className="block whitespace-pre-line font-medium text-heading">{children}</span>
      </span>
    </>
  );

  return href ? (
    <a href={href} className="flex gap-4 transition hover:opacity-80">
      {content}
    </a>
  ) : (
    <div className="flex gap-4">{content}</div>
  );
}

export default function ContactSection({ data, settings }) {
  const { contact = {}, social = {} } = settings;
  const hasSocial = Object.values(social).some(Boolean);

  return (
    <section className="py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading heading={data.heading} lead={data.lead} />
          <Prose html={data.body} className="mt-4 text-muted" />
          <div className="mt-8 space-y-5">
            {contact.phone ? (
              <Detail icon={Phone} label="Phone" href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>
                {contact.phone}
              </Detail>
            ) : null}
            {contact.email ? (
              <Detail icon={Mail} label="Email" href={`mailto:${contact.email}`}>
                {contact.email}
              </Detail>
            ) : null}
            {contact.address ? (
              <Detail icon={MapPin} label="Address">
                {contact.address}
              </Detail>
            ) : null}
          </div>
          {hasSocial ? (
            <div className="mt-7 w-fit rounded-full bg-dark p-2">
              <SocialIcons social={social} />
            </div>
          ) : null}
        </div>

        <div className="rounded-[1.75rem] border border-line bg-white p-6 sm:p-9">
          <ContactForm ctaLabel={data.cta_label} />
        </div>
      </Container>
    </section>
  );
}
