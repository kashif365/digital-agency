import PostCard from '@/components/blog/PostCard';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Stagger from '@/components/ui/Stagger';

export default function BlogLatest({ data, posts }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <SectionHeading eyebrow={data.eyebrow} heading={data.heading} lead={data.lead} className="lg:col-span-8" />
          {data.cta_label ? (
            <div className="lg:col-span-4 lg:text-right">
              <Button href={data.cta_url} variant="outline" arrow>
                {data.cta_label}
              </Button>
            </div>
          ) : null}
        </div>
        <Stagger className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
