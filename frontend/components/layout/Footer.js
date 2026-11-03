import Link from '@/components/ui/AppLink';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Rings from '@/components/ui/Rings';
import SocialIcons from '@/components/ui/SocialIcons';
import { analyticsIds } from '@/lib/utils';
import { CookieSettings } from './CookieConsent';
import Logo from './Logo';

function LinkColumn({ title, links }) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="label text-ivory/50">{title}</h2>
      <ul className="mt-5 space-y-2.5">
        {links.map((link) => (
          <li key={link.url}>
            <Link href={link.url} className="group text-ivory/85 transition hover:text-ivory">
              <span className="link-underline">{link.label}</span>
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
      <h2 className="label text-ivory/50">Contact</h2>
      <ul className="mt-5 space-y-2.5 text-ivory/85">
        {contact.email ? (
          <li>
            <a href={`mailto:${contact.email}`} className="group break-all transition hover:text-ivory">
              <span className="link-underline">{contact.email}</span>
            </a>
          </li>
        ) : null}
        {contact.phone ? (
          <li>
            <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className="group transition hover:text-ivory">
              <span className="link-underline">{contact.phone}</span>
            </a>
          </li>
        ) : null}
        {contact.address ? <li className="whitespace-pre-line text-ivory/70">{contact.address}</li> : null}
        <li>
          <Link href="/contact-us" className="group transition hover:text-ivory">
            <span className="link-underline">Send us a message</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default function Footer({ settings, services, industries = [] }) {
  const { company = {}, contact = {}, footer = {}, social = {}, cta = {} } = settings;
  const { ga4, gtm } = analyticsIds(settings);
  const serviceLinks = services
    .filter((service) => service.is_featured)
    .slice(0, 7)
    .map((service) => ({ label: service.title, url: `/services/${service.slug}` }));
  const industryLinks = industries.filter((industry) => industry.has_page).map((industry) => ({ label: industry.name, url: `/industries/${industry.slug}` }));

  return (
    <footer className="relative isolate overflow-hidden bg-charcoal text-ivory">
      <Rings seed={23} count={14} gap={24} className="absolute -bottom-72 -right-56 -z-10 size-[44rem] text-sage/[0.1]" />

      <Container className="pt-16 md:pt-24">
        <div className="grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo company={company} dark />
            {company.description ? <p className="mt-6 max-w-sm leading-relaxed text-ivory/65">{company.description}</p> : null}
            {cta.header_label ? (
              <Button href={cta.header_url} variant="light" arrow className="mt-8 min-h-11 px-5 py-2.5 text-sm">
                {cta.header_label}
              </Button>
            ) : null}
            <div className="mt-8">
              <SocialIcons social={social} />
            </div>
          </div>

          <LinkColumn title="Services" links={serviceLinks} />
          <LinkColumn title="Company" links={footer.quick_links ?? []} />
          <LinkColumn title="Industries" links={industryLinks.slice(0, 6)} />
          <div className="space-y-12">
            <ContactColumn contact={contact} />
            <LinkColumn title="Resources" links={footer.resources ?? []} />
          </div>
        </div>
      </Container>

      <div className="border-t border-ivory/15">
        <Container className="flex flex-col gap-3 py-6 text-sm text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy-policy" className="transition hover:text-ivory">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="transition hover:text-ivory">
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
