export interface UserResponse {
	message: string;
	user: User;
}

export interface User {
	id: string;
	email: string;
	username: string;
	avatarKey: string;
	isAdmin: boolean;
	favorites: string[];
	createdAt: string;
	updatedAt: string;
}

export interface UserSchema {
	data: User | null;
	isLoading: boolean;
	error: string | null;
}
