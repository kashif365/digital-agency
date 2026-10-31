import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from '@/components/ui/AppLink';
import { notFound } from 'next/navigation';
import PostCard from '@/components/blog/PostCard';
import PageHero from '@/components/home/PageHero';
import Container from '@/components/ui/Container';
import { getBlogCategories, getPage, getPosts, getSettings } from '@/lib/api';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

function href({ page, category }) {
  const query = new URLSearchParams();

  if (category) query.set('category', category);
  if (page > 1) query.set('page', page);

  return query.size ? `/blog?${query}` : '/blog';
}

function parse(searchParams) {
  const page = Number.parseInt(searchParams.page, 10);

  return {
    page: page > 0 ? page : 1,
    category: typeof searchParams.category === 'string' ? searchParams.category : undefined,
  };
}

export async function generateMetadata({ searchParams }) {
  const filters = parse(await searchParams);
  const [page, settings] = await Promise.all([getPage('blog'), getSettings()]);

  return buildMetadata({ seo: page?.seo, settings, path: href(filters), title: 'Blog' });
}

export default async function BlogPage({ searchParams }) {
  const filters = parse(await searchParams);
  const [page, categories, posts] = await Promise.all([getPage('blog'), getBlogCategories(), getPosts(filters)]);

  if (!page) {
    notFound();
  }

  const hero = page.sections.find((section) => section.type === 'page_hero');
  const { current_page: current, last_page: last } = posts.meta;

  if (filters.page > 1 && posts.data.length === 0) {
    notFound();
  }

  return (
    <>
      {hero ? <PageHero data={hero.data} page={page} /> : null}

      <section className="bg-surface py-14 md:py-20">
        <Container>
          {categories.length > 0 ? (
            <ul className="mb-10 flex flex-wrap gap-2">
              {[{ name: 'All', slug: undefined }, ...categories].map((category) => (
                <li key={category.name}>
                  <Link
                    href={href({ page: 1, category: category.slug })}
                    aria-current={filters.category === category.slug ? 'true' : undefined}
                    className={cn(
                      'block rounded-full border px-4 py-2 text-sm font-semibold transition',
                      filters.category === category.slug ? 'border-brand bg-brand text-white' : 'border-line bg-white text-heading hover:border-brand hover:text-brand'
                    )}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          {posts.data.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.data.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-lg text-muted">No articles have been published here yet.</p>
          )}

          {last > 1 ? (
            <nav aria-label="Blog pages" className="mt-12 flex items-center justify-center gap-4">
              {current > 1 ? (
                <Link href={href({ ...filters, page: current - 1 })} className="inline-flex items-center gap-1 font-semibold text-brand">
                  <ChevronLeft className="size-4" aria-hidden="true" />
                  Newer
                </Link>
              ) : null}
              <span className="text-sm text-muted">
                Page {current} of {last}
              </span>
              {current < last ? (
                <Link href={href({ ...filters, page: current + 1 })} className="inline-flex items-center gap-1 font-semibold text-brand">
                  Older
                  <ChevronRight className="size-4" aria-hidden="true" />
                </Link>
              ) : null}
            </nav>
          ) : null}
        </Container>
      </section>
    </>
  );
}
