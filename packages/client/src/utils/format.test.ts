import { describe, it, expect } from 'vitest';
import { formatDate, formatAmount } from './format';

describe('formatDate', () => {
  it('formats ISO string to dd.mm.yyyy', () => {
    expect(formatDate('2021-03-16T00:00:00.000Z')).toBe('16.03.2021');
  });

  it('pads single-digit day and month with leading zero', () => {
    expect(formatDate('2024-01-05T00:00:00.000Z')).toBe('05.01.2024');
  });
});

describe('formatAmount', () => {
  it('formats negative USD amount with currency symbol', () => {
    expect(formatAmount('-123.12', 'USD')).toBe('-$123.12');
  });

  it('formats negative EUR amount with currency symbol', () => {
    expect(formatAmount('-530.93', 'EUR')).toBe('-€530.93');
  });

  it('formats zero amount', () => {
    expect(formatAmount('0', 'USD')).toBe('$0.00');
  });
});
