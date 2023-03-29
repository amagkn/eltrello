import { createBrowserRouter } from 'react-router-dom';
import { RegisterPage } from 'pages/auth/register-page';
import { LoginPage } from 'pages/auth/login-page';
import { HomePage } from 'pages/home-page';
import { BoardsPage } from './boards-page';
import { PrivateWrapper } from '../features/auth/components/private-wrapper';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/boards',
    element: (
      <PrivateWrapper>
        <BoardsPage />
      </PrivateWrapper>
    ),
  },
]);
