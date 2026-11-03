'use client';

import { ChevronDown, Mail, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from '@/components/ui/AppLink';
import Button from '@/components/ui/Button';
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
  const [scrolled, setScrolled] = useState(false);
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
  const showUtility = settings.navigation?.show_utility_bar && (phone || email);

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
      closeTimer.current = setTimeout(() => setMegaOpen(false), 160);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll);
    };
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
        <div className="hidden border-b border-line bg-ivory text-sm text-muted lg:block">
          <Container className="flex h-10 items-center justify-end gap-6">
            {phone ? (
              <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="inline-flex items-center gap-1.5 transition hover:text-forest">
                <Phone className="size-3.5" aria-hidden="true" />
                {phone}
              </a>
            ) : null}
            {email ? (
              <a href={`mailto:${email}`} className="inline-flex items-center gap-1.5 transition hover:text-forest">
                <Mail className="size-3.5" aria-hidden="true" />
                {email}
              </a>
            ) : null}
            <SocialIcons social={settings.social} tone="light" />
          </Container>
        </div>
      ) : null}

      <header
        className={cn(
          'sticky top-0 z-50 border-b bg-ivory/95 text-forest backdrop-blur-md transition-colors duration-300',
          scrolled || megaOpen || mobileOpen ? 'border-line' : 'border-transparent'
        )}
      >
        <div className="relative">
          <Container className="flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
            <Logo company={settings.company} />

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-1 xl:gap-2">
                {items.map((item) => {
                  const mega = item.url === SERVICES_URL && categories.length > 0;
                  const active = isActive(item.url);
                  const linkClasses = cn(
                    'group relative whitespace-nowrap px-3 py-2 text-[0.9375rem] font-medium transition-colors hover:text-forest',
                    active ? 'text-forest' : 'text-ink/75'
                  );
                  const marker = (
                    <span
                      className={cn('absolute inset-x-3 -bottom-0.5 h-px origin-left bg-clay transition-transform duration-300', active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100')}
                      aria-hidden="true"
                    />
                  );

                  if (!mega) {
                    return (
                      <li key={item.url}>
                        <Link href={item.url} className={cn(linkClasses, 'block')} aria-current={active ? 'page' : undefined}>
                          {item.label}
                          {marker}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={item.url} className="flex items-center" onPointerEnter={openMega} onPointerLeave={closeMegaSoon}>
                      <Link href={item.url} className={cn(linkClasses, 'pr-1')} aria-current={active ? 'page' : undefined}>
                        {item.label}
                        {marker}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={megaOpen}
                        aria-controls="mega-menu"
                        aria-label={`${megaOpen ? 'Hide' : 'Show'} ${item.label.toLowerCase()} menu`}
                        onClick={() => setMegaOpen((open) => !open)}
                        className="grid size-7 place-items-center text-ink/60 transition hover:text-forest"
                      >
                        <ChevronDown className={cn('size-4 transition-transform duration-300', megaOpen && 'rotate-180')} aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              {settings.cta?.header_label ? (
                <Button href={settings.cta.header_url} className="min-h-11 px-5 py-2.5 max-sm:hidden">
                  {settings.cta.header_label}
                </Button>
              ) : null}
              <button
                type="button"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((open) => !open)}
                className="relative grid size-11 place-items-center lg:hidden"
              >
                <span className={cn('absolute h-px w-6 bg-forest transition duration-300', mobileOpen ? 'rotate-45' : '-translate-y-1')} aria-hidden="true" />
                <span className={cn('absolute h-px w-6 bg-forest transition duration-300', mobileOpen ? '-rotate-45' : 'translate-y-1')} aria-hidden="true" />
              </button>
            </div>
          </Container>

          <MegaMenu open={megaOpen} categories={categories} settings={settings} onPointerEnter={openMega} onPointerLeave={closeMegaSoon} />
        </div>

      </header>

      {/* Outside the header: its backdrop blur would otherwise trap this fixed panel inside the bar. */}
      <MobileNav open={mobileOpen} items={items} categories={categories} settings={settings} isActive={isActive} />
    </>
  );
}
