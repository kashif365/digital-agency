import { cn } from '@/lib/utils';

/** Renders *starred* words in the display italic. With `animated`, words rise in one after another. */
export default function Highlight({ text, dark = false, animated = false }) {
  let wordIndex = 0;

  const render = (part) => {
    if (!animated) {
      return part;
    }

    return part.split(/(\s+)/).map((word, index) => {
      if (!word.trim()) {
        return word;
      }

      const delay = wordIndex++ * 60;

      return (
        <span key={index} className="inline-block animate-rise" style={{ animationDelay: `${delay}ms` }}>
          {word}
        </span>
      );
    });
  };

  return String(text ?? '')
    .split('*')
    .map((part, index) =>
      index % 2 === 1 ? (
        <em key={index} className={cn('accent', dark ? 'text-sage' : 'text-moss')}>
          {render(part)}
        </em>
      ) : (
        <span key={index}>{render(part)}</span>
      )
    );
}
