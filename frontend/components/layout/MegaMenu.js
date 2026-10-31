import Link from '@/components/ui/AppLink';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

export default function MegaMenu({ open, categories, settings, onPointerEnter, onPointerLeave }) {
  return (
    <div
      id="mega-menu"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={cn(
        'absolute inset-x-0 top-full hidden bg-white text-ink shadow-float transition duration-200 lg:block',
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
      )}
    >
      <Container className="grid grid-cols-[1fr_17rem] gap-8 py-8">
        <div className="grid grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.slug}>
              <p className="border-b-2 border-brand px-2.5 pb-2 font-display text-[0.9375rem] font-bold text-heading">{category.name}</p>
              <ul className="mt-3 space-y-0.5">
                {category.services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex items-center gap-2.5 rounded-xl p-2.5 text-sm font-medium leading-snug text-heading transition hover:bg-brand-tint hover:text-brand"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-white">
                        <Icon name={service.icon} className="size-4" />
                      </span>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="topo-lines flex flex-col justify-between rounded-2xl bg-charcoal p-6 text-white">
          <div>
            <p className="font-display text-xl font-bold leading-snug">Not sure where to start?</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">Tell us your goals and we will help you find the right mix of services.</p>
          </div>
          {settings.cta?.header_label ? (
            <Button href={settings.cta.header_url} className="mt-5 min-h-11 px-4 py-2 text-sm">
              {settings.cta.header_label}
            </Button>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
