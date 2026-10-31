import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import CookieConsent from '@/components/layout/CookieConsent';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import JsonLd from '@/components/ui/JsonLd';
import MotionProvider from '@/components/ui/MotionProvider';
import { getServices, getSettings } from '@/lib/api';
import { organizationSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { analyticsIds, groupByCategory, siteUrl } from '@/lib/utils';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' });
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' });

export async function generateMetadata() {
  const settings = await getSettings();

  return { metadataBase: new URL(siteUrl()), ...buildMetadata({ settings, path: '/' }) };
}

export const viewport = { themeColor: '#060b1a' };

export default async function RootLayout({ children }) {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  return (
    <html lang="en" className={`${dmSans.variable} ${bricolage.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <JsonLd data={organizationSchema(settings)} />
        <MotionProvider>
          <Header settings={settings} categories={groupByCategory(services)} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer settings={settings} services={services} />
        </MotionProvider>
        <CookieConsent {...analyticsIds(settings)} />
      </body>
    </html>
  );
}
