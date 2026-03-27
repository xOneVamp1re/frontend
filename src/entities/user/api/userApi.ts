import { browserApi } from '@/shared/API/client/browser-client';

import { User } from '../model/interfaces';

export const userApi = {
	getProfile: (userId: string) => {
		console.log('Fetching profile for:', userId);
		return browserApi.get<User>(`/users/profile/${userId}`);
	},
};
