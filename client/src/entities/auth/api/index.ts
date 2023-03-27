import { CurrentUser } from 'entities/auth/types/current-user';
import { httpGet, httpPost } from 'shared/api/http';
import { environment } from 'shared/misc/environment';
import { RegisterUserRequest } from 'entities/auth/types/register-user-request';
import { LoginRequest } from 'entities/auth/types/login-request';

export const login = (
  loginRequest: LoginRequest
): Promise<CurrentUser | null> =>
  httpPost(environment.REACT_APP_API_URL + '/users/login', {
    body: JSON.stringify(loginRequest),
    headers: { 'Content-Type': 'application/json' },
  });
export const registerUser = (
  registerRequest: RegisterUserRequest
): Promise<CurrentUser | null> =>
  httpPost(environment.REACT_APP_API_URL + '/users', {
    body: JSON.stringify(registerRequest),
    headers: { 'Content-Type': 'application/json' },
  });

export const getCurrentUser = async (): Promise<CurrentUser | null> =>
  httpGet(environment.REACT_APP_API_URL + '/user');
