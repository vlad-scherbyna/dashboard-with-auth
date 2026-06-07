import { Snackbar, Alert } from '@mui/material';
import { useError } from '../../contexts/error-context';

export function ErrorSnackbar() {
  const { error, clearError } = useError();

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={5000}
      onClose={clearError}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity="error" onClose={clearError} sx={{ width: '100%' }}>
        {error?.message ?? 'An unexpected error occurred'}
      </Alert>
    </Snackbar>
  );
}
