const nextConfig = {
	poweredByHeader: false,
	allowedDevOrigins: ['192.168.8.83', 'localhost', '127.0.0.1'],
	env: {
		APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
		APP_SERVER_URL: process.env.APP_SERVER_URL,
	},
	sassOptions: {
		silenceDeprecations: ['import'],
	},
	async rewrites() {
		const serverUrl = process.env.APP_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4200';

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
};

module.exports = nextConfig;
