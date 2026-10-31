/** Renders *starred* words in brand green, so editors control emphasis from the CMS. */
export default function Highlight({ text, dark = false }) {
  return String(text ?? '')
    .split('*')
    .map((part, index) =>
      index % 2 === 1 ? (
        <span key={index} className={dark ? 'text-brand-light' : 'text-brand'}>
          {part}
        </span>
      ) : (
        part
      )
    );
}
