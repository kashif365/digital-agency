import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Highlight from '@/components/ui/Highlight';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { getSettings } from '@/lib/api';
import { cn } from '@/lib/utils';

/** Shared header for inner pages. An uploaded image appears as a full-width strip below the title. */
export function HeroShell({ breadcrumbs, image, children, className }) {
  return (
    <section className={cn('border-b border-line', className)}>
      <Container className="pb-16 pt-8 md:pb-24 md:pt-12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-14 animate-rise md:mt-24">{children}</div>
      </Container>
      {image ? (
        <Container className="pb-16 md:pb-24">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] bg-stone md:aspect-[21/8]">
            <Image src={image.url} alt={image.alt ?? ''} fill preload sizes="(min-width: 1360px) 1280px, 100vw" className="object-cover" />
          </div>
        </Container>
      ) : null}
    </section>
  );
}

/** Title on the left, the supporting line held to the right at the baseline. */
export function HeroTitle({ eyebrow, title, lead, children, highlight = true }) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
      <div className="lg:col-span-8">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className={cn('type-h1 max-w-4xl text-forest', eyebrow && 'mt-6')}>{highlight ? <Highlight text={title} /> : title}</h1>
      </div>
      {lead || children ? (
        <div className="lg:col-span-4 lg:pb-2">
          {lead ? <p className="type-lead text-muted">{lead}</p> : null}
          {children}
        </div>
      ) : null}
    </div>
  );
}

/** CMS page header. Falls back to the site's default banner; detail pages carry their own visuals instead. */
export default async function PageHero({ data, page }) {
  const settings = await getSettings();

  return (
    <HeroShell breadcrumbs={[{ label: page.title }]} image={data.image ?? settings.company?.banner}>
      <HeroTitle eyebrow={data.eyebrow} title={data.heading} lead={data.lead}>
        {data.cta_label ? (
          <Button href={data.cta_url} arrow className="mt-8">
            {data.cta_label}
          </Button>
        ) : null}
      </HeroTitle>
    </HeroShell>
  );
}
