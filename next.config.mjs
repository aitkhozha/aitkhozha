/** @type {import('next').NextConfig} */
const csp = [
  "default-src 'self'",
  "img-src 'self' data: https:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  // FX rates provider + Claude API for enquiry translation
  "connect-src 'self' https://open.er-api.com https://api.anthropic.com",
  "font-src 'self' data:",
  "frame-ancestors 'none'"
].join('; ');

const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Content-Security-Policy', value: csp }
        ]
      }
    ];
  }
};

export default nextConfig;
