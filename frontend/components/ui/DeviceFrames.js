import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Browser chrome around a website screenshot. With `scroll`, a tall full-page capture
 * scrolls inside a fixed-height window, so the whole page can be browsed in place.
 */
export function BrowserFrame({ image, label, scroll = false, preload = false, sizes = '(min-width: 1360px) 1280px, 100vw', className }) {
  return (
    <figure className={cn('overflow-hidden rounded-[var(--radius-card)] border border-forest/10 bg-paper shadow-[0_30px_60px_-36px_rgb(17_44_37/0.45)]', className)}>
      <div className="flex items-center gap-1.5 border-b border-forest/10 bg-stone/70 px-4 py-2.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-forest/15" />
        <span className="size-2.5 rounded-full bg-forest/15" />
        <span className="size-2.5 rounded-full bg-forest/15" />
        {label ? <span className="ml-3 truncate rounded-full bg-paper px-3 py-0.5 text-xs text-muted">{label}</span> : null}
      </div>
      {scroll ? (
        <div tabIndex={0} role="region" aria-label={`${image.alt}. Scroll to see the full page.`} className="max-h-[42rem] overflow-y-auto overscroll-contain">
          <Image src={image.url} alt={image.alt} width={image.width ?? 1440} height={image.height ?? 900} sizes={sizes} className="block h-auto w-full" />
        </div>
      ) : (
        <Image src={image.url} alt={image.alt} width={image.width ?? 1440} height={image.height ?? 900} preload={preload} loading={preload ? 'eager' : undefined} sizes={sizes} className="block h-auto w-full" />
      )}
    </figure>
  );
}

/** A phone outline around a mobile screenshot, cropped to the first screen. */
export function PhoneFrame({ image, sizes = '320px', preload = false, className }) {
  return (
    <figure className={cn('overflow-hidden rounded-[2rem] border-[6px] border-charcoal bg-charcoal shadow-[0_30px_60px_-30px_rgb(17_44_37/0.6)]', className)}>
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1.6rem] bg-paper">
        <Image src={image.url} alt={image.alt} fill preload={preload} sizes={sizes} className="object-cover object-top" />
      </div>
    </figure>
  );
}

/** Picks the right frame for a gallery entry: desktop screens get browser chrome, phones a phone. */
export function WorkImage({ entry, sizes, className }) {
  if (entry.kind === 'mobile') {
    return <PhoneFrame image={entry.image} className={cn('w-full max-w-[20rem]', className)} />;
  }

  if (entry.kind === 'desktop') {
    return <BrowserFrame image={entry.image} scroll={(entry.image.height ?? 0) > (entry.image.width ?? 1) * 0.9} sizes={sizes} className={className} />;
  }

  return (
    <div className={cn('overflow-hidden rounded-[var(--radius-card)] border border-forest/10 bg-stone', className)}>
      <Image src={entry.image.url} alt={entry.image.alt} width={entry.image.width ?? 1440} height={entry.image.height ?? 900} sizes={sizes} className="block h-auto w-full" />
    </div>
  );
}
