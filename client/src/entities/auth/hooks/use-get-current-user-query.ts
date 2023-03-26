import { getCurrentUser } from 'entities/auth/api';
import { useQuery } from '@tanstack/react-query';
import { CurrentUser } from 'entities/auth/types/current-user';

export const useGetCurrentUserQuery = (
  onSuccess?: (currentUser: CurrentUser) => void
) => {
  const { data, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    onSuccess,
    retry: false,
  });

  return {
    getCurrentUserData: data,
    getCurrentUserIsLoading: isLoading,
  };
};
