import { removeToken } from '../model/local-storage';
import { useAuthStore } from '../model/store';

export const logout = () => {
  removeToken();

  useAuthStore.getState().setCurrentUser(null);
};
