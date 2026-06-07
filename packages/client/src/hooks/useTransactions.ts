import { useQuery } from '@tanstack/react-query';
import { TransactionStatus } from '@finmid/lib-common';
import { getTransactions } from '../api/transactions';
import { queryKeys } from '../lib/queryKeys';

export function useTransactions(status?: TransactionStatus) {
  return useQuery({
    queryKey: queryKeys.transactions(status),
    queryFn: () => getTransactions(status),
  });
}
