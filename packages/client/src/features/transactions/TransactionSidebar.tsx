import { Drawer, Box, Typography, IconButton, Divider, Chip, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Transaction } from '../../types';
import { formatDate, formatAmount } from '../../utils/format';

const STATUS_COLORS: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  COMPLETED: 'success',
  PENDING: 'warning',
  REJECTED: 'error',
};

interface Props {
  transaction: Transaction | null;
  userName?: string;
  onClose: () => void;
}

export default function TransactionSidebar({ transaction, userName, onClose }: Props) {
  return (
    <Drawer anchor="right" open={!!transaction} onClose={onClose}>
      <Box sx={{ width: 340, p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Transaction details
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {transaction && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src={transaction.merchantIconUrl} alt={transaction.merchantName} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {transaction.merchantName}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Amount</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {formatAmount(transaction.amount, transaction.currency)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Status</Typography>
              <Box>
                <Chip
                  label={transaction.status}
                  color={STATUS_COLORS[transaction.status] ?? 'default'}
                  size="small"
                />
              </Box>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Timestamp</Typography>
              <Typography variant="body2">
                {new Date(transaction.transactionTime).toLocaleString()}
              </Typography>
            </Box>
            {transaction.rejectionReason && (
              <Box>
                <Typography variant="caption" color="text.secondary">Rejection reason</Typography>
                <Typography variant="body2">{transaction.rejectionReason}</Typography>
              </Box>
            )}
            <Box>
              <Typography variant="caption" color="text.secondary">User</Typography>
              <Typography variant="body2">{userName ?? '—'}</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
