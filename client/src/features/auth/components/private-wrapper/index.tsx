import React, { PropsWithChildren } from 'react';

import { useAuthStore } from 'entities/auth/model/store';
import { Navigate } from 'react-router-dom';

export const PrivateWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return children as JSX.Element;
  }

  return <Navigate to="/" />;
};
