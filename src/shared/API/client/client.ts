import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { tokenRefresher } from '../tokenRefresher';
import { csrfManager } from './csrf';

const isServer = typeof window === 'undefined';
/* const baseURL = isServer
	? (process.env.NEXT_PUBLIC_SERVER_URL || 'https://backendbyalexlyadnik-production.up.railway.app') + '/api'
	: '/api';
 */
const baseURL = '/api';

export const apiClient = axios.create({
	baseURL,
	headers: { 'Content-Type': 'application/json' },
	timeout: 10000,
	withCredentials: true,
});

// Типы для очереди запросов
interface QueuedRequest {
	resolve: (value: unknown) => void;
	reject: (reason?: unknown) => void;
}

interface RefreshResponse {
	message: string;
}

// Флаг для предотвращения бесконечного цикла refresh
let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

// CSRF interceptor
apiClient.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		if (process.env.NODE_ENV === 'development') {
			console.log('🟡 Browser API Request:', config.method?.toUpperCase(), config.url);
		}

		if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase() || '')) {
			const publicEndpoints = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/verify-mail'];
			const isPublic = publicEndpoints.some(endpoint => config.url?.includes(endpoint));

			if (!isPublic && !isServer) {
				try {
					const token = await csrfManager.getToken();
					config.headers.set('X-CSRF-Token', token);
					if (process.env.NODE_ENV === 'development') {
						console.log('🛡️ CSRF token added to request');
					}
				} catch (error) {
					console.warn('⚠️ Failed to add CSRF token:', error);
				}
			}
		}

		return config;
	},
	(error: AxiosError) => Promise.reject(error)
);

// Response interceptor для refresh токена
apiClient.interceptors.response.use(
	response => {
		if (process.env.NODE_ENV === 'development') {
			console.log('🟢 Browser API Response:', response.status, response.config.url);
		}
		return response;
	},
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

		if (error.response?.status === 403) {
			const errorData = error.response.data as { message?: string };
			if (errorData.message?.includes('CSRF')) {
				console.log('🔄 CSRF token invalid, retrying...');
				if (!isServer) {
					csrfManager.reset();
				}
				return apiClient(originalRequest);
			}
		}

		if (error.response?.status !== 401 || originalRequest._retry) {
			return Promise.reject(error);
		}

		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				failedQueue.push({ resolve, reject });
			})
				.then(() => apiClient(originalRequest))
				.catch(err => Promise.reject(err));
		}

		originalRequest._retry = true;
		isRefreshing = true;

		try {
			await apiClient.post<RefreshResponse>('/auth/refresh');
			processQueue(null);
			isRefreshing = false;
			return apiClient(originalRequest);
		} catch (refreshError) {
			processQueue(refreshError as Error, null);
			isRefreshing = false;
			if (!isServer) {
				window.location.href = '/auth/login';
			}
			return Promise.reject(refreshError);
		}
	}
);

export function initializeApiClient() {
	if (typeof window !== 'undefined') {
		setTimeout(() => {
			tokenRefresher.start();
		}, 2000);
	}

	return apiClient;
}

export { tokenRefresher };
