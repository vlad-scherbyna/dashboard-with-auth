import { describe, it, expect } from 'vitest';
import { queryKeys } from './query-keys';

describe('queryKeys', () => {
  it('sme returns stable key', () => {
    expect(queryKeys.sme()).toEqual(['sme']);
  });

  it('users returns stable key', () => {
    expect(queryKeys.users()).toEqual(['users']);
  });

  it('transactions without status returns key with undefined', () => {
    expect(queryKeys.transactions()).toEqual(['transactions', undefined]);
  });

  it('transactions with status includes status in key', () => {
    expect(queryKeys.transactions('COMPLETED')).toEqual(['transactions', 'COMPLETED']);
  });

  it('different statuses produce different keys', () => {
    expect(queryKeys.transactions('PENDING')).not.toEqual(queryKeys.transactions('REJECTED'));
  });
});
