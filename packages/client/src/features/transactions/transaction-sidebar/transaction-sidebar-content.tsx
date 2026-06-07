import { Box, Avatar, Typography, Chip, Divider } from '@mui/material';
import { Transaction } from '../../../types';
import { formatAmount } from '../../../utils/format';
import { getStatusColor } from '../../../utils/transaction-status';
import { TransactionDetailRow } from './transaction-detail-row';

interface Props {
  transaction: Transaction;
  userName?: string;
}

export function TransactionSidebarContent({ transaction, userName }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar src={transaction.merchantIconUrl} alt={transaction.merchantName} />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {transaction.merchantName}
        </Typography>
      </Box>

      <Divider />

      <TransactionDetailRow label="Amount">
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {formatAmount(transaction.amount, transaction.currency)}
        </Typography>
      </TransactionDetailRow>

      <TransactionDetailRow label="Status">
        <Chip label={transaction.status} color={getStatusColor(transaction.status)} size="small" />
      </TransactionDetailRow>

      <TransactionDetailRow label="Timestamp">
        <Typography variant="body2">
          {new Date(transaction.transactionTime).toLocaleString()}
        </Typography>
      </TransactionDetailRow>

      {transaction.rejectionReason && (
        <TransactionDetailRow label="Rejection reason">
          <Typography variant="body2">{transaction.rejectionReason}</Typography>
        </TransactionDetailRow>
      )}

      <TransactionDetailRow label="User">
        <Typography variant="body2">{userName ?? '—'}</Typography>
      </TransactionDetailRow>
    </Box>
  );
}
