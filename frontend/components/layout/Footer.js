import { Mail, MapPin, Phone } from 'lucide-react';
import Link from '@/components/ui/AppLink';
import Container from '@/components/ui/Container';
import SocialIcons from '@/components/ui/SocialIcons';
import { analyticsIds } from '@/lib/utils';
import { CookieSettings } from './CookieConsent';
import Logo from './Logo';

function ColumnTitle({ children }) {
  return <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/60">{children}</h2>;
}

function LinkColumn({ title, links }) {
  return (
    <div>
      <ColumnTitle>{title}</ColumnTitle>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.url}>
            <Link href={link.url} className="text-white/85 transition hover:text-brand-light">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactColumn({ contact }) {
  return (
    <div>
      <ColumnTitle>Contact</ColumnTitle>
      <ul className="mt-5 space-y-3 text-white/85">
        {contact.phone ? (
          <li>
            <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className="inline-flex items-start gap-2.5 transition hover:text-brand-light">
              <Phone className="mt-1 size-4 shrink-0 text-brand-light" aria-hidden="true" />
              {contact.phone}
            </a>
          </li>
        ) : null}
        {contact.email ? (
          <li>
            <a href={`mailto:${contact.email}`} className="inline-flex items-start gap-2.5 break-all transition hover:text-brand-light">
              <Mail className="mt-1 size-4 shrink-0 text-brand-light" aria-hidden="true" />
              {contact.email}
            </a>
          </li>
        ) : null}
        {contact.address ? (
          <li className="inline-flex items-start gap-2.5">
            <MapPin className="mt-1 size-4 shrink-0 text-brand-light" aria-hidden="true" />
            <span className="whitespace-pre-line">{contact.address}</span>
          </li>
        ) : null}
        <li>
          <Link href="/contact-us" className="transition hover:text-brand-light">
            Send us a message
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default function Footer({ settings, services }) {
  const { company = {}, contact = {}, footer = {}, social = {} } = settings;
  const { ga4, gtm } = analyticsIds(settings);
  const serviceLinks = services
    .filter((service) => service.is_featured)
    .slice(0, 6)
    .map((service) => ({ label: service.title, url: `/services/${service.slug}` }));

  return (
    <footer className="relative isolate overflow-hidden bg-night text-white">
      <div className="backdrop-glow absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

      <Container className="grid gap-12 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-[1.5fr_1fr_1.2fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo company={company} dark />
          {company.description ? <p className="mt-6 max-w-sm leading-relaxed text-white/70">{company.description}</p> : null}
          <div className="mt-6">
            <SocialIcons social={social} />
          </div>
        </div>

        <LinkColumn title="Company" links={footer.quick_links ?? []} />
        <LinkColumn title="Services" links={serviceLinks} />
        <LinkColumn title="Resources" links={footer.resources ?? []} />
        <ContactColumn contact={contact} />
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy-policy" className="transition hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="transition hover:text-white">
                Terms &amp; Conditions
              </Link>
            </li>
            {ga4 || gtm ? (
              <li>
                <CookieSettings enabled />
              </li>
            ) : null}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
