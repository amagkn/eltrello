import { SocketEventHandler } from '../../app/types/socket/socket-event-handler';
import { MainSocketEvents } from '../../app/types/main-socket-events';
import { getErrorMessage } from '../../helpers';
import { TaskModel } from '../models/task';

export const deleteTask: SocketEventHandler<{
  boardId: string;
  taskId: string;
}> = async (io, socket, data) => {
  try {
    if (!socket.user) {
      socket.emit(MainSocketEvents.tasksDeleteFailure, {
        errors: [getErrorMessage('User is not authorized')],
      });
      return;
    }

    if (!data.boardId) {
      socket.emit(MainSocketEvents.tasksDeleteFailure, {
        errors: [getErrorMessage('boardId required')],
      });
      return;
    }

    if (!data.taskId) {
      socket.emit(MainSocketEvents.tasksDeleteFailure, {
        errors: [getErrorMessage('taskId required')],
      });
      return;
    }

    const deletedTask = await TaskModel.findByIdAndDelete(data.taskId);

    if (!deletedTask) {
      socket.emit(MainSocketEvents.tasksDeleteFailure, {
        errors: [getErrorMessage(`taskId ${data.taskId} not found`)],
      });
      return;
    }

    io.to(data.boardId).emit(MainSocketEvents.tasksDeleteSuccess, deletedTask);
  } catch (err) {
    socket.emit(MainSocketEvents.tasksDeleteFailure, {
      errors: [getErrorMessage(err)],
    });
  }
};
