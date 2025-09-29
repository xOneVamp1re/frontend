import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { TypeMaterialIconName } from '@/shared/types/icons.types';
import { MaterialIcon } from '@/shared/UI/MaterialIcon';

export interface IMenuItem {
	icon: TypeMaterialIconName;
	title: string;
	link: string;
}

export interface IMenu {
	title: string;
	items: IMenuItem[];
}

export const firstMenu: IMenu = {
	title: 'Menu',
	items: [
		{
			icon: 'MdHome',
			link: '/',
			title: 'Home',
		},
		{
			icon: 'MdExplore',
			link: '/genres',
			title: 'Discovery',
		},
		{
			icon: 'MdRefresh',
			link: '/fresh',
			title: 'Fresh movies',
		},
		{
			icon: 'MdLocalFireDepartment',
			link: '/trending',
			title: 'Trending now',
		},
	],
};

export const userMenu: IMenu = {
	title: 'General',
	items: [],
};

export const NavigationItem = ({ item }: { item: IMenuItem }) => {
	const path = usePathname();
	const isActive = path === item.link;
	return (
		<li className={`border-r-4 transition-colors ${isActive ? 'border-r-primary' : 'border-r-transparent'}`}>
			<Link
				href={item.link}
				className={`flex items-center pr-3 mt-6 cursor-pointer transition-colors duration-200 ${
					isActive ? 'text-white fill-primary' : 'text-gray-600 hover:text-white hover:fill-white'
				}`}>
				<MaterialIcon name={item.icon} />
				<span className='ml-3 text-lg'>{item.title}</span>
			</Link>
		</li>
	);
};
