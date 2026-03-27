/* // lib/user.ts
import { cookies } from 'next/headers';

import { cache } from 'react';

import { userApi } from '@/entities/user/api/userApi';

const isDev = process.env.NODE_ENV === 'development';

export const getCurrentUserId = cache(async () => {
	try {
		const cookieStore = await cookies();
		const userId = cookieStore.get('userId')?.value;

		if (isDev) {
			console.log('🔑 Current user ID:', userId || 'Not authenticated');
		}

		return userId;
	} catch (error) {
		console.error('Error reading userId from cookies:', error);
		return null;
	}
});

export const getUserProfile = cache(async (userId: string) => {
	try {
		const startTime = performance.now();
		const user = await userApi.getProfile(userId);
		const duration = performance.now() - startTime;

		if (isDev || duration > 100) {
			console.log(`📡 User profile fetched in ${duration.toFixed(2)}ms`);
		}

		return user;
	} catch (error) {
		console.error(`Failed to fetch user profile for ${userId}:`, error);
		return null;
	}
});

export const getCurrentUser = cache(async () => {
	const userId = await getCurrentUserId();
	if (!userId) return null;
	return getUserProfile(userId);
});
 */
