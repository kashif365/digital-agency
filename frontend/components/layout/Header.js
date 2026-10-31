'use client';

import { ChevronDown, Mail, Menu, Phone, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from '@/components/ui/AppLink';
import Container from '@/components/ui/Container';
import SocialIcons from '@/components/ui/SocialIcons';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import MegaMenu from './MegaMenu';
import MobileNav from './MobileNav';

const SERVICES_URL = '/services';

export default function Header({ settings, categories }) {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const closeTimer = useRef(null);

  // Menus close when navigation lands on a new route.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  const items = settings.navigation?.header ?? [];
  const { phone, email } = settings.contact ?? {};
  const showUtility = settings.navigation?.show_utility_bar;

  // Hover is mouse-only: a tap would open the menu here, then the click would close it.
  const openMega = useCallback((event) => {
    if (event.pointerType === 'mouse') {
      clearTimeout(closeTimer.current);
      setMegaOpen(true);
    }
  }, []);

  const closeMegaSoon = useCallback((event) => {
    if (event.pointerType === 'mouse') {
      clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (url) => (url === '/' ? pathname === '/' : pathname.startsWith(url));

  return (
    <>
      {showUtility ? (
        <div className="hidden bg-white text-[0.9375rem] font-medium text-heading lg:block">
          <Container className="flex h-11 items-center justify-between">
            <div className="flex items-center gap-4">
              {phone ? (
                <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="inline-flex items-center gap-1.5 transition hover:text-brand">
                  <Phone className="size-4 text-brand" aria-hidden="true" />
                  {phone}
                </a>
              ) : null}
              {phone && email ? <span aria-hidden="true">|</span> : null}
              {email ? (
                <a href={`mailto:${email}`} className="inline-flex items-center gap-1.5 transition hover:text-brand">
                  <Mail className="size-4 text-brand" aria-hidden="true" />
                  {email}
                </a>
              ) : null}
              {!phone && !email ? <p>{settings.company?.tagline}</p> : null}
            </div>
            <SocialIcons social={settings.social} tone="light" />
          </Container>
        </div>
      ) : null}

      <header className="sticky top-0 z-50 bg-dark text-white">
        <div className="relative">
          <Container className="flex h-[5.25rem] max-w-[1440px] items-center justify-between gap-4 xl:gap-6">
            <Logo company={settings.company} dark />

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-0.5 xl:gap-2">
                {items.map((item) => {
                  const mega = item.url === SERVICES_URL && categories.length > 0;
                  const linkClasses = cn(
                    'whitespace-nowrap rounded-full px-2.5 py-2 text-[0.9375rem] font-medium transition hover:text-brand-light xl:px-3',
                    isActive(item.url) ? 'text-brand-light' : 'text-white'
                  );

                  if (!mega) {
                    return (
                      <li key={item.url}>
                        <Link href={item.url} className={cn(linkClasses, 'block')}>
                          {item.label}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={item.url} className="flex items-center" onPointerEnter={openMega} onPointerLeave={closeMegaSoon}>
                      <Link href={item.url} className={cn(linkClasses, 'pr-1')}>
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={megaOpen}
                        aria-controls="mega-menu"
                        aria-label={`${megaOpen ? 'Hide' : 'Show'} ${item.label.toLowerCase()} menu`}
                        onClick={() => setMegaOpen((open) => !open)}
                        className="grid size-7 place-items-center rounded-full text-white transition hover:text-brand-light"
                      >
                        <ChevronDown className={cn('size-4 transition-transform duration-200', megaOpen && 'rotate-180')} aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              {settings.cta?.header_label ? (
                <Link
                  href={settings.cta.header_url}
                  className="hidden whitespace-nowrap rounded-xl border-2 border-white px-5 py-2.5 font-display text-sm font-extrabold uppercase tracking-wide text-white transition hover:border-brand-light hover:bg-brand sm:block lg:hidden xl:block"
                >
                  {settings.cta.header_label}
                </Link>
              ) : null}
              <button
                type="button"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((open) => !open)}
                className="grid size-11 place-items-center rounded-full text-white transition hover:bg-white/10 lg:hidden"
              >
                {mobileOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
              </button>
            </div>
          </Container>

          <MegaMenu open={megaOpen} categories={categories} settings={settings} onPointerEnter={openMega} onPointerLeave={closeMegaSoon} />
        </div>

        <MobileNav open={mobileOpen} items={items} categories={categories} settings={settings} />
      </header>
    </>
  );
}
