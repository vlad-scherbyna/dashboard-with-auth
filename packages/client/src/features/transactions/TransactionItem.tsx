import { ListItemButton, ListItemAvatar, ListItemText, Avatar, Box, Typography, Chip } from '@mui/material';
import { Transaction } from '../../types';
import { TestAutomation } from '../../types/core';
import { formatDate, formatAmount } from '../../utils/format';

const STATUS_COLORS: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  COMPLETED: 'success',
  PENDING: 'warning',
  REJECTED: 'error',
};

interface Props extends TestAutomation {
  transaction: Transaction;
  selected: boolean;
  onClick: (transaction: Transaction) => void;
}

export function TransactionItem({ transaction, selected, onClick, 'data-testid': testId }: Props) {
  return (
    <ListItemButton onClick={() => onClick(transaction)} divider selected={selected} data-testid={testId}>
      <ListItemAvatar>
        <Avatar src={transaction.merchantIconUrl} alt={transaction.merchantName} />
      </ListItemAvatar>
      <ListItemText primary={transaction.merchantName} secondary={formatDate(transaction.transactionTime)} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {formatAmount(transaction.amount, transaction.currency)}
        </Typography>
        <Chip label={transaction.status} color={STATUS_COLORS[transaction.status] ?? 'default'} size="small" />
      </Box>
    </ListItemButton>
  );
}
