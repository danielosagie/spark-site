import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Several lockfiles exist above this directory; pin the trace root to this app.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // Local assets only; keeps the optimizer on for size/format without remote fetching.
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
