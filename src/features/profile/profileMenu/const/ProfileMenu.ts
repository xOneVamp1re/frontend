import { TypeMaterialIconName } from '@/shared/types/icons.types';

interface iProfileMenuList {
	label: string;
	href: string;
	iconName: TypeMaterialIconName;
}

export const ProfileMenuList: iProfileMenuList[] = [
	{ label: 'Настройки', href: '/setting', iconName: 'MdSettings' },
	{ label: 'Профиль', href: '/profile', iconName: 'MdAccountCircle' },
];
