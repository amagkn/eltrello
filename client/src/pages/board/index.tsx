import { useParams } from 'react-router-dom';
import { useBoardQuery } from '../../entities/board/hooks/use-board-query';
import { useJoinBoard } from '../../features/main-socket/hooks/use-join-board';
import { useColumnsQuery } from '../../entities/column/hooks/use-columns-query';
import { Loader } from '../../shared/components/loader';
import { TopBar } from '../../features/top-bar';
import { InlineForm } from '../../shared/components/inline-form';
import { useCallback } from 'react';
import { CreateColumnDto } from '../../entities/column/types/create-column-dto';
import { useCreateColumnMutation } from '../../entities/column/hooks/use-create-column-mutation';
import { useTasksQuery } from '../../entities/task/hooks/use-tasks-query';
import { Task } from '../../entities/task/types/task';
import { CreateTaskDto } from '../../entities/task/types/create-task-dto';
import { useCreateTaskMutation } from '../../entities/task/hooks/use-create-task-mutation';
import { useUpdateBoardMutation } from '../../entities/board/hooks/use-update-board-mutation';
import { useDeleteBoardMutation } from '../../entities/board/hooks/use-delete-board-mutation';
import { useDeleteColumnMutation } from '../../entities/column/hooks/use-delete-column-mutation';
import closeIcon from 'shared/assets/close_icon.svg';
import { useUpdateColumnMutation } from '../../entities/column/hooks/use-update-column-mutation';

const getTasksByColumn = (columnId: string, tasks: Task[]) => {
  return tasks.filter((t) => t.columnId === columnId);
};

export const BoardPage: React.FC = () => {
  let { boardId } = useParams() as { boardId: string };

  const { board, boardIsLoading } = useBoardQuery(boardId);
  const { columns, columnsIsLoading } = useColumnsQuery(boardId);
  const { tasks, tasksIsLoading } = useTasksQuery(boardId);
  const { createColumnMutate } = useCreateColumnMutation();
  const { createTaskMutate } = useCreateTaskMutation();
  const { updateBoardMutate } = useUpdateBoardMutation();
  const { deleteBoardMutation } = useDeleteBoardMutation();
  const { deleteColumnMutation } = useDeleteColumnMutation();
  const { updateColumnMutate } = useUpdateColumnMutation();

  useJoinBoard(boardId);

  const createColumn = useCallback(
    (title: string) => {
      const createColumnDto: CreateColumnDto = {
        title,
        boardId,
      };

      createColumnMutate(createColumnDto);
    },
    [boardId, createColumnMutate]
  );

  const createTask = (columnId: string) => (title: string) => {
    const createTaskDto: CreateTaskDto = {
      title,
      boardId,
      columnId,
    };

    createTaskMutate(createTaskDto);
  };

  const updateBoardName = useCallback(
    (title: string) => {
      const updateBoardDto = {
        boardId,
        fields: { title },
      };

      updateBoardMutate(updateBoardDto);
    },
    [boardId, createColumnMutate]
  );

  const deleteBoard = () => {
    const confirmed = window.confirm('Are you sure you want to delete board?');

    if (confirmed) {
      deleteBoardMutation({ boardId });
    }
  };

  const deleteColumn = (columnId: string) => () => {
    const confirmed = window.confirm('Are you sure you want to delete column?');

    if (confirmed) {
      deleteColumnMutation({ columnId, boardId });
    }
  };

  const updateColumnName = (columnId: string) => (title: string) => {
    const updateColumnDto = {
      boardId,
      columnId,
      fields: { title },
    };

    updateColumnMutate(updateColumnDto);
  };

  const contentIsLoading = boardIsLoading || columnsIsLoading || tasksIsLoading;

  return (
    <>
      <TopBar />

      {contentIsLoading && <Loader />}

      {!contentIsLoading && (
        <div className="board">
          <div className="board-header-container">
            <InlineForm
              className="edit-board-form"
              defaultText={board?.title}
              title={board?.title}
              onSubmit={updateBoardName}
            />
            <div className="delete-board" onClick={deleteBoard}>
              Delete board
            </div>
          </div>

          <div className="columns">
            {columns &&
              columns.map((c) => (
                <div key={c.id} className="column">
                  <div className="column-title">
                    <InlineForm
                      className="edit-column-form"
                      defaultText={c.title}
                      title={c.title}
                      onSubmit={updateColumnName(c.id)}
                    />{' '}
                    <img
                      alt="close-icon"
                      className="column-delete-icon"
                      onClick={deleteColumn(c.id)}
                      src={closeIcon}
                    />
                  </div>
                  {tasks &&
                    getTasksByColumn(c.id, tasks).map((t) => (
                      <div className="task" key={t.id}>
                        {t.title}
                      </div>
                    ))}

                  <InlineForm
                    className="create-task-form"
                    inputPlaceholder="Enter a title for this card"
                    defaultText="Add a card"
                    buttonText="Add card"
                    onSubmit={createTask(c.id)}
                    hasButton
                  />
                </div>
              ))}
            <InlineForm
              className="create-column-form"
              defaultText="Add a list"
              hasButton
              buttonText="Add list"
              inputPlaceholder="Add column name"
              onSubmit={createColumn}
            />
          </div>
        </div>
      )}
    </>
  );
};
