import { apiClient } from './client';

export const api = {
	get: <T>(url: string) => apiClient.get<T>(url).then(response => response.data),
	post: <T, D = unknown>(url: string, data?: D) => apiClient.post<T>(url, data).then(response => response.data),
	put: <T, D = unknown>(url: string, data?: D) => apiClient.put<T>(url, data).then(response => response.data),
	delete: <T>(url: string) => apiClient.delete<T>(url).then(response => response.data),
	patch: <T, D = unknown>(url: string, data?: D) => apiClient.patch<T>(url, data).then(response => response.data),
};

export const queryKeys = {
	user: ['user'] as const,
	articles: ['articles'] as const,
	article: (slug: string) => ['article', slug] as const,
};
