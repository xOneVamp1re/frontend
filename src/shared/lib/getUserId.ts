import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

export async function getUserId(): Promise<string | null> {
	const cookieStore = await cookies();
	const token = cookieStore.get('access_token');
	if (!token) return null;
	try {
		const decoded = jwtDecode<{ sub: string }>(token.value);
		return decoded.sub;
	} catch (error) {
		console.error('Failed to decode token:', error);
		return null;
	}
}
