import { httpGet } from '../../../shared/lib/http';
import { environment } from '../../../shared/config/environment';
import { Task } from '../types/task';
import { mainSocket } from '../../../features/main-socket/main-socket';
import { CreateTaskDto } from '../types/create-task-dto';

export const getTasks = async (boardId: string): Promise<Task[] | null> =>
  httpGet(environment.REACT_APP_API_URL + `/task/all?boardId=${boardId}`);

export const createTask = async (taskDto: CreateTaskDto) =>
  mainSocket.emitCreateTask(taskDto);

export const deleteTask = async (payload: {
  taskId: string;
  boardId: string;
}) => mainSocket.emitDeleteTask(payload);

export const updateTask = async (payload: {
  boardId: string;
  taskId: string;
  fields: { title?: string; description?: string; columnId?: string };
}) => mainSocket.emitUpdateTask(payload);
