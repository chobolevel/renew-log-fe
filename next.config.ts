import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	experimental: {
		optimizePackageImports: ['@chakra-ui/react'],
	},
	async rewrites() {
		return [
			{
				source: '/naver-token/:path*',
				destination: 'https://nid.naver.com/:path*',
			},
			{
				source: '/naver-user/:path*',
				destination: 'https://openapi.naver.com/:path*',
			},
		]
	},
}

export default nextConfig
