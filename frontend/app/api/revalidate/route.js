import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';

function authorized(request) {
  const expected = Buffer.from(process.env.REVALIDATE_SECRET ?? '');
  const received = Buffer.from(request.headers.get('x-revalidate-secret') ?? '');

  return expected.length > 0 && expected.length === received.length && timingSafeEqual(expected, received);
}

/** Called by Laravel after content changes so edits appear without a rebuild. */
export async function POST(request) {
  if (!authorized(request)) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  revalidateTag('cms', { expire: 0 });

  return Response.json({ revalidated: true });
}
