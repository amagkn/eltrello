import { useQuery } from '@tanstack/react-query';
import { getColumns } from '../api';

export const useColumnsQuery = (boardId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getColumns'],
    queryFn: () => getColumns(boardId!),
  });

  return {
    columns: data,
    columnsIsLoading: isLoading,
  };
};
