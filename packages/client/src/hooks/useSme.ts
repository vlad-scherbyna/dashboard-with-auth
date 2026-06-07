import { useQuery } from '@tanstack/react-query';
import { getSme } from '../api/sme';
import { queryKeys } from '../lib/query-keys';
import { useError } from '../contexts/error-context';

export function useSme() {
  const { setError } = useError();

  return useQuery({
    queryKey: queryKeys.sme(),
    queryFn: getSme,
    throwOnError: (error: Error) => {
      setError(error);
      return false;
    },
  });
}
