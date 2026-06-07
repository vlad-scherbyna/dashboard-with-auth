import { apiClient } from '../client';
import { LoginResponse } from './auth.types';

export const login = (email: string, password: string) =>
  apiClient.post<LoginResponse>('/login', { email, password }).then((response) => response.data);
