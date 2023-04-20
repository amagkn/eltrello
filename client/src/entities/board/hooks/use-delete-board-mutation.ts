import { useMutation } from '@tanstack/react-query';
import { deleteBoard } from '../api';

export const useDeleteBoardMutation = () => {
  const { mutate } = useMutation({
    mutationFn: deleteBoard,
  });

  return {
    deleteBoardMutation: mutate,
  };
};
