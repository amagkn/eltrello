import { useMutation } from '@tanstack/react-query';
import { registerUser } from 'entities/auth/api';
import { ErrorData } from 'shared/api/http';
import { CurrentUser } from 'entities/auth/types/current-user';

export const useRegisterUserMutation = (
  onSuccess?: (currentUser: CurrentUser | null) => void
) => {
  const { mutate, isError, data, error } = useMutation({
    mutationFn: registerUser,
    onSuccess,
  });

  return {
    registerUserMutate: mutate,
    registerUserIsError: isError,
    registerUserErrorData: error as ErrorData | null,
    registerUserData: data,
  };
};
