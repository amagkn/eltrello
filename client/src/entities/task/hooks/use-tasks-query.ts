import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../api';

export const useTasksQuery = (boardId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getTasks', boardId],
    queryFn: () => getTasks(boardId),
  });

  return {
    tasks: data,
    tasksIsLoading: isLoading,
  };
};
