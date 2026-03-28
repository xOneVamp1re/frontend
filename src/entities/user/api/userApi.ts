import { browserApi } from '@/shared/API/client/browser-client';

import { UserResponse } from '../model/interfaces';

export const userApi = {
	getProfile: async (userId: string) => {
		console.log('Fetching profile for:', userId);
		const response = await browserApi.get<UserResponse>(`/users/profile/${userId}`);
		return response.user;
	},
};
