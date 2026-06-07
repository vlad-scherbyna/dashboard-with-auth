import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './query-client';
import { AuthProvider, useAuth } from './features/auth';
import { ErrorProvider } from './contexts/error-context';
import { ErrorBoundary } from './error';
import { ErrorSnackbar } from './components/ErrorSnackbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';

function Router() {
  const { token } = useAuth();
  return token ? <DashboardPage /> : <LoginPage />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ErrorProvider>
          <AuthProvider>
            <Router />
            <ErrorSnackbar />
          </AuthProvider>
        </ErrorProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
