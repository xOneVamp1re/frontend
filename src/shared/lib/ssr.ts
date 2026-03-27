import { dehydrate, QueryClient } from '@tanstack/react-query';

import { ReactNode } from 'react';

export async function withQuery<T>(
	queries: Array<{
		queryKey: unknown[];
		queryFn: () => Promise<T>;
	}>,
	children: (state: ReturnType<typeof dehydrate>) => ReactNode
) {
	const queryClient = new QueryClient();

	const results = await Promise.allSettled(
		queries.map(({ queryKey, queryFn }) => queryClient.prefetchQuery({ queryKey, queryFn }))
	);

	// Логируем ошибки, но продолжаем с тем, что удалось загрузить
	const failedQueries = results.filter(r => r.status === 'rejected');
	if (failedQueries.length > 0) {
		console.warn(`${failedQueries.length} queries failed to prefetch`, failedQueries);
	}

	return children(dehydrate(queryClient));
}
