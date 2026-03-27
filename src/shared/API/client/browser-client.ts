import { IApiClient } from '../types';
import { apiClient } from './client';

export const browserApi: IApiClient = {
	get: <T>(url: string) => apiClient.get<T>(url).then(res => res.data),
	post: <T, D = Record<string, unknown>>(url: string, data?: D) => apiClient.post<T>(url, data).then(res => res.data),
	put: <T, D = Record<string, unknown>>(url: string, data?: D) => apiClient.put<T>(url, data).then(res => res.data),
	delete: <T>(url: string) => apiClient.delete<T>(url).then(res => res.data),
	patch: <T, D = Record<string, unknown>>(url: string, data?: D) => apiClient.patch<T>(url, data).then(res => res.data),
};
