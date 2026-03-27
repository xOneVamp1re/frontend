// app/actions/auth.ts
'use server';

import { cookies } from 'next/headers';

// app/actions/auth.ts

export async function setUserId(userId: string) {
	const cookieStore = await cookies();

	cookieStore.set('userId', userId, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7, // 7 дней
		path: '/',
	});
}

export async function clearUserId() {
	const cookieStore = await cookies();
	cookieStore.delete('userId');
}
