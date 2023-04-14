import { useQuery } from '@tanstack/react-query';
import { getColumns } from '../api';

export const useColumnsQuery = (boardId?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getBoards'],
    queryFn: () => getColumns(boardId!),
    enabled: Boolean(boardId),
  });

  return {
    columns: data,
    columnsIsLoading: isLoading,
  };
};
