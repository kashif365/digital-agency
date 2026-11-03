import Link from '@/components/ui/AppLink';
import Button, { TextLink } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Rings from '@/components/ui/Rings';
import { cn } from '@/lib/utils';

export default function MegaMenu({ open, categories, settings, onPointerEnter, onPointerLeave }) {
  return (
    <div
      id="mega-menu"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={cn(
        'absolute inset-x-0 top-full hidden border-b border-line bg-ivory text-ink transition duration-300 lg:block',
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
      )}
    >
      <Container className="grid grid-cols-[1fr_19rem] gap-12 py-10">
        <div>
          <div className="grid grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={category.slug}>
                <p className="label flex items-baseline gap-2 border-b border-line pb-3 text-muted">
                  <span className="font-display text-sm font-normal normal-case tracking-normal text-clay-deep">{String(index + 1).padStart(2, '0')}</span>
                  {category.name}
                </p>
                <ul className="mt-3">
                  {category.services.map((service) => (
                    <li key={service.slug}>
                      <Link href={`/services/${service.slug}`} className="group block py-1.5 text-[0.9375rem] leading-snug text-forest">
                        <span className="link-underline">{service.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-8 border-t border-line pt-5 text-sm">
            <TextLink href="/services">All services</TextLink>
            <TextLink href="/industries">Industries we work with</TextLink>
          </div>
        </div>

        <div className="relative isolate flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-forest p-7 text-ivory">
          <Rings seed={11} count={8} className="absolute -bottom-24 -right-24 -z-10 size-72 text-sage/20" />
          <div>
            <p className="font-display text-2xl leading-snug">Not sure where to start?</p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/70">Tell us what you want more of. We will suggest which services, if any, would make the biggest difference.</p>
          </div>
          {settings.cta?.header_label ? (
            <Button href={settings.cta.header_url} variant="light" arrow className="mt-6 min-h-11 self-start px-5 py-2 text-sm">
              {settings.cta.header_label}
            </Button>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
