import { Mail, MapPin, Phone } from 'lucide-react';
import Link from '@/components/ui/AppLink';
import Container from '@/components/ui/Container';
import SocialIcons from '@/components/ui/SocialIcons';
import Logo from './Logo';

function Wave() {
  return (
    <svg viewBox="0 0 40 6" className="mt-2.5 h-1.5 w-10" fill="none" stroke="var(--color-brand-light)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M1 4C7-1 13-1 20 3s13 2 19-1" />
    </svg>
  );
}

function ColumnTitle({ children }) {
  return (
    <h2 className="font-display text-lg font-medium text-white">
      {children}
      <Wave />
    </h2>
  );
}

function LinkColumn({ title, links }) {
  return (
    <div>
      <ColumnTitle>{title}</ColumnTitle>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.url}>
            <Link href={link.url} className="text-[0.9375rem] font-medium text-white/85 transition hover:text-brand-light">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ settings, services }) {
  const { company = {}, contact = {}, footer = {}, social = {} } = settings;
  const serviceLinks = services
    .filter((service) => service.is_featured)
    .slice(0, 7)
    .map((service) => ({ label: service.title, url: `/services/${service.slug}` }));

  return (
    <footer className="bg-charcoal text-white">
      <Container className="grid gap-10 pb-12 pt-28 sm:grid-cols-2 lg:grid-cols-[1.55fr_1fr_1.25fr_1fr_1.2fr]">
        <div className="rounded-2xl bg-black/30 p-7 sm:col-span-2 lg:col-span-1">
          <Logo company={company} dark />
          {company.description ? <p className="mt-5 text-[0.9375rem] leading-relaxed text-white/85">{company.description}</p> : null}
          <div className="mt-6">
            <SocialIcons social={social} />
          </div>
        </div>

        <div className="lg:pt-7">
          <LinkColumn title="Quick Links" links={footer.quick_links ?? []} />
        </div>
        <div className="lg:pt-7">
          <LinkColumn title="Our Services" links={serviceLinks} />
        </div>
        <div className="lg:pt-7">
          <LinkColumn title="Resources" links={footer.resources ?? []} />
        </div>

        <div className="lg:pt-7">
          <ColumnTitle>Contact Information</ColumnTitle>
          <ul className="mt-5 space-y-3 text-[0.9375rem] text-white/85">
            {contact.phone ? (
              <li>
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className="inline-flex items-start gap-2.5 transition hover:text-brand-light">
                  <Phone className="mt-0.5 size-4 shrink-0 text-brand-light" aria-hidden="true" />
                  {contact.phone}
                </a>
              </li>
            ) : null}
            {contact.email ? (
              <li>
                <a href={`mailto:${contact.email}`} className="inline-flex items-start gap-2.5 break-all transition hover:text-brand-light">
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand-light" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
            ) : null}
            {contact.address ? (
              <li className="inline-flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-light" aria-hidden="true" />
                <span className="whitespace-pre-line">{contact.address}</span>
              </li>
            ) : null}
            <li>
              <Link href="/contact-us" className="font-medium text-brand-light transition hover:text-white">
                Send us a message
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
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
          </ul>
        </Container>
      </div>
    </footer>
  );
}
