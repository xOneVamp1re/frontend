// entities/user/model/hooks/useLogin.ts
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
				// 2. Сохраняем данные в React Query кэш
				/* 				queryClient.setQueryData(userKeys.detail(data.user.id), data.user);
				queryClient.setQueryData(userKeys.current, data.user); */

				// 3. Опционально: предзагружаем полные данные профиля
				// Но не ждём этого перед редиректом
				queryClient
					.prefetchQuery({
						queryKey: userKeys.detail(data.user.id),
						queryFn: () => userApi.getProfile(data.user.id),
					})
					.catch(error => {
						console.error('Background prefetch failed:', error);
					});

				console.log('✅ Profile data prefetched successfully');

				// 3. Сохраняем базовые данные пользователя
				queryClient.setQueryData(userKeys.current, data.user);

				// 4. Редирект на /home (данные уже в кэше!)
				console.log('🚀 Redirecting to /home');
				router.replace('/home');

				// 4. Делаем редирект
				// router.replace('/home');
			} catch (error) {
				console.error('Error during login flow:', error);
				// Даже если что-то пошло не так, пробуем редирект
				// router.replace('/home');
			}
		},

		onError: (error: Error) => {
			console.log('🔴 Login error:', error.message);
			// Здесь можно показать уведомление об ошибке
		},
	});
};
