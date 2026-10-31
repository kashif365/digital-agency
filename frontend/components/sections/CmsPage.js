import { notFound } from 'next/navigation';
import {
  getFaqs,
  getIndustries,
  getPage,
  getPortfolio,
  getPosts,
  getServices,
  getSettings,
  getTestimonials,
} from '@/lib/api';
import SectionRenderer from './SectionRenderer';

/** Fetches only what the page's sections need, so an edit to the layout never over-fetches. */
async function loadContext(sections, settings) {
  const has = (...types) => sections.some((section) => types.includes(section.type));
  const showAll = sections.some((section) => section.type === 'services_grid' && section.data.show_all);

  const [allServices, featured, industries, portfolio, testimonials, faqs, posts] = await Promise.all([
    has('hero', 'consultation_form') || showAll ? getServices() : [],
    has('services_grid') && !showAll ? getServices({ featured: true }) : [],
    has('industries_grid') ? getIndustries() : [],
    has('portfolio_grid') ? getPortfolio() : null,
    has('testimonials') ? getTestimonials() : [],
    has('faqs') ? getFaqs() : [],
    has('blog_latest') ? getPosts({ perPage: 3 }) : null,
  ]);

  return { settings, allServices, featured, industries, portfolio, testimonials, faqs, posts: posts?.data ?? [] };
}

export default async function CmsPage({ slug }) {
  const [page, settings] = await Promise.all([getPage(slug), getSettings()]);

  if (!page) {
    notFound();
  }

  const context = await loadContext(page.sections, settings);

  return <SectionRenderer sections={page.sections} page={page} context={context} />;
}
