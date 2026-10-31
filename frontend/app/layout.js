import { DM_Sans, Poppins } from 'next/font/google';
import Script from 'next/script';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import SideTab from '@/components/layout/SideTab';
import JsonLd from '@/components/ui/JsonLd';
import MotionProvider from '@/components/ui/MotionProvider';
import { getServices, getSettings } from '@/lib/api';
import { organizationSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { groupByCategory, siteUrl } from '@/lib/utils';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins', display: 'swap' });

export async function generateMetadata() {
  const settings = await getSettings();

  return { metadataBase: new URL(siteUrl()), ...buildMetadata({ settings, path: '/' }) };
}

export const viewport = { themeColor: '#0b0f19' };

const safeId = (id, pattern) => (id && pattern.test(id) ? id : null);

export default async function RootLayout({ children }) {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);
  const ga4 = safeId(settings.analytics?.ga4_id, /^G-[A-Z0-9]+$/);
  const gtm = safeId(settings.analytics?.gtm_id, /^GTM-[A-Z0-9]+$/);

  return (
    <html lang="en" className={`${dmSans.variable} ${poppins.variable}`}>
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
          <SideTab settings={settings} />
        </MotionProvider>

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
      </body>
    </html>
  );
}
