import { useMutation } from '@tanstack/react-query';
import { login } from 'entities/auth/api';
import { ErrorData } from 'shared/api/http';
import { CurrentUser } from 'entities/auth/types/current-user';

export const useLoginMutation = (
  onSuccess?: (currentUser: CurrentUser | null) => void
) => {
  const { mutate, isError, data, error } = useMutation({
    mutationFn: login,
    onSuccess,
  });

  return {
    loginMutate: mutate,
    loginIsError: isError,
    loginErrorData: error as ErrorData | null,
    loginData: data,
  };
};
