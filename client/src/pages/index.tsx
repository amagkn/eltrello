import { createBrowserRouter } from 'react-router-dom';
import { RegisterPage } from 'pages/auth/register';
import { LoginPage } from 'pages/auth/login';
import { HomePage } from 'pages/home';
import { BoardsPage } from './boards';
import { PrivateWrapper } from '../features/auth/components/private-wrapper';
import { BoardPage } from './board';
import { BoardPageWithTaskModal } from './board/components/TaskModal';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: 'boards',
    element: (
      <PrivateWrapper>
        <BoardsPage />
      </PrivateWrapper>
    ),
  },
  {
    path: 'boards/:boardId',
    element: (
      <PrivateWrapper>
        <BoardPage />
      </PrivateWrapper>
    ),
    children: [
      {
        path: 'tasks/:taskId',
        element: <BoardPageWithTaskModal />,
      },
    ],
  },
]);
