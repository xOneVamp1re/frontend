// widgets/header/UI/HeaderStatic.tsx
import Image from 'next/image';
import Link from 'next/link';

import logo from '@/shared/assets/images/logo-png.png';

import { LogoutUser } from '@/features/auth/logout/UI/LogoutUser';
import { ProfileMenu } from '@/features/profile/profileMenu/UI/ProfileMenu';

import styles from './Header.module.scss';
import { HeaderProfile } from './HeaderClient';

/* interface User {
	id: string;
	username?: string;
	email?: string;
	avatar?: string;
	isAdmin?: boolean;
}

interface HeaderStaticProps {
	user?: User | null;
} */

export const HeaderStatic = ({ user }) => {
	return (
		<header className={styles.header}>
			<Link href='/' className={styles.logo}>
				<Image src={logo} alt='Логотип компании' width={120} height={52} priority />
			</Link>

			<nav className={styles.navigation}>
				<Link href='/learning'>Обучение</Link>
				<Link href='/testing'>Тестирование</Link>
				<Link href='/sandbox'>Песочница</Link>
				<Link href='/news'>Новости</Link>
			</nav>

			<div className={styles.profile}>
				<div className={styles.search}>
					<input type='search' placeholder='Поиск вопросов и задач...' aria-label='Поиск' />
				</div>

				<Link href='/notifications' className={styles.notifications}>
					Уведомления
				</Link>

				{user ? (
					<HeaderProfile user={user} />
				) : (
					<Link href='/login' className={styles.loginBtn}>
						Войти
					</Link>
				)}

				<button className={styles.themeToggle} aria-label='Переключить тему'>
					🌙
				</button>
			</div>
		</header>
	);
};
