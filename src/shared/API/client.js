import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL
	? `https://${process.env.NEXT_PUBLIC_SERVER_URL}/api`
	: 'https://backendbyalexlyadnik-production.up.railway.app/api';

export const apiClient = axios.create({
	baseURL,
	headers: { 'Content-Type': 'application/json' },
	timeout: 10000,
});

apiClient.interceptors.request.use(
	config => {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('token');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		if (process.env.NODE_ENV === 'development') {
			console.log('🟡 API Request:', config.method?.toUpperCase(), config.url);
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

apiClient.interceptors.response.use(
	response => {
		// Логируем успешный ответ
		if (process.env.NODE_ENV === 'development') {
			console.log('🟢 API Response:', response.status, response.config.url);
		}
		return response;
	},
	error => {
		// Централизованная обработка ошибок
		const status = error.response?.status;

		if (process.env.NODE_ENV === 'development') {
			console.log('🔴 API Error:', status, error.config.url);
		}

		// Обработка специфичных статусов
		if (status === 401) {
			localStorage.removeItem('token');
			if (typeof window !== 'undefined') {
				window.location.href = '/auth/login';
			}
		}

		return Promise.reject(error);
	}
);
