'use client';

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { useEffect, useState } from 'react';

import { initializeApiClient, tokenRefresher } from '@/shared/API/client/client';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
			staleTime: 5 * 60 * 1000,
			gcTime: 24 * 60 * 60 * 1000,
		},
	},
});

const persister = createAsyncStoragePersister({
	storage: typeof window !== 'undefined' ? window.localStorage : undefined,
	key: 'REACT_QUERY_CACHE',
	throttleTime: 1000,
});

export default function MainProvider({ children }: { children: React.ReactNode }) {
	const [isRestoring, setIsRestoring] = useState(true);

	useEffect(() => {
		initializeApiClient();

		return () => {
			tokenRefresher.stop();
		};
	}, []);

	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{
				persister,
				maxAge: 24 * 60 * 60 * 1000,
			}}
			onSuccess={() => {
				console.log('✅ Кэш восстановлен из localStorage');
				setIsRestoring(false);
			}}>
			{!isRestoring ? (
				children
			) : (
				<div className='flex items-center justify-center min-h-screen'>
					<div className='text-gray-500'>Loading...</div>
				</div>
			)}
			{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
		</PersistQueryClientProvider>
	);
}
