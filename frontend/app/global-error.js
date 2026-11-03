'use client';

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Georgia, serif', textAlign: 'center', padding: '6rem 1rem', color: '#112c25', background: '#f5f3ec' }}>
        <h1 style={{ fontSize: '2rem' }}>We will be right back</h1>
        <p style={{ margin: '1rem 0 2rem' }}>The website is temporarily unavailable. Please try again shortly.</p>
        <button
          type="button"
          onClick={reset}
          style={{ padding: '0.75rem 1.5rem', borderRadius: 4, border: 0, background: '#112c25', color: '#f5f3ec', cursor: 'pointer' }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
