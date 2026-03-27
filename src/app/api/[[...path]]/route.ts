import { NextRequest, NextResponse } from 'next/server';

function modifyCookiesForLocalhost(setCookie: string): string {
	if (process.env.NODE_ENV !== 'development') {
		return setCookie;
	}

	let modified = setCookie;
	modified = modified.replace(/Domain=[^;]+;?/gi, '');
	modified = modified.replace(/; Secure/gi, '');
	modified = modified.replace(/SameSite=None/gi, 'SameSite=Lax');

	if (!modified.includes('Path=')) {
		modified = modified.replace(/; /, '; Path=/; ');
	}

	return modified;
}

async function proxyRequest(request: NextRequest, method: string) {
	const url = new URL(request.url);
	const path = url.pathname;

	try {
		const backendUrl = process.env.BACKEND_URL;
		if (!backendUrl) {
			return NextResponse.json({ error: 'Backend URL not configured' }, { status: 500 });
		}

		const queryString = url.search;
		const apiPath = path.replace('/api', '');
		const fullPath = `${apiPath}${queryString}`;

		if (process.env.NODE_ENV === 'development') {
			console.log(`🔄 Proxying ${method} request to: ${fullPath}`);
		}

		// Получаем тело для методов, которые могут его иметь
		let body;
		if (['POST', 'PUT', 'PATCH'].includes(method)) {
			try {
				body = await request.json();
			} catch {
				// Если нет тела или не JSON - игнорируем
			}
		}

		// Проксируем запрос на бэкенд
		const response = await fetch(`${backendUrl}/api${fullPath}`, {
			method,
			headers: {
				'Cookie': request.headers.get('cookie') || '',
				'Content-Type': 'application/json',
				'User-Agent': request.headers.get('user-agent') || '',
				'X-CSRF-Token': request.headers.get('x-csrf-token') || '',
			},
			body: body ? JSON.stringify(body) : undefined,
		});

		let data;
		const contentType = response.headers.get('content-type');
		if (contentType?.includes('application/json')) {
			try {
				data = await response.json();
			} catch {
				data = { error: 'Invalid JSON response' };
			}
		} else {
			const text = await response.text();
			data = text ? { message: text } : {};
		}

		const nextResponse = NextResponse.json(data, {
			status: response.status,
		});

		// Обработка множественных cookies
		const setCookies = response.headers.getSetCookie();
		if (setCookies.length > 0) {
			setCookies.forEach(cookie => {
				const modifiedCookie = modifyCookiesForLocalhost(cookie);
				if (process.env.NODE_ENV === 'development') {
					console.log('🍪 Modified cookie:', modifiedCookie);
				}
				nextResponse.headers.append('set-cookie', modifiedCookie);
			});
		}

		if (contentType) {
			nextResponse.headers.set('content-type', contentType);
		}

		if (process.env.NODE_ENV === 'development') {
			console.log(`✅ Proxy ${method} response:`, response.status);
		}

		return nextResponse;
	} catch (error) {
		console.error(`❌ Proxy ${method} error:`, error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	return proxyRequest(request, 'GET');
}

export async function POST(request: NextRequest) {
	return proxyRequest(request, 'POST');
}

export async function PUT(request: NextRequest) {
	return proxyRequest(request, 'PUT');
}

export async function DELETE(request: NextRequest) {
	return proxyRequest(request, 'DELETE');
}

export async function PATCH(request: NextRequest) {
	return proxyRequest(request, 'PATCH');
}
