import Image from 'next/image';
import Link from '@/components/ui/AppLink';
import { cn } from '@/lib/utils';

/** Three rising chevrons: an evergreen, and a line going up. */
export function BrandMark({ className }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.5 12 16 6.5l5.5 5.5M8 18.5l8-8 8 8M5.5 25 16 14.5 26.5 25" />
    </svg>
  );
}

/** Shows the uploaded logo, or the wordmark until one has been added. */
export default function Logo({ company, dark = false, className }) {
  return (
    <Link href="/" className={cn('inline-flex items-center gap-2.5', className)} aria-label={`${company?.name} home`}>
      {company?.logo?.url ? (
        <Image
          src={company.logo.url}
          alt={company.logo.alt}
          width={company.logo.width ?? 180}
          height={company.logo.height ?? 48}
          sizes="200px"
          className="h-10 w-auto"
          preload
        />
      ) : (
        <>
          <span className="grid size-9 place-items-center rounded-[0.7rem] bg-brand text-white">
            <BrandMark className="size-7" />
          </span>
          <span className={cn('whitespace-nowrap font-display text-[1.375rem] font-semibold tracking-[-0.03em]', dark ? 'text-white' : 'text-heading')}>
            {company?.name}
          </span>
        </>
      )}
    </Link>
  );
}
