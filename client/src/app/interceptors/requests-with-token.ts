import fetchIntercept from 'fetch-intercept';
import { getToken } from 'entities/auth/model/local-storage';
import { createAuthorizationHeader } from '../../shared/config/createAuthorizationHeader';

export const requestsWithToken = () =>
  fetchIntercept.register({
    request: function (url, config: RequestInit) {
      const token = getToken();

      if (token) {
        const tokenHeader = { authorization: createAuthorizationHeader(token) };

        if (config.headers) {
          config.headers = {
            ...config.headers,
            authorization: tokenHeader.authorization,
          };
        } else {
          config.headers = tokenHeader;
        }
      }
      return [url, config];
    },
  });
