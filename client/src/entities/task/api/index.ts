import { httpGet } from '../../../shared/lib/http';
import { environment } from '../../../shared/config/environment';
import { Task } from '../types/task';

export const getTasks = async (boardId: string): Promise<Task[] | null> =>
  httpGet(environment.REACT_APP_API_URL + `/boards/${boardId}/tasks`);
