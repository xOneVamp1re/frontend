import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { browserApi } from '@/shared/API/client/browser-client';

export const useLogout = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async () => {
			await browserApi.post('/auth/logout');
			queryClient.clear();
		},
		onSuccess: () => {
			router.push('/');
		},
		onError: error => {
			console.log('Ошибка логина: ', error);
		},
	});
};
