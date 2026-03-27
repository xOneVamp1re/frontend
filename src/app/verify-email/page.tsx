import { Suspense } from 'react';

import { VerifyMail } from '@/features/auth/verifyEmail/VerifyEmail';

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

// app/verify-code/page.tsx

export default function VerifyCodePage() {
	return (
		<Suspense fallback={<div>loading...</div>}>
			<VerifyMail />
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
		</Suspense>
	);
}
