import BlogLatest from '@/components/home/BlogLatest';
import Comparison from '@/components/home/Comparison';
import ContactSection from '@/components/home/ContactSection';
import ConsultationSection from '@/components/home/ConsultationSection';
import CtaBanner from '@/components/home/CtaBanner';
import DualCta from '@/components/home/DualCta';
import FaqSection from '@/components/home/FaqSection';
import Hero from '@/components/home/Hero';
import IndustriesGrid from '@/components/home/IndustriesGrid';
import IntroSection from '@/components/home/IntroSection';
import PageHero from '@/components/home/PageHero';
import PortfolioGrid from '@/components/home/PortfolioGrid';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import RichText from '@/components/home/RichText';
import ServicesGrid from '@/components/home/ServicesGrid';
import SplitSection from '@/components/home/SplitSection';
import Statement from '@/components/home/Statement';
import Testimonials from '@/components/home/Testimonials';
import ValueGrid from '@/components/home/ValueGrid';

const SECTIONS = {
  hero: Hero,
  page_hero: PageHero,
  statement: Statement,
  intro: IntroSection,
  dual_cta: DualCta,
  split: SplitSection,
  services_grid: ServicesGrid,
  value_grid: ValueGrid,
  process: ProcessTimeline,
  comparison: Comparison,
  industries_grid: IndustriesGrid,
  portfolio_grid: PortfolioGrid,
  testimonials: Testimonials,
  cta_banner: CtaBanner,
  faqs: FaqSection,
  blog_latest: BlogLatest,
  rich_text: RichText,
  consultation_form: ConsultationSection,
  contact_form: ContactSection,
};

export default function SectionRenderer({ sections, page, context }) {
  return sections.map((section) => {
    const Section = SECTIONS[section.type];

    return Section ? <Section key={section.id} data={section.data} page={page} {...context} /> : null;
  });
}
