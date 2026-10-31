import { siteUrl } from '@/lib/utils';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: siteUrl('/sitemap.xml'),
  };
}
