import { Fraunces, Hanken_Grotesk } from 'next/font/google';
import CookieConsent from '@/components/layout/CookieConsent';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import PageCurtain from '@/components/layout/PageCurtain';
import JsonLd from '@/components/ui/JsonLd';
import MotionProvider from '@/components/ui/MotionProvider';
import { getIndustries, getServices, getSettings } from '@/lib/api';
import { organizationSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { analyticsIds, groupByCategory, siteUrl } from '@/lib/utils';
import './globals.css';

const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap', style: ['normal', 'italic'], axes: ['opsz'] });

export async function generateMetadata() {
  const settings = await getSettings();

  return { metadataBase: new URL(siteUrl()), ...buildMetadata({ settings, path: '/' }) };
}

export const viewport = { themeColor: '#f5f3ec' };

export default async function RootLayout({ children }) {
  const [settings, services, industries] = await Promise.all([getSettings(), getServices(), getIndustries()]);

  return (
    <html lang="en" className={`${hanken.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col">
        <PageCurtain />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}.page-curtain{display:none}'}</style>
        </noscript>
        <JsonLd data={organizationSchema(settings)} />
        <MotionProvider>
          <Header settings={settings} categories={groupByCategory(services)} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer settings={settings} services={services} industries={industries} />
        </MotionProvider>
        <CookieConsent {...analyticsIds(settings)} />
      </body>
    </html>
  );
}
