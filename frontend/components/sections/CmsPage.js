import { notFound } from 'next/navigation';
import {
  getFaqs,
  getIndustries,
  getPage,
  getPortfolio,
  getPosts,
  getPricing,
  getServices,
  getSettings,
  getTestimonials,
} from '@/lib/api';
import SectionRenderer from './SectionRenderer';

/** Fetches only what the page's sections need, so an edit to the layout never over-fetches. */
async function loadContext(sections, settings) {
  const has = (...types) => sections.some((section) => types.includes(section.type));

  const [allServices, industries, portfolio, pricing, testimonials, faqs, posts] = await Promise.all([
    has('hero', 'consultation_form', 'services_grid') ? getServices() : [],
    has('industries_grid') ? getIndustries() : [],
    has('portfolio_grid') ? getPortfolio() : null,
    has('pricing') ? getPricing() : [],
    has('testimonials') ? getTestimonials() : [],
    has('faqs') ? getFaqs() : [],
    has('blog_latest') ? getPosts({ perPage: 3 }) : null,
  ]);

  return { settings, allServices, industries, portfolio, pricing, testimonials, faqs, posts: posts?.data ?? [] };
}

export default async function CmsPage({ slug }) {
  const [page, settings] = await Promise.all([getPage(slug), getSettings()]);

  if (!page) {
    notFound();
  }

  const context = await loadContext(page.sections, settings);

  return <SectionRenderer sections={page.sections} page={page} context={context} />;
}
