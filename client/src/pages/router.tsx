import { createBrowserRouter } from 'react-router-dom';
import { RegisterPage } from 'pages/auth/components/register-page';
import { PrivateWrapper } from 'features/auth/components/private-wrapper';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateWrapper>
        <div>
          <h1>Я - главная страница</h1>
        </div>
      </PrivateWrapper>
    ),
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);
