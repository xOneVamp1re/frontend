import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { cache } from 'react';

import { apiClient } from '../client/client';
import { IApiClient } from '../types';

export const createServerClient = cache(async () => {
	const cookieStore = await cookies();
	const allCookies = cookieStore.getAll();
	// const appUrl = 'http://localhost:3000';
	// const baseURL = `${appUrl}/api`;
	const baseURL =
		process.env.NODE_ENV === 'production'
			? process.env.PROD_API_URL || 'https://your-production-domain.com/api'
			: 'http://localhost:3000/api';
	const serverClient = axios.create({
		baseURL,
		timeout: apiClient.defaults.timeout,
		headers: apiClient.defaults.headers,
		withCredentials: apiClient.defaults.withCredentials,
	});

	if (allCookies.length > 0) {
		const cookieString = allCookies.map(c => `${c.name}=${c.value}`).join('; ');
		serverClient.defaults.headers.common['Cookie'] = cookieString;
	}
	if (process.env.NODE_ENV === 'development') {
		serverClient.interceptors.request.use(config => {
			console.log(`🟡 Server API: ${config.method?.toUpperCase()} ${config.url}`);
			return config;
		});

		serverClient.interceptors.response.use(
			response => {
				console.log(`🟢 Server API: ${response.status} ${response.config.url}`);
				return response;
			},
			error => {
				console.error(`🔴 Server API Error: ${error.response?.status} ${error.config?.url}`);
				return Promise.reject(error);
			}
		);
	}

	let isRefreshing = false;
	const failedQueue: Array<{
		resolve: (value: unknown) => void;
		reject: (reason?: unknown) => void;
	}> = [];

	const processQueue = (error: Error | null) => {
		failedQueue.forEach(prom => {
			if (error) {
				prom.reject(error);
			} else {
				prom.resolve(null);
			}
		});
	};

	serverClient.interceptors.response.use(
		response => response,
		async error => {
			const originalRequest = error.config;
			if (error.response?.status !== 401 || originalRequest._retry) {
				return Promise.reject(error);
			}
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then(() => serverClient(originalRequest))
					.catch(err => Promise.reject(err));
			}
			originalRequest._retry = true;
			isRefreshing = true;
			try {
				await serverClient.post('/auth/refresh');
				processQueue(null);
				isRefreshing = false;
				return serverClient(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError as Error);
				isRefreshing = false;
				console.error('❌ Token refresh failed on server, redirecting to login');
				redirect('/auth/login');
			}
		}
	);

	return serverClient;
});

export const serverApi: IApiClient = {
	get: async <T>(url: string): Promise<T> => {
		const client = await createServerClient();
		const response = await client.get<T>(url);
		return response.data;
	},

	post: async <T, D = Record<string, unknown>>(url: string, data?: D): Promise<T> => {
		const client = await createServerClient();
		const response = await client.post<T>(url, data);
		return response.data;
	},

	put: async <T, D = Record<string, unknown>>(url: string, data?: D): Promise<T> => {
		const client = await createServerClient();
		const response = await client.put<T>(url, data);
		return response.data;
	},

	delete: async <T>(url: string): Promise<T> => {
		const client = await createServerClient();
		const response = await client.delete<T>(url);
		return response.data;
	},

	patch: async <T, D = Record<string, unknown>>(url: string, data?: D): Promise<T> => {
		const client = await createServerClient();
		const response = await client.patch<T>(url, data);
		return response.data;
	},
};
