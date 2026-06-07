import { Suspense, useState } from 'react';
import { Box, Typography, List } from '@mui/material';
import { Transaction, TransactionStatus } from '../../types';
import { User } from '../../api/sme';
import Header from '../../components/Header';
import { TransactionItem, TransactionFilters, TransactionSidebar } from '../../features/transactions';
import { useSme } from '../../hooks/useSme';
import { useUsers } from '../../hooks/useUsers';
import { useTransactions } from '../../hooks/useTransactions';
import { DashboardPending } from './DashboardPending';

function DashboardContent() {
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | undefined>(undefined);
  const [selected, setSelected] = useState<Transaction | null>(null);

  const { data: sme } = useSme();
  const { data: users } = useUsers();
  const { data } = useTransactions(statusFilter);

  const getUserName = (userId: string) =>
    users?.find((user: User) => user.id === userId)?.name;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header smeName={sme?.legalName} data-testid="dashboard-header" />

      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Transactions
        </Typography>

        <TransactionFilters value={statusFilter} onChange={setStatusFilter} />

        {data && (
          <List sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            {data.data.length === 0 && (
              <Typography sx={{ p: 3, color: 'text.secondary' }}>No transactions found</Typography>
            )}
            {data.data.map((transaction: Transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                selected={selected?.id === transaction.id}
                onClick={setSelected}
                data-testid={`transaction-item-${transaction.id}`}
              />
            ))}
          </List>
        )}
      </Box>

      <TransactionSidebar
        transaction={selected}
        userName={selected ? getUserName(selected.userId) : undefined}
        onClose={() => setSelected(null)}
      />
    </Box>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardPending />}>
      <DashboardContent />
    </Suspense>
  );
}
