import { apiClient } from '../client';
import { Sme, User } from './sme.types';

export const getSme = () => apiClient.get<Sme>('/sme-data').then((response) => response.data);
export const getUsers = () => apiClient.get<User[]>('/users').then((response) => response.data);
