import * as MaterialIcons from 'react-icons/md';

export type TypeMaterialIconName = keyof typeof MaterialIcons;

export interface MaterialIconProps {
	name: TypeMaterialIconName;
	className?: string;
	size?: number;
	color?: string;
}

export const MaterialIcon = ({ name, className = '', size, color }: MaterialIconProps) => {
	const IconComponent = MaterialIcons[name];

	if (!IconComponent) {
		console.warn(`Icon "${name}" not found`);
		return <span className={className}>❔</span>;
	}

	const style = {
		...(size && { fontSize: `${size}px` }),
		...(color && { color }),
	};

	return <IconComponent className={className} style={style} />;
};
