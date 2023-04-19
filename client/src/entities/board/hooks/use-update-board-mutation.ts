import { useMutation } from '@tanstack/react-query';
import { updateBoard } from '../api';

export const useUpdateBoardMutation = () => {
  const { mutate } = useMutation({
    mutationFn: updateBoard,
  });

  return {
    updateBoardMutate: mutate,
  };
};
