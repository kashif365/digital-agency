import Image from 'next/image';
import { notFound } from 'next/navigation';
import PostCard from '@/components/blog/PostCard';
import CtaBanner from '@/components/home/CtaBanner';
import { HeroShell } from '@/components/home/PageHero';
import Container from '@/components/ui/Container';
import JsonLd from '@/components/ui/JsonLd';
import Prose from '@/components/ui/Prose';
import SectionHeading, { Eyebrow } from '@/components/ui/SectionHeading';
import { getPost, getSettings } from '@/lib/api';
import { blogPostingSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

// Renders each page on first visit, then serves it from the ISR cache.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPost(slug), getSettings()]);

  return post
    ? buildMetadata({
        seo: post.seo,
        settings,
        path: `/blog/${slug}`,
        title: post.title,
        type: 'article',
        extra: { publishedTime: post.published_at, modifiedTime: post.updated_at },
      })
    : {};
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPost(slug), getSettings()]);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd data={blogPostingSchema(post, settings)} />

      <HeroShell breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: post.title }]}>
        <div className="mt-10 max-w-4xl">
          {post.category ? <Eyebrow dark>{post.category.name}</Eyebrow> : null}
          <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white md:text-[3.5rem]">{post.title}</h1>
          <p className="mt-5 text-white/70">
            {[post.author_name, formatDate(post.published_at), `${post.read_minutes} min read`].filter(Boolean).join(' · ')}
          </p>
        </div>
      </HeroShell>

      <article className="py-16 md:py-20">
        <Container className="max-w-3xl">
          {post.image ? (
            <Image
              src={post.image.url}
              alt={post.image.alt}
              width={post.image.width ?? 1200}
              height={post.image.height ?? 700}
              preload
              sizes="(min-width: 800px) 768px, 100vw"
              className="mb-10 w-full rounded-[var(--radius-card)]"
            />
          ) : null}
          <Prose html={post.body} />
          {post.author_bio ? (
            <aside className="mt-12 rounded-[var(--radius-card)] bg-surface p-6">
              <p className="font-display text-lg font-medium text-heading">About {post.author_name}</p>
              <p className="mt-1.5 leading-relaxed text-muted">{post.author_bio}</p>
            </aside>
          ) : null}
        </Container>
      </article>

      {post.related.length > 0 ? (
        <section className="bg-surface py-20 md:py-28">
          <Container>
            <SectionHeading eyebrow="Keep reading" heading="Related articles" className="mb-12" />
            <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {post.related.map((related) => (
                <PostCard key={related.slug} post={related} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBanner
        data={{
          heading: 'Ready for marketing that *keeps growing*?',
          lead: 'Tell us about your goals and we will follow up to discuss the next steps for your business.',
          cta_label: 'Get a free consultation',
          cta_url: '/free-consultation',
        }}
      />
    </>
  );
}
