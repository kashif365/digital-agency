import PostCard from '@/components/blog/PostCard';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

export default function BlogLatest({ data, posts }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-14 md:py-20">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} center className="mb-11" />
        <Reveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Reveal>
        {data.cta_label ? (
          <div className="mt-11 text-center">
            <Button href={data.cta_url} variant="dark" arrow>
              {data.cta_label}
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
