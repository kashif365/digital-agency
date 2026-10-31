import { cn } from '@/lib/utils';

const PATHS = {
  facebook: 'M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.5v3.2h2.7V22h3.3z',
  instagram: 'M12 7.4A4.6 4.6 0 1 0 16.6 12 4.6 4.6 0 0 0 12 7.4zm0 7.6a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm4.8-8.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM21.9 8.2a5.7 5.7 0 0 0-1.5-4 5.7 5.7 0 0 0-4-1.6c-1.6-.1-6.2-.1-7.8 0a5.7 5.7 0 0 0-4 1.5 5.7 5.7 0 0 0-1.6 4c-.1 1.6-.1 6.2 0 7.8a5.7 5.7 0 0 0 1.6 4 5.7 5.7 0 0 0 4 1.6c1.6.1 6.2.1 7.8 0a5.7 5.7 0 0 0 4-1.6 5.7 5.7 0 0 0 1.5-4c.1-1.6.1-6.2 0-7.7zm-2 9.5a3.2 3.2 0 0 1-1.8 1.8c-1.2.5-4.2.4-5.6.4s-4.3.1-5.6-.4a3.2 3.2 0 0 1-1.8-1.8c-.5-1.2-.4-4.2-.4-5.6s-.1-4.3.4-5.6a3.2 3.2 0 0 1 1.8-1.8c1.2-.5 4.2-.4 5.6-.4s4.3-.1 5.6.4a3.2 3.2 0 0 1 1.8 1.8c.5 1.2.4 4.2.4 5.6s.1 4.3-.4 5.6z',
  linkedin: 'M6.9 21.5H3.4V8.9h3.5v12.6zM5.2 7.3a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM21 21.5h-3.5v-6.1c0-1.5 0-3.3-2-3.3s-2.4 1.6-2.4 3.2v6.2H9.6V8.9h3.4v1.7h.1a3.7 3.7 0 0 1 3.3-1.8c3.6 0 4.2 2.3 4.2 5.4v7.3z',
  x: 'M17.7 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2l7.3-8.3L1.7 3h6.4l4.4 5.8L17.7 3zm-1.1 16.2h1.7L7.2 4.7H5.4l11.2 14.5z',
  youtube: 'M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.7 12 4.7 12 4.7s-6.8 0-8.5.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.7.5 8.5.5 8.5.5s6.8 0 8.5-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z',
};

const LABELS = { facebook: 'Facebook', instagram: 'Instagram', linkedin: 'LinkedIn', x: 'X', youtube: 'YouTube' };

/** Only renders profiles the business has configured. Brand marks are not in the icon set. */
export default function SocialIcons({ social = {}, tone = 'dark' }) {
  const links = Object.keys(PATHS).filter((key) => social[key]);

  if (links.length === 0) {
    return null;
  }

  return (
    <ul className="flex gap-2.5">
      {links.map((key) => (
        <li key={key}>
          <a
            href={social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={LABELS[key]}
            className={cn(
              'grid transition hover:-translate-y-0.5',
              tone === 'light'
                ? 'size-7 place-items-center text-heading hover:text-brand'
                : 'size-10 place-items-center rounded-full bg-white/10 text-white/85 hover:bg-brand hover:text-white'
            )}
          >
            <svg viewBox="0 0 24 24" className="size-[1.125rem]" fill="currentColor" aria-hidden="true">
              <path d={PATHS[key]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
