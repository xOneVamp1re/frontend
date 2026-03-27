import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/auth/login', '/auth/register', '/auth/verify-email', '/', '/verify-email', '/test'];

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Пропускаем статические файлы и API
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/static') ||
		pathname === '/favicon.ico' ||
		pathname.includes('.') ||
		pathname.startsWith('/api')
	) {
		return NextResponse.next();
	}

	const refreshToken = request.cookies.get('refresh_token');

	// Логируем только в development
	if (process.env.NODE_ENV === 'development') {
		console.log(`🟡 ${request.method} ${pathname}`, {
			authenticated: !!refreshToken,
		});
	}

	// Проверяем публичные маршруты
	const isPublic = publicRoutes.some(route => (route === '/' ? pathname === '/' : pathname.startsWith(route)));

	if (isPublic) {
		if (refreshToken && pathname === '/') {
			return NextResponse.redirect(new URL('/home', request.url));
		}
		return NextResponse.next();
	}

	// Защищенные страницы
	if (!refreshToken) {
		const loginUrl = new URL('/', request.url);
		loginUrl.searchParams.set('callback', pathname);
		return NextResponse.redirect(loginUrl);
	}

	// ✅ Все проверки пройдены
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
