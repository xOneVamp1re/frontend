// app/verify-code/page.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { browserApi } from '@/shared/API/client/browser-client';

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

export default function VerifyCodePage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	useEffect(() => {
		const verifyEmail = async () => {
			if (!token) {
				/* 			setStatus('error');
				setMessage('No verification token provided'); */
				return;
			}

			try {
				// ✅ Отправляем GET запрос с токеном
				const data = browserApi.get(`/auth/verify-email?token=${encodeURIComponent(token)}`);
				console.log(data);
				router.replace('/');
			} catch (error) {
				console.log(error);
				/* 		setStatus('error');
				setMessage('Something went wrong. Please try again.'); */
			}
		};

		verifyEmail();
	}, [router, token]);

	return (
		<div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
			<h1 style={{ textAlign: 'center' }}>Enter Verification Code</h1>

			{/* <form onSubmit={handleSubmit}>
				<div style={{ marginBottom: '15px' }}>
					<input
						type='email'
						placeholder='Email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
						style={{ width: '100%', padding: '10px' }}
					/>
				</div>

				<div style={{ marginBottom: '15px' }}>
					<input
						type='text'
						placeholder='6-digit code'
						value={code}
						onChange={e => setCode(e.target.value)}
						maxLength={6}
						pattern='[0-9]{6}'
						required
						style={{ width: '100%', padding: '10px', fontSize: '24px', letterSpacing: '8px', textAlign: 'center' }}
					/>
				</div>

				{error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

				<button
					type='submit'
					disabled={loading}
					style={{
						width: '100%',
						padding: '12px',
						background: '#3b82f6',
						color: 'white',
						border: 'none',
						borderRadius: '5px',
						cursor: loading ? 'not-allowed' : 'pointer',
						opacity: loading ? 0.7 : 1,
					}}>
					{loading ? 'Verifying...' : 'Verify Code'}
				</button>
			</form> */}
		</div>
	);
}
