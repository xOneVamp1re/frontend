'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import logo from '@/shared/assets/images/logo.png';

// import { AuthItems } from '@/features/auth/AuthItems';

import styles from './Navigation.module.scss';
import { GenresMenu } from './UI/GenresMenu';
import { firstMenu, IMenu, NavigationItem, userMenu } from './UI/NavigationItem';

const baseUrl = 'https://aviasales-test-api.kata.academy';

interface DataItem {
	userName: number;
	id: number;
	name: string;
	email: string;
}

export const Navigation = () => {
	const throttle = (func, ms) => {
		let isThrottled = false,
			savedArgs,
			savedThis;

		function wrapper(...args) {
			if (isThrottled) {
				savedArgs = arguments;
				savedThis = this;
				return;
			}
			func.apply(this, arguments);
			isThrottled = true;
			setTimeout(() => {
				isThrottled = false;
				if (savedArgs) {
					wrapper.apply(savedThis, savedArgs);
					savedArgs = savedThis = null;
				}
			}, ms);
		}
		return wrapper;
	};

	return (
		<div className='py-layout'>
			<Link href='/' className='px-layout mb-10 block'>
				<Image src={logo} alt='logo' width={247} height={34} draggable={false} />
			</Link>
			<Menu menu={firstMenu} />
			<GenresMenu />
			<Menu menu={userMenu} />
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
					{/* {title === 'General' ? <AuthItems /> : null} */}
				</ul>
			</nav>
		</div>
	);
};

/* const [items, setItems] = useState([{ id: 1 }]);

	useEffect(() => {
		let timerId = null;

		const handleClick = () => {
			if (timerId) {
				clearInterval(timerId);
			}
			timerId = setInterval(() => {
				console.log(items.length);
			}, 500);
		};

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
			clearInterval(timerId);
		};
	}, [items]);

	const click = () => {
		setItems(prevItems => [...prevItems, { id: prevItems.length + 1 }]);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
			Current Count: {items.length}
			<ul>
				{items.map(item => (
					<li key={item.id}>{item.id}</li>
				))}
			</ul>
			<button onClick={click}>Add One</button>
		</div>
	); */
