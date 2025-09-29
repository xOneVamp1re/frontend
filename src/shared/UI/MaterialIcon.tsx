import * as MaterialIcons from 'react-icons/md';

import { TypeMaterialIconName } from '../types/icons.types';

export const MaterialIcon = ({ name }: { name: TypeMaterialIconName }) => {
	const IconComponent = MaterialIcons[name];
	if (!IconComponent) {
		console.warn(`Icon "${name}" not found`);
		return <MaterialIcons.MdDragIndicator />;
	}
	return <IconComponent />;
};
