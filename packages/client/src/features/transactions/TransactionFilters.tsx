import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TransactionStatus, TransactionStatusEnum } from '../../types';

const FILTERABLE_STATUSES = Object.values(TransactionStatusEnum).filter(
  (s) => s !== TransactionStatusEnum.Reversed
) as TransactionStatus[];

interface Props {
  value: TransactionStatus | undefined;
  onChange: (status: TransactionStatus | undefined) => void;
}

export function TransactionFilters({ value, onChange }: Props) {
  return (
    <ToggleButtonGroup
      value={value ?? 'ALL'}
      exclusive
      onChange={(_, v) => onChange(v === 'ALL' ? undefined : v)}
      size="small"
      sx={{ mb: 3, flexWrap: 'wrap', gap: 0.5 }}
    >
      <ToggleButton value="ALL">All</ToggleButton>
      {FILTERABLE_STATUSES.map((s) => (
        <ToggleButton key={s} value={s}>{s}</ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
