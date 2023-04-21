import { useMutation } from '@tanstack/react-query';
import { deleteTask } from '../api';

export const useDeleteTaskMutation = () => {
  const { mutate } = useMutation({
    mutationFn: deleteTask,
  });

  return {
    deleteTaskMutation: mutate,
  };
};
