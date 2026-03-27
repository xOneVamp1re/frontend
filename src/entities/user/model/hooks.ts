import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { userApi } from '../api/userApi';
import { User } from './interfaces';

export const userKeys = {
	current: ['user'] as const,
	detail: (id: string) => ['user', id] as const,
};

export const useUser = (userId?: string) => {
	const queryKey = userId ? userKeys.detail(userId) : userKeys.current;
	return useQuery({
		queryKey,
		queryFn: () => {
			if (userId) {
				return userApi.getProfile(userId);
			}
			const currentUserId = localStorage.getItem('userId');
			return userApi.getProfile(currentUserId!);
		},
		staleTime: 5 * 60 * 1000, // 5 минут
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};
export const useUserName = (userId?: string) => {
	const { data } = useUser(userId);
	return data?.user?.username;
};

export const useUpdateProfile = () => {
	const queryClient = useQueryClient();

	return useMutation<User, Error, Partial<User>>({
		mutationFn: userApi.updateProfile,
		onSuccess: () => {
			// Просто инвалидируем текущего пользователя
			queryClient.invalidateQueries({
				queryKey: userKeys.current,
			});

			// Инвалидируем списки, если они есть в другом месте
			queryClient.invalidateQueries({
				queryKey: ['users'],
			});
		},
	});
};
