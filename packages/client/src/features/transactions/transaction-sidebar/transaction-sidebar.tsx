import { Drawer, Box, Divider } from '@mui/material';
import { Transaction } from '../../../types';
import { TransactionSidebarHeader } from './transaction-sidebar-header';
import { TransactionSidebarContent } from './transaction-sidebar-content';

interface Props {
  transaction: Transaction | null;
  userName?: string;
  onClose: () => void;
}

export default function TransactionSidebar({ transaction, userName, onClose }: Props) {
  return (
    <Drawer anchor="right" open={!!transaction} onClose={onClose}>
      <Box sx={{ width: 340, p: 3 }}>
        <TransactionSidebarHeader onClose={onClose} />
        <Divider sx={{ mb: 2 }} />
        {transaction && (
          <TransactionSidebarContent transaction={transaction} userName={userName} />
        )}
      </Box>
    </Drawer>
  );
}
