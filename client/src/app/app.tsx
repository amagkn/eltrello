import React from 'react';
import { useCurrentUserQuery } from 'entities/auth/hooks/useCurrentUserQuery';
import { router } from 'pages/router';
import { RouterProvider } from 'react-router-dom';

export const App: React.FC = () => {
  const { currentUser } = useCurrentUserQuery();

  console.log(currentUser);

  return <RouterProvider router={router} />;
};
