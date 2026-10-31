import NextLink from 'next/link';

// Pages carry dozens of links, many inside hidden menus. Prefetching each one renders
// that route on the server per view, so navigation fetches on demand from the ISR cache.
export default function AppLink(props) {
  return <NextLink prefetch={false} {...props} />;
}
