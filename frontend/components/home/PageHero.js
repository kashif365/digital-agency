import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Highlight from '@/components/ui/Highlight';
import { getSettings } from '@/lib/api';

export async function HeroShell({ breadcrumbs, image, children }) {
  const settings = await getSettings();
  const banner = image ?? settings.company?.banner;

  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      {banner ? <Image src={banner.url} alt="" fill priority sizes="100vw" className="-z-20 object-cover" /> : null}
      <div className="absolute inset-0 -z-10 bg-night/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-night/95 lg:via-night/85 lg:to-night/60" aria-hidden="true" />
      <Container className="py-14 md:py-20">
        <div className="animate-rise">
          <Breadcrumbs items={breadcrumbs} />
          {children}
        </div>
      </Container>
    </section>
  );
}

export default function PageHero({ data, page }) {
  return (
    <HeroShell breadcrumbs={[{ label: page.title }]} image={data.image}>
      <div className="mt-7 max-w-3xl">
        {data.eyebrow ? (
          <p className="inline-flex rounded-full bg-brand px-5 py-2 font-display text-[0.8125rem] font-extrabold uppercase tracking-[0.14em] text-white">{data.eyebrow}</p>
        ) : null}
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.12] text-white md:text-5xl">
          <Highlight text={data.heading} dark />
        </h1>
        {data.lead ? <p className="mt-5 text-lg font-medium leading-relaxed text-white/85">{data.lead}</p> : null}
        {data.cta_label ? (
          <Button href={data.cta_url} arrow className="mt-8">
            {data.cta_label}
          </Button>
        ) : null}
      </div>
    </HeroShell>
  );
}
