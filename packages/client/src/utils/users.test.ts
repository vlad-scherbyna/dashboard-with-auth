import { describe, it, expect } from 'vitest';
import { getUserName } from './users';

const users = [
  { id: '1', name: 'Frodo Baggins', email: 'frodo@test.com' },
  { id: '2', name: 'Gandalf Grey', email: 'gandalf@test.com' },
];

describe('getUserName', () => {
  it('returns the name for a matching userId', () => {
    expect(getUserName(users, '1')).toBe('Frodo Baggins');
  });

  it('returns undefined when userId is not found', () => {
    expect(getUserName(users, 'unknown')).toBeUndefined();
  });

  it('returns undefined when users list is undefined', () => {
    expect(getUserName(undefined, '1')).toBeUndefined();
  });
});
