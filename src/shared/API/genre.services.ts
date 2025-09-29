import { IGenre } from '../types/movie.types';
import { getGenresUrl } from './api.config';
import { axiosClassic } from './interceptors';

export const GenresService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},
};
