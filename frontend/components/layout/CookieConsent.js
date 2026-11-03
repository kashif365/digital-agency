'use client';

import Script from 'next/script';
import { useSyncExternalStore } from 'react';
import Link from '@/components/ui/AppLink';
import Button from '@/components/ui/Button';

const KEY = 'cookie-consent';
const listeners = new Set();

// Holds the choice for this visit when browser storage is blocked.
let memory = null;

function read() {
  try {
    return memory ?? localStorage.getItem(KEY);
  } catch {
    return memory;
  }
}

function choose(value) {
  memory = value;

  try {
    if (value) localStorage.setItem(KEY, value);
    else localStorage.removeItem(KEY);
  } catch {
    // The choice still applies until the visitor leaves.
  }

  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);

  return () => listeners.delete(listener);
}

const useConsent = () => useSyncExternalStore(subscribe, read, () => 'server');

function Analytics({ ga4, gtm }) {
  return (
    <>
      {ga4 ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="lazyOnload" />
          <Script id="ga4" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga4}');`}
          </Script>
        </>
      ) : null}
      {gtm ? (
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
        </Script>
      ) : null}
    </>
  );
}

/** Lets visitors change their mind. Reopens the notice below. */
export function CookieSettings({ enabled }) {
  if (!enabled) {
    return null;
  }

  return (
    <button type="button" onClick={() => choose(null)} className="transition hover:text-ivory">
      Cookie settings
    </button>
  );
}

/** Analytics load only after consent. With no analytics IDs set, none of this renders. */
export default function CookieConsent({ ga4, gtm }) {
  const consent = useConsent();

  if (!ga4 && !gtm) {
    return null;
  }

  if (consent === 'accepted') {
    return <Analytics ga4={ga4} gtm={gtm} />;
  }

  if (consent !== null) {
    return null;
  }

  return (
    <section aria-label="Cookie notice" className="fixed inset-x-4 bottom-4 z-50 max-w-md rounded-[var(--radius-card)] border border-line bg-paper p-6 text-ink shadow-[0_24px_60px_-28px_rgb(17_44_37/0.45)] sm:left-6 sm:right-auto">
      <p className="leading-relaxed">
        We use analytics cookies to understand how this site is used. They only load if you accept.{' '}
        <Link href="/privacy-policy" className="font-semibold text-forest underline decoration-clay underline-offset-2">
          Privacy Policy
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <Button type="button" onClick={() => choose('accepted')} className="min-h-10 px-5 py-2 text-sm">
          Accept
        </Button>
        <Button type="button" variant="outline" onClick={() => choose('declined')} className="min-h-10 px-5 py-2 text-sm">
          Decline
        </Button>
      </div>
    </section>
  );
}
