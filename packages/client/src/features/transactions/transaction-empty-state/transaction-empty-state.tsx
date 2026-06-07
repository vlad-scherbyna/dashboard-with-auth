import { Typography } from '@mui/material';

export function TransactionEmptyState() {
  return (
    <Typography sx={{ p: 3, color: 'text.secondary' }}>
      No transactions found
    </Typography>
  );
}
