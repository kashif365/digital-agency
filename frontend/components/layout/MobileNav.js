'use client';

import { ChevronDown } from 'lucide-react';
import Link from '@/components/ui/AppLink';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function MobileNav({ open, items, categories, settings }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <div
      id="mobile-nav"
      className={cn(
        'fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-night px-4 pb-10 text-white transition duration-200 sm:px-6 lg:hidden',
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
      )}
    >
      <nav aria-label="Mobile">
        <ul className="divide-y divide-white/10">
          {items.map((item) => {
            if (item.url !== '/services' || categories.length === 0) {
              return (
                <li key={item.url}>
                  <Link href={item.url} className="block py-4 font-display text-2xl font-medium">
                    {item.label}
                  </Link>
                </li>
              );
            }

            return (
              <li key={item.url}>
                <div className="flex items-center justify-between">
                  <Link href={item.url} className="flex-1 py-4 font-display text-2xl font-medium">
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-label="Toggle services list"
                    onClick={() => setServicesOpen((value) => !value)}
                    className="grid size-11 place-items-center rounded-full"
                  >
                    <ChevronDown className={cn('size-5 transition-transform', servicesOpen && 'rotate-180')} aria-hidden="true" />
                  </button>
                </div>
                {servicesOpen ? (
                  <div className="space-y-5 pb-5">
                    {categories.map((category) => (
                      <div key={category.slug}>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/60">{category.name}</p>
                        <ul className="mt-1.5">
                          {category.services.map((service) => (
                            <li key={service.slug}>
                              <Link href={`/services/${service.slug}`} className="block py-2 font-medium text-white/85">
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

      {settings.cta?.header_label ? (
        <Button href={settings.cta.header_url} className="mt-6 w-full">
          {settings.cta.header_label}
        </Button>
      ) : null}
    </div>
  );
}
