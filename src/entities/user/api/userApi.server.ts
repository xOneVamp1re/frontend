import { serverApi } from '@/shared/API/server/server-client';

import { UserResponse } from '../model/interfaces';

export const userApiServer = {
	getProfile: async (userId: string) => {
		const response = await serverApi.get<UserResponse>(`/users/profile/${userId}`);

		console.log('🔍 Full response structure:', JSON.stringify(response, null, 2));

		return response.user;
	},
};
