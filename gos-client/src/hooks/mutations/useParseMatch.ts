import {useMutation} from '@tanstack/react-query';
import {apiClient} from '../../api/apiClient';

export const useParseMatch = () => {
  return useMutation<boolean, Error, number>({
    mutationFn: async (matchId: number) => {
      return await apiClient.post(`/request/${matchId}`);
    },
  });
};
