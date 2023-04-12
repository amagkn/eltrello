import { useMutation } from '@tanstack/react-query';
import { ErrorData } from 'shared/lib/http';
import { createBoard } from '../api';
import { queryClient } from '../../../shared/config/query-client';

export const useCreateBoardMutation = () => {
  const { mutate, isError, data, error } = useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBoards'] });
    },
  });

  return {
    createBoardMutate: mutate,
    createBoardIsError: isError,
    createBoardErrorData: error as ErrorData | null,
    createBoardData: data,
  };
};
