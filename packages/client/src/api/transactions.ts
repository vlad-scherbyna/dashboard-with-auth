import { TransactionStatus } from '@finmid/lib-common';
import { TransactionsResponse } from '../types';
import { apiClient } from './client';

export const getTransactions = (status?: TransactionStatus) =>
  apiClient
    .get<TransactionsResponse>('/transactions', { params: { status, limit: 100 } })
    .then((r) => r.data);
