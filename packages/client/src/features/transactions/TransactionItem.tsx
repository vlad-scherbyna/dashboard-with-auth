import { ListItemButton, ListItemAvatar, ListItemText, Avatar, Box, Typography, Chip } from '@mui/material';
import { Transaction } from '../../types';
import { formatDate, formatAmount } from '../../utils/format';

const STATUS_COLORS: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  COMPLETED: 'success',
  PENDING: 'warning',
  REJECTED: 'error',
};

interface Props {
  transaction: Transaction;
  selected: boolean;
  onClick: (tx: Transaction) => void;
}

export function TransactionItem({ transaction: tx, selected, onClick }: Props) {
  return (
    <ListItemButton onClick={() => onClick(tx)} divider selected={selected}>
      <ListItemAvatar>
        <Avatar src={tx.merchantIconUrl} alt={tx.merchantName} />
      </ListItemAvatar>
      <ListItemText primary={tx.merchantName} secondary={formatDate(tx.transactionTime)} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {formatAmount(tx.amount, tx.currency)}
        </Typography>
        <Chip label={tx.status} color={STATUS_COLORS[tx.status] ?? 'default'} size="small" />
      </Box>
    </ListItemButton>
  );
}
