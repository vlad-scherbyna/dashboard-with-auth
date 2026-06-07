import { Transaction, TransactionStatusEnum } from '@finmid/lib-common';

export const TransactionFilterEnum = {
  All: 'ALL',
  ...TransactionStatusEnum,
} as const;

export type TransactionFilter = (typeof TransactionFilterEnum)[keyof typeof TransactionFilterEnum];

export interface TransactionsResponse {
  data: Transaction[];
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}
