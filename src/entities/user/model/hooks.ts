import { useQuery } from '@tanstack/react-query';

import { browserApi } from '@/shared/API/client/browser-client';

import { User } from './interfaces';

export const userKeys = {
	all: ['users'] as const,

	current: () => ['user', 'current'] as const,

	detail: (id: string) => ['user', id] as const,

	// Список пользователей (с пагинацией)
	list: (filters?: Record<string, unknown>) => ['users', 'list', filters] as const,

	// Избранное пользователя
	favorites: (userId: string) => ['user', userId, 'favorites'] as const,

	// Безопасность пользователя
	security: (userId: string) => ['user', userId, 'security'] as const,
};

export const useUser = () => {
	return useQuery<User>({
		queryKey: userKeys.current(),
		queryFn: async () => {
			const user = await browserApi.get<User>('/auth/me');
			return user;
		},
		staleTime: 5 * 60 * 1000,
	});
};
