import { Link } from 'react-router-dom';
import homeImg from 'shared/assets/home.svg';
import boardsImg from 'shared/assets/boards.svg';
import logoImg from 'shared/assets/trello-logo-white.svg';
import { logout } from '../../entities/auth/lib/logout';

export const TopBar: React.FC = () => {
  return (
    <div className="navbar-boards">
      <div className="navbar-left-side">
        <Link to="/" className="navbar-icon">
          <img src={homeImg} alt="home-icon" />
        </Link>
        <Link to="/boards" className="navbar-icon navbar-boards-icon">
          <img src={boardsImg} alt="boards-icon" />
        </Link>
      </div>

      <img src={logoImg} alt="logo" className="navbar-logo" />

      <div className="navbar-right-side">
        <div className="navbar-icon navbar-logout-icon" onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );
};
