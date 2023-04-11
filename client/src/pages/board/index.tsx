import { useParams } from 'react-router-dom';
import { useGetBoardQuery } from '../../entities/board/hooks/use-get-board-query';

export const BoardPage: React.FC = () => {
  let { boardId } = useParams();

  const { getBoardData } = useGetBoardQuery(boardId as string);

  return <div>{getBoardData && JSON.stringify(getBoardData)}</div>;
};