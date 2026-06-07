import { User } from '../api/sme';

export const getUserName = (users: User[] | undefined, userId: string): string | undefined =>
  users?.find((user) => user.id === userId)?.name;
