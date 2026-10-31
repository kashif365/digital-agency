import Image from 'next/image';
import Link from '@/components/ui/AppLink';
import { cn } from '@/lib/utils';

/** Shows the uploaded logo, or a clean wordmark until one has been added. */
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
          className="h-11 w-auto"
          priority
        />
      ) : (
        <>
          <span className="grid size-10 place-items-center rounded-xl bg-brand text-white" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 16l5.5-5.5 3.5 3.5L20 7" />
            </svg>
          </span>
          <span className={cn('whitespace-nowrap font-display text-xl font-extrabold tracking-tight', dark ? 'text-white' : 'text-heading')}>
            {company?.name}
          </span>
        </>
      )}
    </Link>
  );
}
