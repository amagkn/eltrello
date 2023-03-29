import { useGetBoardsQuery } from '../../entities/board/hooks/use-get-boards-query';

export const BoardsPage: React.FC = () => {
  const { getBoardsData } = useGetBoardsQuery();

  console.log('getBoardsData', getBoardsData);

  return <div>Boards page</div>;
};
