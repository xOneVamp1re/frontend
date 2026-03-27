'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useRef, useState } from 'react';

import { useOutsideClick } from '@/shared/hooks/useOutsideClick';

import styles from './ProfileMenu.module.scss';

interface ProfileMenuProps {
	username?: string;
	children: React.ReactNode;
}

export const ProfileMenu = ({ children, username }: ProfileMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useOutsideClick(dropdownRef, () => setIsOpen(false));

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};
	return (
		<>
			<div className={styles.dropdown} ref={dropdownRef}>
				<button className={styles.dropdownButton} onClick={toggleDropdown}>
					<span> {username}</span>
					<Image
						className={`${styles.dropdown}-image`}
						src={'/src/shared/assets/images/logo-png.png'}
						alt='Profile'
						width={15}
						height={15}
						// onLoad={test}
					/>
				</button>
				{isOpen && (
					<nav className={styles.dropdownMenu}>
						<Link className={styles.dropdownItem} href={'#'}>
							Настройки
						</Link>
						{children}
						{/* <button className={styles.dropdownItem}>Выйти</button> */}
					</nav>
				)}
			</div>
		</>
	);
};
