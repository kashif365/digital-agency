import { Check } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { BrowserFrame, PhoneFrame } from '@/components/ui/DeviceFrames';
import Highlight from '@/components/ui/Highlight';
import WaveLines from '@/components/ui/WaveLines';
import { SOCIAL_LABELS, SOCIAL_PATHS } from '@/components/ui/SocialIcons';
import { Eyebrow } from '@/components/ui/SectionHeading';

const POINTS = ['Website design and development', 'SEO and local search', 'Paid ads, social media, and email'];

function Tile({ item, className }) {
  return (
    <figure className={className}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-sm)] bg-stone">
        <Image src={item.image.url} alt={item.image.alt} fill sizes="240px" className="object-cover object-left-top" />
      </div>
      <figcaption className="mt-2 text-xs leading-tight text-ivory/75">
        <span className="font-semibold text-ivory">{item.title}</span> · {item.text}
      </figcaption>
    </figure>
  );
}

/** A collage of real screens: a desktop site, a phone, and two smaller pieces of work. */
function WorkCollage({ items, note }) {
  const [desktop, phone, ...rest] = items;

  return (
    <div className="relative">
      <div className="absolute inset-y-6 -right-5 left-10 rounded-[var(--radius-card)] bg-forest sm:-right-8 lg:-right-12 lg:inset-y-10" aria-hidden="true" />
      <div className="relative pb-10 pl-4 pt-2 sm:pl-0">
        {desktop ? <BrowserFrame image={desktop.image} label={desktop.text} preload sizes="(min-width: 1024px) 680px, 92vw" className="ml-auto w-[92%]" /> : null}
        {phone ? <PhoneFrame image={phone.image} preload sizes="180px" className="absolute -bottom-2 left-0 w-[28%] max-w-[11rem]" /> : null}
      </div>
      {rest.length ? (
        <div className="relative ml-[34%] grid grid-cols-2 gap-4 pb-8 pr-2 sm:pr-0">
          {rest.slice(0, 2).map((item) => (
            <Tile key={item.title} item={item} />
          ))}
        </div>
      ) : null}
      {note ? <p className="relative mt-4 text-right text-sm text-muted">{note}</p> : null}
    </div>
  );
}

// Shown as plain, non-clickable icons until the business adds real profile links in Site Settings.
const PLACEHOLDER_PROFILES = ['facebook', 'instagram', 'linkedin', 'x'];

const ICON = 'grid size-10 place-items-center rounded-full border border-forest/15 bg-paper text-forest';

/** Configured profiles as links. With none configured, the default set is shown as icons only. */
function SocialLinks({ social, vertical = false }) {
  const configured = Object.keys(SOCIAL_PATHS).filter((key) => social?.[key]);
  const linked = configured.length > 0;
  const keys = linked ? configured : PLACEHOLDER_PROFILES;

  return (
    <div className={vertical ? 'flex flex-col items-center gap-5' : 'flex items-center gap-4'}>
      <p className={vertical ? 'label text-muted [writing-mode:vertical-rl]' : 'label text-muted'} aria-hidden={linked ? undefined : true}>
        Follow us
      </p>
      <span className={vertical ? 'h-16 w-px bg-forest/25' : 'h-px w-8 bg-forest/25'} aria-hidden="true" />
      <ul className={vertical ? 'flex flex-col gap-3' : 'flex gap-2.5'} aria-hidden={linked ? undefined : true}>
        {keys.map((key) => {
          const icon = (
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
              <path d={SOCIAL_PATHS[key]} />
            </svg>
          );

          return (
            <li key={key}>
              {linked ? (
                <a
                  href={social[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${SOCIAL_LABELS[key]} (opens in a new tab)`}
                  className={`${ICON} transition duration-300 hover:-translate-y-0.5 hover:border-forest hover:bg-forest hover:text-ivory`}
                >
                  {icon}
                </a>
              ) : (
                <span className={ICON}>{icon}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Hero({ data, settings }) {
  const items = (data.items ?? []).filter((item) => item.image);
  const social = settings?.social;

  return (
    // clip-path, unlike overflow, also clips the fixed wave, so it only shows inside the hero.
    <section className="relative isolate overflow-hidden bg-ivory [clip-path:inset(0)]">
      {/* From lg up the wave is fixed to the window, so the hero scrolls over still lines. Reduced motion keeps it static. */}
      <WaveLines className="absolute bottom-0 right-0 -z-10 h-[45%] w-full lg:fixed lg:inset-0 lg:h-screen lg:motion-reduce:absolute lg:motion-reduce:h-full" />
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 min-[1520px]:block">
        <SocialLinks social={social} vertical />
      </div>

      <Container className="grid grid-cols-1 items-center gap-14 pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-12 lg:gap-10">
        <div className="animate-rise lg:col-span-5">
          {data.eyebrow ? <Eyebrow>{data.eyebrow}</Eyebrow> : null}
          <h1 className="type-display mt-6 text-forest">
            <Highlight text={data.heading} />
          </h1>
          <p className="type-lead mt-6 max-w-xl text-ink">{data.lead}</p>

          <ul className="mt-7 space-y-2.5 text-[0.9375rem] text-ink">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-sage text-forest">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            {data.cta_label ? (
              <Button href={data.cta_url} arrow>
                {data.cta_label}
              </Button>
            ) : null}
            {data.secondary_cta_label ? (
              <Button href={data.secondary_cta_url} variant="outline">
                {data.secondary_cta_label}
              </Button>
            ) : null}
          </div>
          {data.note ? <p className="mt-4 text-sm text-muted">{data.note}</p> : null}
          {/* Zero height on large screens, so the row hangs into the hero's bottom padding and nothing else moves. */}
          <div className="relative hidden h-0 lg:max-[1519px]:block">
            <div className="pt-8 lg:absolute lg:left-0 lg:top-0">
              <SocialLinks social={social} />
            </div>
          </div>
        </div>

        {items.length ? (
          <div className="animate-rise [animation-delay:200ms] lg:col-span-7">
            <WorkCollage items={items} note={data.float_text} />
          </div>
        ) : null}

        {/* Small screens: after the collage, so nothing above it moves. */}
        <div className="lg:hidden">
          <SocialLinks social={social} />
        </div>
      </Container>
    </section>
  );
}
