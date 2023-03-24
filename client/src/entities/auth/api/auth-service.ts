import { CurrentUser } from 'entities/auth/types/current-user';
import { httpGet } from 'shared/api/http';
import { environment } from 'app/environment';

export const login = () => null;
export const register = () => null;

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
  return httpGet(environment.REACT_APP_API_URL + '/user');
};
