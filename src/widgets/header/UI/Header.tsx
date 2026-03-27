// widgets/header/UI/Header.tsx
import { getUserId } from '@/shared/lib/getUserId';

import { userApiServer } from '@/entities/user/api/userApi.server';

import { HeaderStatic } from './HeaderStatic';

export const Header = async () => {
	const userId = await getUserId();
	let user;
	if (userId) {
		try {
			user = await userApiServer.getProfile(userId);
			console.log('✅ Header - user loaded:', user?.username);
		} catch (error) {
			console.error('Failed to fetch user:', error);
		}
	}
	return <HeaderStatic user={user} />;
};
