import { useQuery } from '@tanstack/react-query';
import { TransactionStatus } from '@finmid/lib-common';
import { getTransactions } from '../api/transactions';
import { queryKeys } from '../lib/queryKeys';
import { useError } from '../contexts/error-context';

export function useTransactions(status?: TransactionStatus) {
  const { setError } = useError();

  return useQuery({
    queryKey: queryKeys.transactions(status),
    queryFn: () => getTransactions(status),
    throwOnError: (error: Error) => {
      setError(error);
      return false;
    },
  });
}
