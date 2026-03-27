export interface IApiClient {
	get: <T>(url: string) => Promise<T>;
	post: <T, D = Record<string, unknown>>(url: string, data?: D) => Promise<T>;
	put: <T, D = Record<string, unknown>>(url: string, data?: D) => Promise<T>;
	delete: <T>(url: string) => Promise<T>;
	patch: <T, D = Record<string, unknown>>(url: string, data?: D) => Promise<T>;
}

export interface User {
	id: string;
	email: string;
	username?: string;
	isAdmin: boolean;
	isEmailVerified: boolean;
	favorites: string[];
	createdAt: string;
	updatedAt: string;
}
