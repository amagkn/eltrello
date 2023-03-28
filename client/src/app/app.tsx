import React from 'react';
import { useGetCurrentUserQuery } from 'entities/auth/hooks/use-get-current-user-query';
import { router } from 'pages';
import { RouterProvider } from 'react-router-dom';
import { useAuthStore } from 'entities/auth/model/store';

import { requestsWithToken } from 'app/interceptors/requests-with-token';

requestsWithToken();

export const App: React.FC = () => {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  useGetCurrentUserQuery((currentUser) => setCurrentUser(currentUser));

  return <RouterProvider router={router} />;
};
