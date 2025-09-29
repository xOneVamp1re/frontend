'use client';

import Image from 'next/image';
import Link from 'next/link';

import logo from '@/shared/assets/images/logo.png';

import { AuthItems } from '@/features/auth/AuthItems';

import styles from './Navigation.module.scss';
import { GenresMenu } from './UI/GenresMenu';
import { firstMenu, IMenu, NavigationItem, userMenu } from './UI/NavigationItem';

export const Navigation = () => {
	return (
		<div className='py-layout'>
			<Link href='/' className='px-layout mb-10 block'>
				<Image src={logo} alt='logo' width={247} height={34} draggable={false} />
			</Link>
			<Menu menu={firstMenu} />
			<Menu menu={userMenu} />
			<GenresMenu />
		</div>
	);
};

export const Menu = ({ menu: { title, items } }: { menu: IMenu }) => {
	return (
		<div className='pl-layout mb-14 animate-fade '>
			<nav className={`text-gray-500 uppercase text-sm font-semibold ${styles.navigation}`}>
				{title}
				<ul className=''>
					{items.map(item => (
						<NavigationItem key={item.link} item={item} />
					))}
					{title === 'General' ? <AuthItems /> : null}
				</ul>
			</nav>
		</div>
	);
};
