import Container from '@/components/ui/Container';
import IndustriesCarousel from './IndustriesCarousel';

export default function IndustriesGrid({ data, industries }) {
  if (industries.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20">
      <Container>
        <IndustriesCarousel eyebrow={data.eyebrow} heading={data.heading} industries={industries} />
      </Container>
    </section>
  );
}
