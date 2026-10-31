import { ImageResponse } from 'next/og';
import { getSettings } from '@/lib/api';

export const alt = 'Digital marketing agency';
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
        background: 'linear-gradient(135deg, #060b1a 0%, #0b0f19 55%, #008854 100%)',
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 800 }}>{company?.name}</div>
      <div style={{ fontSize: 34, marginTop: 24, color: '#10a36f' }}>{company?.tagline}</div>
    </div>,
    size
  );
}
