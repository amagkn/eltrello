import { useParams } from 'react-router-dom';
import { useBoardQuery } from '../../entities/board/hooks/use-board-query';
import { useJoinBoard } from '../../entities/main-socket/hooks/use-join-board';
import { useColumnsQuery } from '../../entities/column/hooks/use-columns-query';
import { Loader } from '../../shared/components/loader';
import { TopBar } from '../../features/top-bar';
import { InlineForm } from '../../shared/components/inline-form';
import { useCallback } from 'react';
import { CreateColumnDto } from '../../entities/column/types/create-column-dto';
import { useCreateColumnMutation } from '../../entities/column/hooks/use-create-column-mutation';

export const BoardPage: React.FC = () => {
  let { boardId } = useParams() as { boardId: string };

  const { board, boardIsLoading } = useBoardQuery(boardId);
  const { columns, columnsIsLoading } = useColumnsQuery(boardId);
  const { createColumnMutate } = useCreateColumnMutation();

  useJoinBoard(boardId);

  const createColumnRequest = useCallback(
    (title: string) => {
      const columnRequest: CreateColumnDto = {
        title,
        boardId,
      };

      createColumnMutate(columnRequest);
    },
    [boardId, createColumnMutate]
  );

  const contentIsLoading = boardIsLoading || columnsIsLoading;

  return (
    <>
      <TopBar />

      {contentIsLoading && <Loader />}

      {!contentIsLoading && (
        <div className="board">
          <div className="board-header-container">== INLINE FORM BOARD==</div>

          <div className="columns">
            {columns &&
              columns.map((c) => (
                <div key={c.id} className="column">
                  <div className="column-title">{c.title}</div>
                </div>
              ))}
            <InlineForm
              className="create-column-form"
              defaultText="Add a list"
              hasButton
              buttonText="Add list"
              inputPlaceholder="Add column name"
              onSubmit={createColumnRequest}
            />
          </div>
        </div>
      )}
    </>
  );
};
