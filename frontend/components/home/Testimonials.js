import Container from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/SectionHeading';
import TestimonialCarousel from './TestimonialCarousel';

/** Stays unpublished until the client has approved at least one testimonial. */
export default function Testimonials({ data, testimonials }) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-line py-24 md:py-36">
      <Container>
        <Eyebrow className="mb-10">{data.heading || data.eyebrow || 'Client words'}</Eyebrow>
        <TestimonialCarousel testimonials={testimonials} />
      </Container>
    </section>
  );
}
