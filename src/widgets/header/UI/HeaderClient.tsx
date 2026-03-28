'use client';

import { MaterialIcon } from '@/shared/types/icons.types';

import { LogoutUser } from '@/features/auth/logout/UI/LogoutUser';
import { ProfileMenu } from '@/features/profile/profileMenu/UI/ProfileMenu';

export const HeaderClient = ({ user }) => {
	return (
		<>
			<MaterialIcon name='MdSunny' />
			<MaterialIcon name='MdBedtime' />
			<MaterialIcon name='MdNotifications' />
			<ProfileMenu username={user.username}>
				<LogoutUser />
			</ProfileMenu>
		</>
	);
};

/* (
	<Link href='/notifications' className={styles.notifications}>
		Уведомления
	</Link>
) |
	(
		<button className={styles.themeToggle} aria-label='Переключить тему'>
			🌙
		</button>
	); */
