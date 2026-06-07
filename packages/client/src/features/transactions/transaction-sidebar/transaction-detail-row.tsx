import { Box, Typography } from '@mui/material';

interface Props {
  label: string;
  children: React.ReactNode;
}

export function TransactionDetailRow({ label, children }: Props) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Box>{children}</Box>
    </Box>
  );
}
