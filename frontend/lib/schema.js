import { siteUrl } from './utils';

/**
 * Structured data only states what the business has actually provided. Blank
 * contact fields are omitted, and ratings are never emitted.
 */
export function organizationSchema(settings) {
  const { company = {}, contact = {}, social = {} } = settings;
  const sameAs = Object.values(social).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl('/')}#organization`,
    name: company.name,
    url: siteUrl('/'),
    ...(company.description ? { description: company.description } : {}),
    ...(company.logo?.url ? { logo: company.logo.url, image: company.logo.url } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.address ? { address: contact.address } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.short_description,
    url: siteUrl(`/services/${service.slug}`),
    serviceType: service.category?.name,
    provider: { '@id': `${siteUrl('/')}#organization` },
  };
}

export function blogPostingSchema(post, settings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: siteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: siteUrl(`/blog/${post.slug}`),
    datePublished: post.published_at,
    dateModified: post.updated_at,
    ...(post.image?.url ? { image: post.image.url } : {}),
    author: post.author_name ? { '@type': 'Organization', name: post.author_name } : undefined,
    publisher: { '@type': 'Organization', name: settings.company?.name },
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: siteUrl(item.href) } : {}),
    })),
  };
}
