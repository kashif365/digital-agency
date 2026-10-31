export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(iso) {
  if (!iso) return '';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}

export function siteUrl(path = '') {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

  return `${base}${path}`;
}

/** Groups API services into mega menu columns, keeping the API's order. */
export function groupByCategory(services) {
  const groups = new Map();

  for (const service of services) {
    const key = service.category?.slug ?? 'other';

    if (!groups.has(key)) {
      groups.set(key, { name: service.category?.name ?? 'Services', slug: key, services: [] });
    }

    groups.get(key).services.push(service);
  }

  return [...groups.values()];
}
