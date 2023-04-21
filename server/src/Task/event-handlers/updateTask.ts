import { SocketEventHandler } from '../../app/types/socket/socket-event-handler';
import { MainSocketEvents } from '../../app/types/main-socket-events';
import { getErrorMessage } from '../../helpers';
import { TaskModel } from '../models/task';

export const updateTask: SocketEventHandler<{
  boardId: string;
  taskId: string;
  fields: { title?: string; description?: string; columnId?: string };
}> = async (io, socket, data) => {
  try {
    if (!socket.user) {
      socket.emit(MainSocketEvents.tasksUpdateFailure, {
        errors: [getErrorMessage('User is not authorized')],
      });
      return;
    }

    if (!data.boardId) {
      socket.emit(MainSocketEvents.tasksUpdateFailure, {
        errors: [getErrorMessage('boardId required')],
      });
      return;
    }

    if (!data.taskId) {
      socket.emit(MainSocketEvents.tasksUpdateFailure, {
        errors: [getErrorMessage('taskId required')],
      });
      return;
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      data.taskId,
      data.fields,
      {
        new: true,
      }
    );

    if (!updatedTask) {
      socket.emit(MainSocketEvents.tasksUpdateFailure, {
        errors: [getErrorMessage(`taskId ${data.taskId} not found`)],
      });
      return;
    }

    io.to(data.boardId).emit(MainSocketEvents.tasksUpdateSuccess, updatedTask);
  } catch (err) {
    socket.emit(MainSocketEvents.tasksUpdateFailure, {
      errors: [getErrorMessage(err)],
    });
  }
};
