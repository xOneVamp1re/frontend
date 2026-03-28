import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { browserApi } from '@/shared/API/client/browser-client';

import { userApi } from '@/entities/user/api/userApi';
import { userKeys } from '@/entities/user/model/hooks';

interface LoginUser {
	email: string;
	password: string;
}

interface UserLoginResponse {
	access_token: string;
	user: {
		id: string;
		username?: string;
		email: string;
		avatarKey?: string | null;
		isAdmin?: boolean;
	};
}

export const useLogin = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation<UserLoginResponse, Error, LoginUser>({
		mutationFn: async (userData: LoginUser) => {
			console.log('🔵 Login attempt:', userData.email);
			const response = await browserApi.post<UserLoginResponse, LoginUser>('auth/login', userData);
			return response;
		},

		onSuccess: async data => {
			console.log('🟢 Login successful:', data);

			try {
				/* 			const userId = {
					id: data.user.id,
					email: data.user.email,
				};
				queryClient.setQueryData(userKeys.current(), userId); */

				await queryClient.prefetchQuery({
					queryKey: userKeys.detail(data.user.id),
					queryFn: () => userApi.getProfile(data.user.id),
				});

				const fullUser = queryClient.getQueryData(userKeys.detail(data.user.id));
				console.log('✅ Full user loaded:', fullUser);

				console.log('🚀 Redirecting to /home');
				router.replace('/home');
			} catch (error) {
				console.error('❌ Error during login flow:', error);
				router.replace('/home');
			}
		},

		onError: (error: Error) => {
			console.log('🔴 Login error:', error.message);
		},
	});
};
