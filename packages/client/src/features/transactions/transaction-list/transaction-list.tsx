import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Box, List } from '@mui/material';
import { Transaction } from '../../../types';
import { TransactionItem } from '../transaction-item';
import { TransactionEmptyState } from '../transaction-empty-state';

const ITEM_HEIGHT = 72;
const LIST_MAX_HEIGHT = 600;

interface Props {
  transactions: Transaction[];
  selectedId: string | null;
  onSelect: (transaction: Transaction) => void;
}

export function TransactionList({ transactions, selectedId, onSelect }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: transactions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 5,
  });

  if (transactions.length === 0) {
    return (
      <List sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <TransactionEmptyState />
      </List>
    );
  }

  return (
    <Box
      ref={parentRef}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        maxHeight: LIST_MAX_HEIGHT,
        overflowY: 'auto',
      }}
    >
      <List
        disablePadding
        sx={{ height: virtualizer.getTotalSize(), position: 'relative' }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const transaction = transactions[virtualItem.index];
          return (
            <Box
              key={transaction.id}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <TransactionItem
                transaction={transaction}
                selected={transaction.id === selectedId}
                onClick={onSelect}
                data-testid={`transaction-item-${transaction.id}`}
              />
            </Box>
          );
        })}
      </List>
    </Box>
  );
}
