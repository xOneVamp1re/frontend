import usePopularGenres from '@/shared/hooks/usePopularGenres';

import { Menu } from '../Navigation';

export const GenresMenu = () => {
	const { isLoading, data } = usePopularGenres();
	return isLoading ? (
		<div className='mx-11 mb-6'>Loading</div>
	) : (
		<Menu menu={{ title: 'Popular genres', items: data || [] }} />
	);
};
