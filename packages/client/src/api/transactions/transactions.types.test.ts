import { describe, it, expect } from 'vitest';
import { TransactionFilterEnum } from './transactions.types';

describe('TransactionFilterEnum', () => {
  it('contains All value', () => {
    expect(TransactionFilterEnum.All).toBe('ALL');
  });

  it('contains all TransactionStatus values', () => {
    expect(TransactionFilterEnum.Completed).toBe('COMPLETED');
    expect(TransactionFilterEnum.Pending).toBe('PENDING');
    expect(TransactionFilterEnum.Rejected).toBe('REJECTED');
    expect(TransactionFilterEnum.Reversed).toBe('REVERSED');
  });

  it('Reversed is excluded from filterable options', () => {
    const filterable = Object.values(TransactionFilterEnum).filter(
      (value) => value !== TransactionFilterEnum.Reversed
    );
    expect(filterable).not.toContain('REVERSED');
    expect(filterable).toContain('ALL');
    expect(filterable).toContain('COMPLETED');
  });
});
