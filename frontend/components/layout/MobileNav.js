'use client';

import { ChevronDown } from 'lucide-react';
import Link from '@/components/ui/AppLink';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function MobileNav({ open, items, categories, settings, isActive }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const { phone, email } = settings.contact ?? {};

  return (
    <div
      id="mobile-nav"
      className={cn(
        'fixed inset-x-0 bottom-0 top-[4.5rem] z-40 flex flex-col overflow-y-auto bg-ivory px-5 pb-8 pt-4 text-forest transition duration-300 sm:px-8 lg:hidden',
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
      )}
    >
      <nav aria-label="Mobile">
        <ul className="border-t border-line">
          {items.map((item, index) => {
            const number = <span className="w-8 shrink-0 font-display text-sm text-clay-deep">{String(index + 1).padStart(2, '0')}</span>;
            const classes = cn('flex flex-1 items-baseline py-4 font-display text-[1.75rem] leading-tight', isActive(item.url) && 'italic');

            if (item.url !== '/services' || categories.length === 0) {
              return (
                <li key={item.url} className="border-b border-line">
                  <Link href={item.url} className={classes} aria-current={isActive(item.url) ? 'page' : undefined}>
                    {number}
                    {item.label}
                  </Link>
                </li>
              );
            }

            return (
              <li key={item.url} className="border-b border-line">
                <div className="flex items-center justify-between">
                  <Link href={item.url} className={classes} aria-current={isActive(item.url) ? 'page' : undefined}>
                    {number}
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls="mobile-services"
                    aria-label="Toggle services list"
                    onClick={() => setServicesOpen((value) => !value)}
                    className="grid size-11 place-items-center"
                  >
                    <ChevronDown className={cn('size-5 transition-transform duration-300', servicesOpen && 'rotate-180')} aria-hidden="true" />
                  </button>
                </div>
                {servicesOpen ? (
                  <div id="mobile-services" className="space-y-5 pb-6 pl-8">
                    {categories.map((category) => (
                      <div key={category.slug}>
                        <p className="label text-muted">{category.name}</p>
                        <ul className="mt-1">
                          {category.services.map((service) => (
                            <li key={service.slug}>
                              <Link href={`/services/${service.slug}`} className="block py-2 text-[1.0625rem]">
                                {service.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto pt-10">
        {settings.cta?.header_label ? (
          <Button href={settings.cta.header_url} arrow className="w-full">
            {settings.cta.header_label}
          </Button>
        ) : null}
        {phone || email ? (
          <div className="mt-6 space-y-1 text-muted">
            {email ? (
              <a href={`mailto:${email}`} className="block">
                {email}
              </a>
            ) : null}
            {phone ? (
              <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="block">
                {phone}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
