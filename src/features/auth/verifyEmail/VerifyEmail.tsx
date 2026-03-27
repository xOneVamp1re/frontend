'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

import { browserApi } from '@/shared/API/client/browser-client';

// app/verify-code/VerifyCodeContent.tsx

export const VerifyMail = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	useEffect(() => {
		const verifyEmail = async () => {
			if (!token) {
				console.log('No verification token provided');
				return;
			}

			try {
				const data = await browserApi.get(`/auth/verify-email?token=${encodeURIComponent(token)}`);
				console.log(data);
				router.replace('/');
			} catch (error) {
				console.log(error);
			}
		};

		verifyEmail();
	}, [router, token]);

	return (
		<div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
			<h1 style={{ textAlign: 'center' }}>Verifying your email...</h1>
			<p style={{ textAlign: 'center' }}>Please wait</p>
		</div>
	);
};
