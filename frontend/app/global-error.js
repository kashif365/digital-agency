'use client';

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', textAlign: 'center', padding: '6rem 1rem', color: '#0c0e1a' }}>
        <h1 style={{ fontSize: '2rem' }}>We will be right back</h1>
        <p style={{ margin: '1rem 0 2rem' }}>The website is temporarily unavailable. Please try again shortly.</p>
        <button
          type="button"
          onClick={reset}
          style={{ padding: '0.75rem 1.5rem', borderRadius: 999, border: 0, background: '#008854', color: '#fff', cursor: 'pointer' }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
