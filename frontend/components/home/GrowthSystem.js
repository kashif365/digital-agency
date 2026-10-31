import { BrandMark } from '@/components/layout/Logo';
import Icon from '@/components/ui/Icon';

const LINES = ['M50 0 C50 34, 200 22, 200 60', 'M150 0 C150 30, 200 26, 200 60', 'M250 0 C250 30, 200 26, 200 60', 'M350 0 C350 34, 200 22, 200 60'];

function Connector({ d }) {
  return (
    <>
      <path d={d} stroke="rgb(255 255 255 / 0.14)" />
      <path d={d} stroke="var(--color-brand-light)" strokeDasharray="4 8" className="animate-flow" />
    </>
  );
}

/**
 * Shows the idea of the agency rather than a dashboard. It is deliberately free of
 * numbers, because any figure here would be read as a real client result.
 */
export default function GrowthSystem({ label, title, outcome, channels }) {
  return (
    <div className="animate-rise rounded-[1.75rem] border border-white/12 bg-white/[0.045] p-5 shadow-float backdrop-blur-sm [animation-delay:120ms] sm:p-7">
      {label ? (
        <p className="flex items-center gap-2.5 text-sm font-medium text-white/70">
          <span className="size-2 animate-pulse-dot rounded-full bg-brand-light" aria-hidden="true" />
          {label}
        </p>
      ) : null}

      <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {channels.map((channel) => (
          <li key={channel.title} className="rounded-2xl border border-white/10 bg-night/60 p-3.5">
            <span className="grid size-9 place-items-center rounded-xl bg-brand/20 text-brand-light">
              <Icon name={channel.icon} className="size-[1.125rem]" />
            </span>
            <p className="mt-3 font-display text-[0.9375rem] font-medium leading-tight text-white">{channel.title}</p>
            {channel.text ? <p className="mt-1 text-[0.8125rem] leading-tight text-white/60">{channel.text}</p> : null}
          </li>
        ))}
      </ul>

      <svg viewBox="0 0 400 60" className="h-12 w-full sm:h-14" fill="none" strokeWidth="1.5" strokeLinecap="round" preserveAspectRatio="none" aria-hidden="true">
        {LINES.map((d) => (
          <Connector key={d} d={d} />
        ))}
      </svg>

      <div className="rounded-2xl bg-brand p-5 text-white">
        <div className="flex items-center gap-3.5">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15">
            <BrandMark className="size-8" />
          </span>
          <div className="min-w-0">
            {title ? <p className="font-display text-xl font-medium leading-tight">{title}</p> : null}
            {outcome ? <p className="mt-0.5 text-[0.9375rem] text-white">{outcome}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
