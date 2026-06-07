export * from '@finmid/lib-common';

export interface Sme {
  id: string;
  legalName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface TransactionsResponse {
  data: import('@finmid/lib-common').Transaction[];
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface LoginResponse {
  token: string;
}
