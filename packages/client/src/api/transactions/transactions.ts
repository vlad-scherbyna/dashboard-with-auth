import { TransactionStatus } from '@finmid/lib-common';
import { apiClient } from '../client';
import { TransactionsResponse } from './transactions.types';

export const getTransactions = (status?: TransactionStatus) =>
  apiClient
    .get<TransactionsResponse>('/transactions', { params: { status, limit: 100 } })
    .then((response) => response.data);
