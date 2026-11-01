const API_URL = (process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

// Admin saves trigger an immediate refresh through the `cms` tag; this is the fallback.
const REVALIDATE_SECONDS = 300;

async function request(path, { allow404 = false } = {}) {
  const response = await fetch(`${API_URL}/api/v1${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: REVALIDATE_SECONDS, tags: ['cms'] },
  });

  if (allow404 && response.status === 404) {
    return null;
  }

  // Throwing keeps the last good page cached instead of replacing it with a broken one.
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${path}`);
  }

  return response.json();
}

async function single(path) {
  return (await request(path, { allow404: true }))?.data ?? null;
}

async function list(path) {
  return (await request(path)).data;
}

export const getSettings = () => list('/settings/public');
export const getPage = (slug) => single(`/pages/${encodeURIComponent(slug)}`);
export const getServices = ({ featured = false } = {}) => list(`/services${featured ? '?featured=1' : ''}`);
export const getService = (slug) => single(`/services/${encodeURIComponent(slug)}`);
export const getIndustries = () => list('/industries');
export const getIndustry = (slug) => single(`/industries/${encodeURIComponent(slug)}`);
export const getPortfolio = () => request('/portfolio');
export const getProject = (slug) => single(`/portfolio/${encodeURIComponent(slug)}`);
export const getPricing = () => list('/pricing');
export const getTestimonials = () => list('/testimonials');
export const getFaqs = () => list('/faqs');
export const getPost = (slug) => single(`/blog/${encodeURIComponent(slug)}`);
export const getBlogCategories = () => list('/blog-categories');
export const getSitemapEntries = () => list('/sitemap');

export function getPosts({ page = 1, category, perPage } = {}) {
  const query = new URLSearchParams();

  if (page > 1) query.set('page', page);
  if (category) query.set('category', category);
  if (perPage) query.set('per_page', perPage);

  const suffix = query.size ? `?${query}` : '';

  return request(`/blog${suffix}`);
}
