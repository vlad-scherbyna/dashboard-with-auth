import { Sme, User } from '../types';
import { apiClient } from './client';

export const getSme = () => apiClient.get<Sme>('/sme-data').then((r) => r.data);
export const getUsers = () => apiClient.get<User[]>('/users').then((r) => r.data);
