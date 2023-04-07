import { CurrentUser } from 'entities/auth/types/current-user';

export const setToken = (currentUser: CurrentUser) =>
  localStorage.setItem('token', currentUser.token);

export const getToken = () => localStorage.getItem('token');

export const removeToken = () => localStorage.removeItem('token');
