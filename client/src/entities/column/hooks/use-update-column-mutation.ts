import { useMutation } from '@tanstack/react-query';
import { updateColumn } from '../api';

export const useUpdateColumnMutation = () => {
  const { mutate } = useMutation({
    mutationFn: updateColumn,
  });

  return {
    updateColumnMutate: mutate,
  };
};
