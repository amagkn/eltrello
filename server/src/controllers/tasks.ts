import { RequestHandlerWithPayload } from '../types/http/request-handler-with-payload';
import { SocketEventHandler } from '../types/socket/socket-event-handler';
import { MainSocketEvents } from '../types/main-socket-events';
import { getErrorMessage } from '../helpers';
import { TaskModel } from '../models/task';

export const getTasks: RequestHandlerWithPayload = async (req, res, next) => {
  try {
    if (!req.user) return res.sendStatus(401);

    if (!req.params.boardId) {
      return res.status(400).json({ errors: ['boardId required'] });
    }

    const tasks = await TaskModel.find({
      boardId: req.params.boardId,
    });

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const createTask: SocketEventHandler<{
  title: string;
  boardId: string;
  columnId: string;
}> = async (io, socket, data) => {
  try {
    // todo: asap need refactor validation
    if (!socket.user) {
      socket.emit(MainSocketEvents.tasksCreateFailure, {
        errors: [getErrorMessage('User is not authorized')],
      });
      return;
    }

    if (!data.boardId) {
      socket.emit(MainSocketEvents.tasksCreateFailure, {
        errors: [getErrorMessage('boardId required')],
      });
      return;
    }

    if (!data.columnId) {
      socket.emit(MainSocketEvents.tasksCreateFailure, {
        errors: [getErrorMessage('columnId required')],
      });
      return;
    }

    if (!data.title) {
      socket.emit(MainSocketEvents.tasksCreateFailure, {
        errors: [getErrorMessage('title required')],
      });
      return;
    }

    const newTask = new TaskModel({
      title: data.title,
      columnId: data.columnId,
      boardId: data.boardId,
      userId: socket.user.id,
    });

    const savedTask = await newTask.save();

    io.to(data.boardId).emit(MainSocketEvents.tasksCreateSuccess, savedTask);
  } catch (err) {
    socket.emit(MainSocketEvents.tasksCreateFailure, {
      errors: [getErrorMessage(err)],
    });
  }
};
