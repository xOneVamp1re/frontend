export const queryKeys = {
	user: ['user'] as const,
	articles: ['articles'] as const,
	article: (slug: string) => ['article', slug] as const,
	userProfile: (userId: string) => ['user', 'profile', userId] as const,
};
