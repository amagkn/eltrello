import { Link } from 'react-router-dom';
import logo from 'shared/assets/trello-logo.svg';
import { RegisterForm } from 'features/auth/components/register-form';

export const RegisterPage: React.FC = () => {
  return (
    <div className="login-page">
      <Link to="/">
        <img src={logo} alt="logo" className="trello-main-logo" />
      </Link>

      <RegisterForm />
    </div>
  );
};
