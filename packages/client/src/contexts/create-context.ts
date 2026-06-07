import { createContext as createReactContext, useContext } from 'react';

/**
 * Factory that creates a typed context + a hook in one call.
 * Returns a [Context, useHook] tuple.
 *
 * @example
 * const [AuthContext, useAuth] = createContext<AuthContextValue>(null);
 */
export function createContext<T>(
  initialValue: T | null = null,
): [React.Context<T | null>, () => T] {
  const Context = createReactContext<T | null>(initialValue);

  const useCtx = (): T => {
    const value = useContext(Context);
    if (value === null) {
      throw new Error(`useContext called outside of its Provider`);
    }
    return value;
  };

  return [Context, useCtx];
}
