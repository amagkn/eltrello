import { httpGet } from '../../../shared/lib/http';
import { environment } from '../../../shared/config/environment';
import { Task } from '../types/task';
import { mainSocket } from '../../main-socket/main-socket';
import { CreateTaskDto } from '../types/create-task-dto';

export const getTasks = async (boardId: string): Promise<Task[] | null> =>
  httpGet(environment.REACT_APP_API_URL + `/boards/${boardId}/tasks`);

export const createTask = async (taskDto: CreateTaskDto) =>
  mainSocket.emitCreateTask(taskDto);