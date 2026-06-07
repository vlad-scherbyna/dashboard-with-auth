import { describe, it, expect } from 'vitest';
import { getStatusColor } from './transaction-status';

describe('getStatusColor', () => {
  it('returns success for COMPLETED', () => {
    expect(getStatusColor('COMPLETED')).toBe('success');
  });

  it('returns warning for PENDING', () => {
    expect(getStatusColor('PENDING')).toBe('warning');
  });

  it('returns error for REJECTED', () => {
    expect(getStatusColor('REJECTED')).toBe('error');
  });

  it('returns default for REVERSED', () => {
    expect(getStatusColor('REVERSED')).toBe('default');
  });
});
