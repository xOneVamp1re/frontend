'use client';

import classNames from 'classnames';
// import Image from 'next/image';
import Link from 'next/link';

import { useRef, useState } from 'react';

import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { MaterialIcon } from '@/shared/types/icons.types';
import { Avatar } from '@/shared/UI/avatar';

import { useUser } from '@/entities/user/model/hooks';

import { ProfileMenuList } from '../const/ProfileMenu';
import styles from './ProfileMenu.module.scss';

interface ProfileMenuProps {
	username?: string;
	children: React.ReactNode;
}

export const ProfileMenu = ({ children }: ProfileMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const { data: userData, isSuccess } = useUser();
	console.log(userData);
	console.log(isSuccess);
	useOutsideClick(dropdownRef, () => setIsOpen(false));
	const buttonClasses = classNames(styles['dropdown'], {
		[styles['dropdown--open']]: isOpen,
	});
	const menuClasses = classNames(styles['dropdown-menu'], {
		[styles['dropdown-menu--open']]: isOpen,
		[styles['dropdown-menu--closed']]: !isOpen,
	});
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};
	return (
		<>
			{isSuccess && (
				<div className={buttonClasses} ref={dropdownRef}>
					<button className={styles['dropdown-button']} onClick={toggleDropdown}>
						{/* <span> {username}</span> */}
						{/* 	<Image
						className={`${styles.dropdown}-image`}
						src={'/src/shared/assets/images/logo-png.png'}
						alt='Profile'
						width={15}
						height={15}
						// onLoad={test}
					/> */}
						<Avatar avatarKey={userData.avatarKey} userId={userData.id} size={40} />
					</button>
					{isOpen && (
						<nav className={menuClasses}>
							<ul className={styles['dropdown-menu-list']}>
								{ProfileMenuList.map(item => (
									<li key={item.href} className={styles['dropdown-menu-list-item']}>
										<MaterialIcon name={item.iconName} />
										<Link href={item.href} className={styles['dropdown-menu-list-item-link']}>
											{item.label}
										</Link>
									</li>
								))}
								{children}
							</ul>
						</nav>
					)}
				</div>
			)}
		</>
	);
};
