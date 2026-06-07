import { TransactionStatus } from '@finmid/lib-common';

export const queryKeys = {
  sme: () => ['sme'] as const,
  users: () => ['users'] as const,
  transactions: (status?: TransactionStatus) => ['transactions', status] as const,
} as const;
