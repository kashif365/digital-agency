import PostCard from '@/components/blog/PostCard';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Stagger from '@/components/ui/Stagger';
import SectionHeading from '@/components/ui/SectionHeading';

export default function BlogLatest({ data, posts }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} />
          {data.cta_label ? (
            <Button href={data.cta_url} variant="outline" arrow className="shrink-0 self-start lg:self-auto">
              {data.cta_label}
            </Button>
          ) : null}
        </div>
        <Stagger className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
