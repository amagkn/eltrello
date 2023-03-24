import { getCurrentUser } from 'entities/auth/api/auth-service';
import { useQuery } from '@tanstack/react-query';

export const useCurrentUserQuery = () => {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  return {
    currentUserIsLoading: isLoading,
    currentUserIsLoaded: isSuccess,
    currentUser: data,
  };
};
