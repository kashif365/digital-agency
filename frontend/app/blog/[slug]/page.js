import Image from 'next/image';
import { notFound } from 'next/navigation';
import PostCard from '@/components/blog/PostCard';
import CtaBanner from '@/components/home/CtaBanner';
import { HeroShell } from '@/components/home/PageHero';
import Container from '@/components/ui/Container';
import JsonLd from '@/components/ui/JsonLd';
import Prose from '@/components/ui/Prose';
import SectionHeading from '@/components/ui/SectionHeading';
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
        <div className="mt-7 max-w-3xl">
          {post.category ? <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-light">{post.category.name}</p> : null}
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.12] text-white md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-white/70">
            {[post.author_name, formatDate(post.published_at), `${post.read_minutes} min read`].filter(Boolean).join(' · ')}
          </p>
        </div>
      </HeroShell>

      <article className="py-14 md:py-20">
        <Container className="max-w-3xl">
          {post.image ? (
            <Image
              src={post.image.url}
              alt={post.image.alt}
              width={post.image.width ?? 1200}
              height={post.image.height ?? 700}
              priority
              sizes="(min-width: 800px) 768px, 100vw"
              className="mb-10 w-full rounded-[var(--radius-card)]"
            />
          ) : null}
          <Prose html={post.body} />
          {post.author_bio ? (
            <aside className="mt-12 rounded-[var(--radius-card)] bg-surface p-6">
              <p className="font-display font-extrabold text-heading">About {post.author_name}</p>
              <p className="mt-1.5 leading-relaxed text-muted">{post.author_bio}</p>
            </aside>
          ) : null}
        </Container>
      </article>

      {post.related.length > 0 ? (
        <section className="bg-surface py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Keep Reading" heading="Related Articles" className="mb-10" />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {post.related.map((related) => (
                <PostCard key={related.slug} post={related} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBanner
        last
        data={{
          heading: 'Ready to Take Your Digital Presence to the Next Level?',
          lead: 'Tell us about your goals and we will follow up to discuss the next steps for your business.',
          cta_label: "Let's Talk About Your Project",
          cta_url: '/free-consultation',
        }}
      />
    </>
  );
}
