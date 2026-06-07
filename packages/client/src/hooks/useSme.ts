import { useQuery } from '@tanstack/react-query';
import { getSme } from '../api/sme';
import { queryKeys } from '../lib/queryKeys';

export function useSme() {
  return useQuery({ queryKey: queryKeys.sme(), queryFn: getSme });
}
