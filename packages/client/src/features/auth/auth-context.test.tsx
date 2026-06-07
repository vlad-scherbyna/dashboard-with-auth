import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AuthProvider, useAuthContext } from './auth-context';

const makeToken = (expOffsetMs: number = 365 * 24 * 60 * 60 * 1000) => {
  const payload = {
    userData: { id: '1', name: 'Frodo', email: 'frodo@test.com', smeId: 'sme1' },
    exp: Math.floor((Date.now() + expOffsetMs) / 1000),
  };
  const encoded = btoa(JSON.stringify(payload));
  return `header.${encoded}.signature`;
};

function TestConsumer() {
  const { token, user, logout } = useAuthContext();
  return (
    <div>
      <span data-testid="token">{token ?? 'null'}</span>
      <span data-testid="user">{user?.name ?? 'null'}</span>
      <button onClick={logout}>logout</button>
    </div>
  );
}

describe('AuthProvider', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('provides null token and user when no token in storage', () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    expect(screen.getByTestId('token').textContent).toBe('null');
    expect(screen.getByTestId('user').textContent).toBe('null');
  });

  it('reads token from localStorage on mount', () => {
    const token = makeToken();
    localStorage.setItem('token', token);
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    expect(screen.getByTestId('token').textContent).toBe(token);
    expect(screen.getByTestId('user').textContent).toBe('Frodo');
  });

  it('clears token and user on logout', () => {
    const token = makeToken();
    localStorage.setItem('token', token);
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'logout' }));
    expect(screen.getByTestId('token').textContent).toBe('null');
    expect(screen.getByTestId('user').textContent).toBe('null');
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('logs out when auth:logout event is dispatched', () => {
    const token = makeToken();
    localStorage.setItem('token', token);
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    act(() => { window.dispatchEvent(new Event('auth:logout')); });
    expect(screen.getByTestId('token').textContent).toBe('null');
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('logs out when token is already expired on mount', () => {
    const expiredToken = makeToken(-1000);
    localStorage.setItem('token', expiredToken);
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    expect(screen.getByTestId('token').textContent).toBe('null');
  });
});
