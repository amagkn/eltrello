import { httpGet, httpPost } from '../../../shared/api/http';
import { environment } from '../../../shared/config/environment';
import { Board } from '../types/board';

export const getBoards = async (): Promise<Board[] | null> =>
  httpGet(environment.REACT_APP_API_URL + '/boards');

export const getBoard = async (boardId: string): Promise<Board | null> =>
  httpGet(environment.REACT_APP_API_URL + `/boards/${boardId}`);

export const createBoard = async (title: string): Promise<Board | null> =>
  httpPost(environment.REACT_APP_API_URL + '/boards', {
    body: JSON.stringify({ title }),
    headers: { 'Content-Type': 'application/json' },
  });
