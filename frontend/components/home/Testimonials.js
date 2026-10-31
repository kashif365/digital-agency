import Container from '@/components/ui/Container';
import { GreenRule } from '@/components/ui/SectionHeading';
import TestimonialCarousel from './TestimonialCarousel';

/** Stays unpublished until the client has approved at least one testimonial. */
export default function Testimonials({ data, testimonials }) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-[1.75rem] font-medium leading-tight text-heading md:text-[2.25rem]">{data.heading}</h2>
          <GreenRule center />
        </div>
        <TestimonialCarousel testimonials={testimonials} />
      </Container>
    </section>
  );
}
