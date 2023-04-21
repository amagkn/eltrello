import closeIcon from 'shared/assets/close_icon.svg';
import trashIcon from 'shared/assets/trash.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasksQuery } from '../../../entities/task/hooks/use-tasks-query';
import { Task } from '../../../entities/task/types/task';
import { useCallback, useEffect, useState } from 'react';
import { InlineForm } from '../../../shared/components/inline-form';
import { useColumnsQuery } from '../../../entities/column/hooks/use-columns-query';
import { Loader } from '../../../shared/components/loader';
import { useForm } from 'react-hook-form';
import { useUpdateTaskMutation } from '../../../entities/task/hooks/use-update-task-mutation';
import { useDeleteTaskMutation } from '../../../entities/task/hooks/use-delete-task-mutation';

export const TaskModal: React.FC = () => {
  const navigate = useNavigate();
  const { boardId, taskId } = useParams() as {
    boardId: string;
    taskId: string;
  };
  const [task, setTask] = useState<Task | null>(null);

  const { tasks } = useTasksQuery(boardId);
  const { columns } = useColumnsQuery(boardId);
  const { updateTaskMutate } = useUpdateTaskMutation();
  const { deleteTaskMutation } = useDeleteTaskMutation();

  const goToBoard = useCallback(() => {
    if (boardId) {
      navigate(`/boards/${boardId}`);
    }
  }, [boardId, navigate]);

  const { register, setValue, getValues } = useForm<{
    columnId: string;
  }>();

  const updateTaskDescription = useCallback(
    (description: string) => {
      updateTaskMutate({ taskId, boardId, fields: { description } });
    },
    [boardId, taskId, updateTaskMutate]
  );

  const updateTaskName = useCallback(
    (title: string) => {
      updateTaskMutate({ taskId, boardId, fields: { title } });
    },
    [boardId, taskId, updateTaskMutate]
  );

  const updateTaskColumn = useCallback(() => {
    updateTaskMutate({
      taskId,
      boardId,
      fields: { columnId: getValues('columnId') },
    });
  }, [boardId, getValues, taskId, updateTaskMutate]);

  const deleteTask = useCallback(() => {
    const confirmed = window.confirm('Are you sure you want to delete task?');

    if (confirmed) {
      deleteTaskMutation({ taskId, boardId });
      goToBoard();
    }
  }, [deleteTaskMutation, taskId, boardId, goToBoard]);

  useEffect(() => {
    if (tasks) {
      const foundTask = tasks.find((t) => t.id === taskId);

      if (foundTask) {
        setValue('columnId', foundTask.columnId);
        setTask(foundTask);
      }
    }
  }, [setValue, taskId, tasks]);

  return (
    <div className="task-modal">
      {!task && <Loader />}

      {task && (
        <div className="task-modal-container">
          <div className="task-modal-header">
            <InlineForm
              onSubmit={updateTaskName}
              className="task-modal-edit-title-form"
              defaultText={task.title}
              title={task.title}
            />
            <img
              src={closeIcon}
              alt="close-icon"
              className="task-modal-close"
              onClick={goToBoard}
            />
          </div>
          <div className="task-modal-body">
            <div>
              {columns && (
                <form
                  onChange={updateTaskColumn}
                  className="column-select-container"
                >
                  <select className="column-select" {...register('columnId')}>
                    {columns.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </form>
              )}

              <div className="task-modal-description">
                <div className="task-modal-description-label">Description</div>
                <InlineForm
                  onSubmit={updateTaskDescription}
                  className="task-modal-edit-description-form"
                  defaultText={
                    task.description || 'Add a more detailed description'
                  }
                  title={task.description}
                  inputType="textarea"
                  hasButton
                  buttonText="Save"
                />
              </div>
            </div>
            <div className="task-modal-actions">
              <div className="task-modal-actions-label">Actions</div>
              <div>
                <div onClick={deleteTask} className="task-modal-actions-action">
                  <img
                    src={trashIcon}
                    alt="trash-icon"
                    className="task-modal-actions-icon"
                  />
                  Delete
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="task-modal-backdrop"></div>
    </div>
  );
};
