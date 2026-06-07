import { useState } from 'react';
import { Box, Typography, CircularProgress, Alert, List } from '@mui/material';
import { Transaction, TransactionStatus } from '../types';
import { User } from '../types';
import Header from '../components/Header';
import { TransactionItem, TransactionFilters, TransactionSidebar } from '../features/transactions';
import { useSme, useUsers, useTransactions } from '../hooks';

export default function DashboardPage() {
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | undefined>(undefined);
  const [selected, setSelected] = useState<Transaction | null>(null);

  const { data: sme, isLoading: smeLoading } = useSme();
  const { data: users } = useUsers();
  const { data, isLoading, isError } = useTransactions(statusFilter);

  const getUserName = (userId: string) =>
    users?.find((u: User) => u.id === userId)?.name;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header smeName={sme?.legalName} loading={smeLoading} />

      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Transactions
        </Typography>

        <TransactionFilters value={statusFilter} onChange={setStatusFilter} />

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        )}
        {isError && <Alert severity="error">Failed to load transactions</Alert>}

        {data && (
          <List sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            {data.data.length === 0 && (
              <Typography sx={{ p: 3, color: 'text.secondary' }}>No transactions found</Typography>
            )}
            {data.data.map((tx: Transaction) => (
              <TransactionItem
                key={tx.id}
                transaction={tx}
                selected={selected?.id === tx.id}
                onClick={setSelected}
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
