import { ArrowLeft, ArrowRight } from 'lucide-react';
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

  // The newest article leads the first page; the rest follow in a grid.
  const [lead, ...rest] = current === 1 ? posts.data : [null, ...posts.data];

  return (
    <>
      {hero ? <PageHero data={hero.data} page={page} /> : null}

      <section className="pb-24 pt-10 md:pb-32">
        <Container>
          {categories.length > 0 ? (
            <nav aria-label="Article categories" className="mb-14 border-b border-line">
              <ul className="-mb-px flex gap-7 overflow-x-auto [scrollbar-width:none]">
                {[{ name: 'All', slug: undefined }, ...categories].map((category) => {
                  const active = filters.category === category.slug;

                  return (
                    <li key={category.name} className="shrink-0">
                      <Link
                        href={href({ page: 1, category: category.slug })}
                        aria-current={active ? 'page' : undefined}
                        className={cn('block border-b-2 py-4 text-[0.9375rem] font-medium transition', active ? 'border-clay text-forest' : 'border-transparent text-muted hover:text-forest')}
                      >
                        {category.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : null}

          {posts.data.length > 0 ? (
            <>
              {lead ? <PostCard post={lead} featured /> : null}
              {rest.length > 0 ? (
                <div className={cn('grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3', lead && 'mt-20 border-t border-line pt-14')}>
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <p className="py-10 text-lg text-muted">No articles have been published here yet.</p>
          )}

          {last > 1 ? (
            <nav aria-label="Blog pages" className="mt-16 flex items-center justify-between border-t border-line pt-6">
              {current > 1 ? (
                <Link href={href({ ...filters, page: current - 1 })} className="inline-flex items-center gap-2 font-semibold text-forest">
                  <ArrowLeft className="size-4 text-clay-deep" aria-hidden="true" />
                  Newer
                </Link>
              ) : (
                <span />
              )}
              <span className="text-sm text-muted">
                Page {current} of {last}
              </span>
              {current < last ? (
                <Link href={href({ ...filters, page: current + 1 })} className="inline-flex items-center gap-2 font-semibold text-forest">
                  Older
                  <ArrowRight className="size-4 text-clay-deep" aria-hidden="true" />
                </Link>
              ) : (
                <span />
              )}
            </nav>
          ) : null}
        </Container>
      </section>
    </>
  );
}
