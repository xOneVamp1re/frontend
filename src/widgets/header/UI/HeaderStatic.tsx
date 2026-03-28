import Image from 'next/image';
import Link from 'next/link';

import logo from '@/shared/assets/images/logo-png.png';

import { navigationList } from '../const/Header';
import styles from './Header.module.scss';
import { HeaderClient } from './HeaderClient';

export const HeaderStatic = ({ user }) => {
	return (
		<header className={styles.header}>
			<Link href='/' className={styles.logo}>
				<Image src={logo} alt='Логотип компании' width={120} height={52} priority />
			</Link>
			<nav className={styles.navigation}>
				<ul className={styles['navigation-list']}>
					{navigationList.map(el => (
						<li key={el.href} className={styles['navigation-list-item']}>
							<Link className={styles['navigation-list-item-link']} href={el.href}>
								{el.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<div className={styles.profile}>
				<div className={styles.search}>
					<input type='search' placeholder='Поиск вопросов и задач...' aria-label='Поиск' />
				</div>
				{user && <HeaderClient user={user} />}
			</div>
		</header>
	);
};
