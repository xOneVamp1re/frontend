const nextConfig = {
	poweredByHeader: false,
	env: {
		APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
	},
	sassOptions: {
		silenceDeprecations: ['import'],
	},
	async rewrites() {
		const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4200';

		console.log('Rewrites using server URL:', serverUrl);

		return [
			{
				source: '/api/:path*',
				destination: `${serverUrl}/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `${serverUrl}/uploads/:path*`,
			},
		];
	},
	async headers() {
		return [
			{
				source: '/api/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{ key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,PATCH,OPTIONS' },
					{ key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
				],
			},
		];
	},
};

module.exports = nextConfig;
