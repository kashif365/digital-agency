import { cn } from '@/lib/utils';

/** Renders rich text that Laravel sanitized when it was saved. */
export default function Prose({ html, className }) {
  if (!html) {
    return null;
  }

  return <div className={cn('prose-content', className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
