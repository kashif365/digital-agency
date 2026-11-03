import { ImageResponse } from 'next/og';
import { ringPaths } from '@/components/ui/Rings';
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
        justifyContent: 'space-between',
        padding: 80,
        color: '#f5f3ec',
        background: '#112c25',
        position: 'relative',
      }}
    >
      <svg width="760" height="760" viewBox="0 0 400 400" fill="none" stroke="#b8cc8a" strokeOpacity="0.22" strokeWidth="1.2" style={{ position: 'absolute', right: -180, top: -120 }}>
        {ringPaths({ seed: 23, count: 12, gap: 24 }).map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', width: 64, height: 64, borderRadius: 8, background: '#b8cc8a', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none" stroke="#112c25" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.5 12 16 6.5l5.5 5.5M8 18.5l8-8 8 8M5.5 25 16 14.5 26.5 25" />
          </svg>
        </div>
        <div style={{ fontSize: 48, fontFamily: 'serif' }}>{company?.name}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 84, fontFamily: 'serif', lineHeight: 1.04, maxWidth: 900 }}>{company?.tagline}</div>
        <div style={{ width: 80, height: 3, background: '#d1784f', marginTop: 40 }} />
      </div>
    </div>,
    size
  );
}
