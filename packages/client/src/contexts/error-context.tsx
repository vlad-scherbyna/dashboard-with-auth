import React, { useState } from 'react';
import { createContext } from './create-context';

export interface ErrorContextValue {
  error: Error | null;
  setError: (error: Error | null) => void;
  clearError: () => void;
}

const [ErrorContext, useErrorContext] = createContext<ErrorContextValue>();
export { useErrorContext as useError };

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<Error | null>(null);

  const clearError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}
