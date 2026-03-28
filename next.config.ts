// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	poweredByHeader: false,
	env: {
		APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pub-f38e6917443448d191968f30c2491b9d.r2.dev',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'api.dicebear.com',
				port: '',
				pathname: '/**',
			},
		],
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	sassOptions: {
		silenceDeprecations: ['legacy-js-api'],
	},
};

export default nextConfig;
