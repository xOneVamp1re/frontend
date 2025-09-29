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
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.APP_SERVER_URL}/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `${process.env.APP_SERVER_URL}/uploads/:path*`,
			},
		];
	},
};

module.exports = nextConfig;
