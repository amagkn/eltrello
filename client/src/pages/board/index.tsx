import { useParams } from 'react-router-dom';
import { useBoardQuery } from '../../entities/board/hooks/use-board-query';
import { useJoinBoard } from '../../entities/main-socket-connection/hooks/use-join-board';

export const BoardPage: React.FC = () => {
  let { boardId } = useParams();

  const { board } = useBoardQuery(boardId);

  useJoinBoard(boardId);

  return <div>{board && JSON.stringify(board)}</div>;
};
