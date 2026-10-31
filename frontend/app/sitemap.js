import { getSitemapEntries } from '@/lib/api';
import { siteUrl } from '@/lib/utils';

export const revalidate = 3600;

export default async function sitemap() {
  const entries = await getSitemapEntries();

  return entries.map((entry) => ({ url: siteUrl(entry.path), lastModified: entry.lastmod }));
}
