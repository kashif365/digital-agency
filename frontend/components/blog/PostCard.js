import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/ui/AppLink';
import CoverArt from '@/components/ui/CoverArt';
import { cn, formatDate } from '@/lib/utils';

function Meta({ post, className }) {
  const parts = [post.category?.name, formatDate(post.published_at), post.read_minutes ? `${post.read_minutes} min read` : null].filter(Boolean);

  return <p className={cn('label text-muted', className)}>{parts.join(' · ')}</p>;
}

export function PostVisual({ post, sizes, className }) {
  return (
    <div className={cn('relative overflow-hidden rounded-[var(--radius-card)] bg-stone', className)}>
      {post.image ? (
        <Image src={post.image.url} alt={post.image.alt} fill sizes={sizes} className="object-cover transition duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]" />
      ) : (
        <CoverArt seed={post.slug} tone="stone" className="absolute inset-0 size-full" />
      )}
    </div>
  );
}

export default function PostCard({ post, featured = false }) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <PostVisual post={post} sizes="(min-width: 1024px) 760px, 100vw" className="aspect-[3/2] lg:col-span-7" />
        <div className="lg:col-span-5">
          <Meta post={post} />
          <h2 className="type-h2 mt-4 text-forest">
            <span className="link-underline">{post.title}</span>
          </h2>
          {post.excerpt ? <p className="type-lead mt-5 text-muted">{post.excerpt}</p> : null}
          <span className="mt-8 inline-flex items-center gap-2 font-semibold text-forest">
            Read the article
            <ArrowRight className="size-4 text-clay-deep transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
      <PostVisual post={post} sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw" className="aspect-[3/2]" />
      <Meta post={post} className="mt-5" />
      <h3 className="mt-2.5 font-display text-[1.5rem] leading-tight text-forest">
        <span className="link-underline">{post.title}</span>
      </h3>
    </Link>
  );
}

/** Text-only row for article indexes. */
export function PostRow({ post }) {
  return (
    <li className="border-b border-line">
      <Link href={`/blog/${post.slug}`} className="group grid gap-2 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8">
        <div>
          <Meta post={post} />
          <h3 className="mt-2.5 font-display text-[1.5rem] leading-tight text-forest transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-2">
            {post.title}
          </h3>
        </div>
        <ArrowRight className="mt-1 hidden size-5 text-clay-deep transition-transform duration-300 group-hover:translate-x-1 sm:block" aria-hidden="true" />
      </Link>
    </li>
  );
}
