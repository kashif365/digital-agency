import { ImageResponse } from 'next/og';
import { getSettings } from '@/lib/api';

export const alt = 'Evergrove digital marketing agency';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const { company } = await getSettings();

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 80,
        color: '#fff',
        background: 'linear-gradient(135deg, #060b1a 0%, #062e39 62%, #008854 100%)',
      }}
    >
      <svg width="96" height="96" viewBox="0 0 32 32" fill="none" stroke="#10a36f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 36 }}>
        <path d="M10.5 12 16 6.5l5.5 5.5M8 18.5l8-8 8 8M5.5 25 16 14.5 26.5 25" />
      </svg>
      <div style={{ fontSize: 88, fontWeight: 800 }}>{company?.name}</div>
      <div style={{ fontSize: 34, marginTop: 24, color: '#10a36f' }}>{company?.tagline}</div>
    </div>,
    size
  );
}
