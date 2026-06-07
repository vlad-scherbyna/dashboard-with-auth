import { TransactionStatus } from '../types';

export type StatusColor = 'success' | 'warning' | 'error' | 'default';

export const STATUS_COLORS: Record<TransactionStatus, StatusColor> = {
  COMPLETED: 'success',
  PENDING: 'warning',
  REJECTED: 'error',
  REVERSED: 'default',
};

export const getStatusColor = (status: TransactionStatus): StatusColor =>
  STATUS_COLORS[status] ?? 'default';
