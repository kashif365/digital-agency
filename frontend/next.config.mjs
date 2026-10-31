const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000');
const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');

// Nonces would force every page to render per request, which turns off ISR. This
// static policy still limits where scripts, images, and connections can come from.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: ${apiUrl.origin} https://www.googletagmanager.com https://*.google-analytics.com`,
  "font-src 'self'",
  `connect-src 'self' ${apiUrl.origin} https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(':', ''),
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: '/storage/**',
      },
    ],
    // Loopback is blocked by default, so this opens only when the API itself is local.
    dangerouslyAllowLocalIP: ['127.0.0.1', 'localhost'].includes(apiUrl.hostname),
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Hot reloading needs eval and websockets, so the policy applies to production builds only.
          ...(process.env.NODE_ENV === 'production' ? [{ key: 'Content-Security-Policy', value: contentSecurityPolicy }] : []),
          ...(siteUrl.protocol === 'https:' ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }] : []),
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
