import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { setToken } from 'entities/auth/model/local-storage';
import { useAuthStore } from 'entities/auth/model/store';
import { LoginRequest } from 'entities/auth/types/login-request';
import { useLoginMutation } from 'entities/auth/hooks/use-login-user-mutation';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const { handleSubmit, register: registerField } = useForm<LoginRequest>();

  const { loginMutate, loginIsError, loginErrorData } = useLoginMutation(
    (currentUser) => {
      if (currentUser) {
        setToken(currentUser);
        setCurrentUser(currentUser);
        navigate('/');
      }
    }
  );

  const onSubmit = handleSubmit((data) => loginMutate(data));

  return (
    <div className="form-container">
      <div className="login-header">Login to Trello</div>
      <div className="errors">
        {loginIsError &&
          loginErrorData &&
          loginErrorData.errors.map((msg, i) => <div key={i}>{msg}</div>)}
      </div>

      <form onSubmit={onSubmit}>
        <input
          {...registerField('email')}
          type="email"
          placeholder="Email"
          className="login-input"
        />
        <input
          {...registerField('password')}
          type="password"
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-submit-button">
          Sign in
        </button>
      </form>

      <div className="bottom-form-links">
        <Link to="/register" className="register-link">
          Register
        </Link>
      </div>
    </div>
  );
};
