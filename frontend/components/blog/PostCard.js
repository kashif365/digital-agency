import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/ui/AppLink';
import CoverArt from '@/components/ui/CoverArt';
import { formatDate } from '@/lib/utils';

const CATEGORY_ICONS = { seo: 'search', 'paid-advertising': 'mouse-pointer-click', strategy: 'compass', websites: 'monitor-smartphone', 'social-media': 'share-2' };

export default function PostCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_6px_28px_rgb(12_14_26/0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        {post.image ? (
          <Image
            src={post.image.url}
            alt={post.image.alt}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <CoverArt seed={post.slug} icon={CATEGORY_ICONS[post.category?.slug] ?? 'file-text'} className="size-full" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="flex-1 font-display text-xl font-medium leading-snug text-ink transition group-hover:text-brand">{post.title}</h3>
        <p className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-sm text-muted">
          <span>Published: {formatDate(post.published_at)}</span>
          <span className="inline-flex shrink-0 items-center gap-1 font-medium text-ink">
            Read More
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </p>
      </div>
    </Link>
  );
}
