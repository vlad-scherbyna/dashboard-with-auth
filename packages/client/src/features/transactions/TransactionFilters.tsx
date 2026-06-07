import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TransactionStatus } from '../../types';
import { TransactionFilter, TransactionFilterEnum } from "../../api/transactions";

const FILTERABLE_OPTIONS = Object.values(TransactionFilterEnum).filter(
  (filter) => filter !== TransactionFilterEnum.Reversed
) as TransactionFilter[];

interface Props {
  value: TransactionStatus | undefined;
  onChange: (status: TransactionStatus | undefined) => void;
}

export function TransactionFilters({ value, onChange }: Props) {
  const activeFilter = value ?? TransactionFilterEnum.All;

  const handleChange = (_event: React.MouseEvent, selectedFilter: TransactionFilter) => {
    onChange(selectedFilter === TransactionFilterEnum.All ? undefined : selectedFilter as TransactionStatus);
  };

  return (
    <ToggleButtonGroup
      value={activeFilter}
      exclusive
      onChange={handleChange}
      size="small"
      sx={{ mb: 3, flexWrap: 'wrap', gap: 0.5 }}
    >
      {FILTERABLE_OPTIONS.map((filter) => (
        <ToggleButton key={filter} value={filter}>
          {filter === TransactionFilterEnum.All ? 'All' : filter}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
