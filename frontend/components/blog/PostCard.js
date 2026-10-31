import Image from 'next/image';
import Link from '@/components/ui/AppLink';
import CoverArt from '@/components/ui/CoverArt';
import { formatDate } from '@/lib/utils';

const CATEGORY_ICONS = { seo: 'search', 'paid-advertising': 'mouse-pointer-click', strategy: 'compass', websites: 'monitor-smartphone', 'social-media': 'share-2' };

export default function PostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)]">
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
      <p className="mt-5 text-sm text-muted">{[post.category?.name, formatDate(post.published_at)].filter(Boolean).join(' · ')}</p>
      <h3 className="mt-2 text-[1.375rem] font-medium leading-tight text-heading transition group-hover:text-brand">{post.title}</h3>
    </Link>
  );
}
