import { useMutation, useQueryClient } from '@tanstack/react-query';

import { browserApi } from '@/shared/API/client/browser-client';
import { queryKeys } from '@/shared/API/queryKeys';

interface RegisterUser {
	email: string;
	password: string;
	username: string;
}

interface UserRegisterResponse {
	message: string;
	user: {
		id: string;
		email: string;
		username: string;
		isAdmin: boolean;
		favorites: string[];
		createdAt: string;
		updatedAt: string;
	};
}

export const useRegister = () => {
	const queryClient = useQueryClient();

	return useMutation<UserRegisterResponse, Error, RegisterUser>({
		mutationFn: userData => {
			console.log(userData);
			return browserApi.post('auth/register', { ...userData });
		},
		onSuccess: data => {
			console.log(data);
			queryClient.setQueryData(queryKeys.user, data.user);
		},
	});
};
