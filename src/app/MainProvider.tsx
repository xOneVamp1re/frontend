'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useEffect } from 'react';

import { initializeApiClient, tokenRefresher } from '@/shared/API/client/client';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 5 * 60 * 1000 },
	},
});

export default function MainProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		initializeApiClient();

		return () => {
			tokenRefresher.stop();
		};
	});
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	);
}
