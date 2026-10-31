import { NextResponse } from 'next/server';

const API_URL = (process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
const CACHE_MS = 60_000;

let cached = { at: 0, map: new Map() };

async function redirects() {
  if (Date.now() - cached.at < CACHE_MS) {
    return cached.map;
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/redirects`, { headers: { Accept: 'application/json' } });
    const { data } = await response.json();

    cached = { at: Date.now(), map: new Map(data.map((row) => [row.from_path, row])) };
  } catch {
    // Keep serving the site, and the last known redirects, if the API is unreachable.
    cached = { ...cached, at: Date.now() };
  }

  return cached.map;
}

export async function proxy(request) {
  const match = (await redirects()).get(request.nextUrl.pathname);

  if (!match) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(match.to_path, request.url), match.status_code);
}

export const config = {
  matcher: ['/((?!_next/|api/|.*\\.[a-z0-9]+$).*)'],
};
