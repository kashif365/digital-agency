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

  const facts = [
    ['Written by', post.author_name],
    ['Published', formatDate(post.published_at)],
    ['Reading time', `${post.read_minutes} minutes`],
  ].filter(([, value]) => value);

  return (
    <>
      <JsonLd data={blogPostingSchema(post, settings)} />

      <HeroShell breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: post.title }]}>
        <div className="max-w-5xl">
          {post.category ? <Eyebrow>{post.category.name}</Eyebrow> : null}
          <h1 className="type-h1 mt-6 text-forest">{post.title}</h1>
          {post.excerpt ? <p className="type-lead mt-7 max-w-2xl text-muted">{post.excerpt}</p> : null}
        </div>
      </HeroShell>

      <article className="pb-24 pt-12 md:pb-32 md:pt-16">
        <Container>
          {post.image ? (
            <Image
              src={post.image.url}
              alt={post.image.alt}
              width={post.image.width ?? 1600}
              height={post.image.height ?? 900}
              preload
              sizes="(min-width: 1360px) 1280px, 100vw"
              className="mb-14 aspect-[16/8] w-full rounded-[var(--radius-card)] object-cover md:mb-20"
            />
          ) : null}

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <aside className="lg:col-span-3">
              <dl className="space-y-5 border-t border-forest pt-5 lg:sticky lg:top-32">
                {facts.map(([label, value]) => (
                  <div key={label}>
                    <dt className="label text-muted">{label}</dt>
                    <dd className="mt-1.5 text-forest">{value}</dd>
                  </div>
                ))}
              </dl>
            </aside>

            <div className="lg:col-span-8 lg:col-start-5">
              <Prose html={post.body} className="max-w-[68ch] [&>p:first-child]:font-display [&>p:first-child]:text-[1.375rem] [&>p:first-child]:leading-snug [&>p:first-child]:text-forest" />
              {post.author_bio ? (
                <aside className="mt-16 max-w-[68ch] border-t border-forest pt-6">
                  <p className="label text-muted">About the author</p>
                  <p className="mt-3 font-display text-xl text-forest">{post.author_name}</p>
                  <p className="mt-2 leading-relaxed text-muted">{post.author_bio}</p>
                </aside>
              ) : null}
            </div>
          </div>
        </Container>
      </article>

      {post.related.length > 0 ? (
        <section className="border-t border-line py-24 md:py-32">
          <Container>
            <SectionHeading eyebrow="Keep reading" heading="Related *articles*" className="mb-14" />
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {post.related.map((related) => (
                <PostCard key={related.slug} post={related} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBanner
        data={{
          heading: 'Want a second opinion on *your marketing*?',
          lead: 'Tell us what you are working on. We will take a look and follow up with straight answers.',
          cta_label: 'Get a free consultation',
          cta_url: '/free-consultation',
        }}
      />
    </>
  );
}
