import { useMutation } from '@tanstack/react-query';
import { deleteColumn } from '../api';

export const useDeleteColumnMutation = () => {
  const { mutate } = useMutation({
    mutationFn: deleteColumn,
  });

  return {
    deleteColumnMutation: mutate,
  };
};
