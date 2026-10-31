import { notFound } from 'next/navigation';
import CmsPage from '@/components/sections/CmsPage';
import { getPage, getSettings } from '@/lib/api';
import { buildMetadata } from '@/lib/seo';

// Renders each page on first visit, then serves it from the ISR cache.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [page, settings] = await Promise.all([getPage(slug), getSettings()]);

  if (!page) {
    return {};
  }

  return buildMetadata({ seo: page.seo, settings, path: `/${slug}`, title: page.title });
}

export default async function Page({ params }) {
  const { slug } = await params;

  // The homepage record is only served from the root URL.
  if (slug === 'home') {
    notFound();
  }

  return <CmsPage slug={slug} />;
}
