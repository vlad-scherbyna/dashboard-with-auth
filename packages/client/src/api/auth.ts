import { LoginResponse } from '../types';
import { apiClient } from './client';

export const login = (email: string, password: string) =>
  apiClient.post<LoginResponse>('/login', { email, password }).then((r) => r.data);
