import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['page.tsx', 'page.ts', 'ts'],
}

export default nextConfig
