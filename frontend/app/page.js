import CmsPage from '@/components/sections/CmsPage';
import { getPage, getSettings } from '@/lib/api';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata() {
  const [page, settings] = await Promise.all([getPage('home'), getSettings()]);

  return buildMetadata({ seo: { ...page?.seo, title: null }, settings, path: '/' });
}

export default function HomePage() {
  return <CmsPage slug="home" />;
}
