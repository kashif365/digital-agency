import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Highlight from '@/components/ui/Highlight';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { getSettings } from '@/lib/api';

export async function HeroShell({ breadcrumbs, image, children }) {
  const settings = await getSettings();
  const banner = image ?? settings.company?.banner;

  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      {banner ? <Image src={banner.url} alt="" fill preload sizes="100vw" className="-z-30 object-cover opacity-25" /> : null}
      <div className="backdrop-glow absolute inset-0 -z-20" aria-hidden="true" />
      <div className="backdrop-grid absolute inset-0 -z-10" aria-hidden="true" />
      <Container className="py-14 md:py-20 lg:py-24">
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
      <div className="mt-10 max-w-4xl">
        {data.eyebrow ? <Eyebrow dark>{data.eyebrow}</Eyebrow> : null}
        <h1 className="mt-5 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-6xl">
          <Highlight text={data.heading} dark />
        </h1>
        {data.lead ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{data.lead}</p> : null}
        {data.cta_label ? (
          <Button href={data.cta_url} arrow className="mt-9">
            {data.cta_label}
          </Button>
        ) : null}
      </div>
    </HeroShell>
  );
}
