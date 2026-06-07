import { QueryClient } from '@tanstack/react-query';

const isAuthError = (error: unknown) =>
  typeof error === 'object' && error !== null && (error as any).response?.status === 401;

const isRateLimitError = (error: unknown) =>
  typeof error === 'object' && error !== null && (error as any).response?.status === 429;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: (_, error) => isAuthError(error) || isRateLimitError(error),
      retryDelay: (_, error) => (isAuthError(error) ? 100 : 1000),
    },
    mutations: {
      retry: (_, error) => isAuthError(error),
      retryDelay: () => 100,
    },
  },
});
