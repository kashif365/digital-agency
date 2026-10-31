import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import TestimonialCarousel from './TestimonialCarousel';

/** Stays unpublished until the client has approved at least one testimonial. */
export default function Testimonials({ data, testimonials }) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-surface py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} className="mb-12" />
        <TestimonialCarousel testimonials={testimonials} />
      </Container>
    </section>
  );
}
