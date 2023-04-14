import { useParams } from 'react-router-dom';
import { useBoardQuery } from '../../entities/board/hooks/use-board-query';
import { useJoinBoard } from '../../entities/main-socket/hooks/use-join-board';
import { useColumnsQuery } from '../../entities/column/hooks/use-columns-query';
import { Loader } from '../../shared/components/loader';
import { TopBar } from '../../features/top-bar';

export const BoardPage: React.FC = () => {
  let { boardId } = useParams();

  const { board, boardIsLoading } = useBoardQuery(boardId);
  const { columns, columnsIsLoading } = useColumnsQuery(boardId);

  useJoinBoard(boardId);

  const contentIsLoading = boardIsLoading || columnsIsLoading;

  return (
    <>
      <TopBar />

      {contentIsLoading && <Loader />}

      {!contentIsLoading && (
        <div className="board">
          <div className="board-header-container">== INLINE FORM ==</div>

          <div className="columns">
            {columns &&
              columns.map((c) => (
                <div className="column">
                  <div className="column-title">
                    == INLINE FORM FOR UPDATING COLUMN {c.title}
                  </div>
                </div>
              ))}
            == INLINE FORM FOR CREATING COLUMN ==
          </div>
        </div>
      )}
    </>
  );
};
