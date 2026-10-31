import Link from '@/components/ui/AppLink';

/** Vertical tab on the page edge, keeping the main call to action in reach. */
export default function SideTab({ settings }) {
  if (!settings.cta?.header_url) {
    return null;
  }

  return (
    <Link
      href={settings.cta.header_url}
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 rounded-l-xl border border-r-0 border-brand-bright bg-dark px-3 py-5 font-display text-sm font-bold uppercase tracking-wider text-white transition hover:bg-brand lg:block"
    >
      <span className="block rotate-180 [writing-mode:vertical-rl]">Free Consultation</span>
    </Link>
  );
}
