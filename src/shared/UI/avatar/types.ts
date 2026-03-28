export interface AvatarProps {
	/** Ключ файла в R2 (путь к аватарке) */
	avatarKey?: string | null;
	/** ID пользователя для генерации fallback аватара */
	userId?: string;
	/** Размер в пикселях */
	size?: number;
	/** Дополнительные CSS классы */
	className?: string;
	/** Тип fallback аватара */
	fallback?: 'initials' | 'default';
	/** Обработчик клика */
	onClick?: () => void;
}
