'use client';

import Image from 'next/image';

import { useState } from 'react';

import { AvatarProps } from './types';

export function Avatar({ avatarKey, userId, size = 40, className = '', fallback = 'initials', onClick }: AvatarProps) {
	const [imgError, setImgError] = useState(false);

	const publicUrl = avatarKey ? `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${avatarKey}` : null;
	const getFallbackUrl = () => {
		if (fallback === 'initials' && userId) {
			return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userId)}&backgroundColors=4f46e5,0891b2,059669,dc2626&fontSize=40`;
		}
		return '/default-avatar.png';
	};

	const fallbackUrl = getFallbackUrl();
	const imageUrl = publicUrl && !imgError ? publicUrl : fallbackUrl;

	return (
		/* 	<div
			onClick={onClick}
			style={{ width: size, height: size }}
			className={`relative cursor-pointer ${className}`}></div> */
		<Image
			src={imageUrl}
			alt='Avatar'
			width={size}
			height={size}
			className='rounded-full object-cover'
			onError={() => setImgError(true)}
			priority={false}
		/>
	);
}
