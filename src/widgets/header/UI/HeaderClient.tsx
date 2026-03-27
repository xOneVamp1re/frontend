'use client';

import { LogoutUser } from '@/features/auth/logout/UI/LogoutUser';
import { ProfileMenu } from '@/features/profile/profileMenu/UI/ProfileMenu';

export const HeaderProfile = ({ user }) => {
	return (
		<ProfileMenu username={user.username}>
			<LogoutUser />
		</ProfileMenu>
	);
};
