import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TransactionItem } from './transaction-item';
import { Transaction } from '../../../types';

const mockTransaction: Transaction = {
  id: 'tx-1',
  userId: 'user-1',
  smeId: 'sme-1',
  transactionTime: '2021-03-16T10:30:00.000Z',
  merchantIconUrl: 'http://localhost/figma.png',
  merchantName: 'Figma',
  amount: '-123.12',
  currency: 'USD',
  status: 'COMPLETED',
  rejectionReason: null,
};

describe('TransactionItem', () => {
  it('renders merchant name', () => {
    render(<TransactionItem transaction={mockTransaction} selected={false} onClick={vi.fn()} />);
    expect(screen.getByText('Figma')).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    render(<TransactionItem transaction={mockTransaction} selected={false} onClick={vi.fn()} />);
    expect(screen.getByText('16.03.2021')).toBeInTheDocument();
  });

  it('renders formatted amount', () => {
    render(<TransactionItem transaction={mockTransaction} selected={false} onClick={vi.fn()} />);
    expect(screen.getByText('-$123.12')).toBeInTheDocument();
  });

  it('renders status chip', () => {
    render(<TransactionItem transaction={mockTransaction} selected={false} onClick={vi.fn()} />);
    expect(screen.getByText('COMPLETED')).toBeInTheDocument();
  });

  it('calls onClick with transaction when clicked', () => {
    const onClick = vi.fn();
    render(<TransactionItem transaction={mockTransaction} selected={false} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
    expect(onClick).toHaveBeenCalledWith(mockTransaction);
  });

  it('passes data-testid to the element', () => {
    render(
      <TransactionItem
        transaction={mockTransaction}
        selected={false}
        onClick={vi.fn()}
        data-testid="tx-item"
      />
    );
    expect(screen.getByTestId('tx-item')).toBeInTheDocument();
  });
});
