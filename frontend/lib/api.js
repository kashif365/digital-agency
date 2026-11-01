
const API_URL = (
  process.env.API_INTERNAL_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://127.0.0.1:8000'
).replace(/\/$/, '');

const REVALIDATE_SECONDS = 300;
const MAX_ATTEMPTS = 3;
const REQUEST_TIMEOUT_MS = 15000;

const RETRYABLE_STATUS = new Set([429, 502, 503, 504]);

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function request(path, { allow404 = false } = {}) {
  const url = `${API_URL}/api/v1${path}`;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
        next: {
          revalidate: REVALIDATE_SECONDS,
          tags: ['cms'],
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (allow404 && response.status === 404) {
        return null;
      }

      if (response.ok) {
        return await response.json();
      }

      const responseText = (await response.text()).slice(0, 500);

      console.error(
        `[API] ${path} | Status: ${response.status} | Attempt: ${attempt}/${MAX_ATTEMPTS} | Body: ${responseText}`
      );

      if (
        !RETRYABLE_STATUS.has(response.status) ||
        attempt === MAX_ATTEMPTS
      ) {
        throw new Error(
          `API request failed: ${response.status} ${path}`
        );
      }

    } catch (error) {
      // Permanent HTTP errors must not be retried.
      if (
        error.message?.startsWith('API request failed:') ||
        attempt === MAX_ATTEMPTS
      ) {
        throw error;
      }

      console.warn(
        `[API] Network error: ${path}, attempt ${attempt}/${MAX_ATTEMPTS}: ${error.message}`
      );
    }

    const delay = 1000 * 2 ** (attempt - 1);

    console.warn(
      `[API] Retrying ${path} in ${delay}ms`
    );

    await sleep(delay);
  }
}

async function single(path) {
  return (await request(path, { allow404: true }))?.data ?? null;
}

async function list(path) {
  return (await request(path)).data;
}

export const getSettings = () => list('/settings/public');

export const getPage = (slug) =>
  single(`/pages/${encodeURIComponent(slug)}`);

export const getServices = ({ featured = false } = {}) =>
  list(`/services${featured ? '?featured=1' : ''}`);

export const getService = (slug) =>
  single(`/services/${encodeURIComponent(slug)}`);

export const getIndustries = () => list('/industries');

export const getIndustry = (slug) =>
  single(`/industries/${encodeURIComponent(slug)}`);

export const getPortfolio = () => request('/portfolio');

export const getProject = (slug) =>
  single(`/portfolio/${encodeURIComponent(slug)}`);

export const getPricing = () => list('/pricing');

export const getTestimonials = () => list('/testimonials');

export const getFaqs = () => list('/faqs');

export const getPost = (slug) =>
  single(`/blog/${encodeURIComponent(slug)}`);

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
