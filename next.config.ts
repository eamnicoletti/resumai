import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactComponentAnnotation: {
    enabled: process.env.NODE_ENV === 'development',
  },
}

export default nextConfig
