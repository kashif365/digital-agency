import { siteUrl } from './utils';

/** Builds Next.js metadata from API SEO fields, falling back to site-wide defaults. */
export function buildMetadata({ seo = {}, settings, path, title, description, type = 'website', extra = {} }) {
  const defaults = settings?.seo ?? {};
  const pageTitle = seo.title || title;
  const fullTitle = pageTitle
    ? (defaults.title_template || '%s').replace('%s', pageTitle)
    : defaults.site_title;
  const metaDescription = seo.description || description || defaults.default_description;
  const canonical = seo.canonical || siteUrl(path);
  // An explicit openGraph object replaces the file-based default, so it is named here.
  const image = seo.og_image || defaults.default_og_image || '/opengraph-image';

  return {
    title: { absolute: fullTitle },
    description: metaDescription,
    alternates: { canonical },
    robots: seo.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonical,
      siteName: settings?.company?.name,
      type,
      images: [{ url: image }],
      ...extra,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [image],
    },
  };
}
