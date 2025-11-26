import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api, queryKeys } from '@/shared/API/api';

interface User {
	email: string;
	password: string;
	username: string;
}

interface UserRegisterResponse {
	message: string;
	user: {
		id: string;
		email: string;
		name: string;
		isAdmin: boolean;
		favorites: string[];
		createdAt: string;
		updatedAt: string;
	};
}

export const useRegister = () => {
	const queryClient = useQueryClient();

	return useMutation<UserRegisterResponse, Error, User>({
		mutationFn: userData => {
			console.log(userData);
			return api.post('users/register', { ...userData });
		},
		onSuccess: data => {
			// localStorage.setItem('token', data.user.token);
			queryClient.setQueryData(queryKeys.user, data.user);
		},
	});
};
