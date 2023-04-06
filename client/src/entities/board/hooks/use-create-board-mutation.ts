import { useMutation } from '@tanstack/react-query';
import { ErrorData } from 'shared/api/http';
import { Board } from '../types/board';
import { createBoard } from '../api';
import { queryClient } from '../../../shared/config/query-client';

export const useCreateBoardMutation = (
  onSuccess?: (board: Board | null) => void
) => {
  const { mutate, isError, data, error } = useMutation({
    mutationFn: createBoard,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['getBoards'] });

      if (onSuccess) onSuccess(res);
    },
  });

  return {
    createBoardMutate: mutate,
    createBoardIsError: isError,
    createBoardErrorData: error as ErrorData | null,
    createBoardData: data,
  };
};
