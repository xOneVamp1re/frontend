'use client';

import { useQuery } from '@tanstack/react-query';

import { IMenuItem } from '@/widgets/navigation/UI/NavigationItem';

import { GenresService } from '../API/genre.services';
import { getGenreUrl } from '../API/url.config';

export default function usePopularGenres() {
	const queryData = useQuery({
		queryKey: ['popular genre menu'],
		queryFn: () => GenresService.getAll(),
		select: ({ data }) =>
			data
				.map(genre => ({ icon: genre.icon, link: getGenreUrl(genre.slug), title: genre.name }) as IMenuItem)
				.splice(0, 4),
	});
	return queryData;
}
