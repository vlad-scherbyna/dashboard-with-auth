import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface Props {
  error: unknown;
  reset?: () => void;
}

export function ErrorComponent({ error, reset }: Props) {
  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 4,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Something went wrong
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
      {reset && (
        <Button variant="contained" onClick={reset}>
          Try again
        </Button>
      )}
    </Box>
  );
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: unknown;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      return <ErrorComponent error={this.state.error} reset={this.reset} />;
    }
    return this.props.children;
  }
}
