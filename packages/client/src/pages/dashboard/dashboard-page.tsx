import { Suspense, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Transaction, TransactionStatus } from '../../types';
import { Header } from '../../components/header';
import { TransactionList, TransactionFilters, TransactionSidebar } from '../../features/transactions';
import { useSme } from '../../hooks/useSme';
import { useUsers } from '../../hooks/useUsers';
import { useTransactions } from '../../hooks/useTransactions';
import { getUserName } from '../../utils/users';
import { DashboardPending } from './dashboard-pending';

function DashboardContent() {
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | undefined>(undefined);
  const [selected, setSelected] = useState<Transaction | null>(null);

  const { data: sme } = useSme();
  const { data: users } = useUsers();
  const { data } = useTransactions(statusFilter);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header smeName={sme?.legalName} data-testid="dashboard-header" />

      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Transactions
        </Typography>

        <TransactionFilters value={statusFilter} onChange={setStatusFilter} />

        {data && (
          <TransactionList
            transactions={data.data}
            selectedId={selected?.id ?? null}
            onSelect={setSelected}
          />
        )}
      </Box>

      <TransactionSidebar
        transaction={selected}
        userName={selected ? getUserName(users, selected.userId) : undefined}
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
