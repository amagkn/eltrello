import { Link, Navigate } from 'react-router-dom';
import logoImg from 'shared/assets/trello-logo-white.svg';
import heroImg from 'shared/assets/hero.svg';
import teamImg from 'shared/assets/work-with-any-team.png';
import infoImg from 'shared/assets/information.svg';
import workflowImg from 'shared/assets/workflow.png';
import { useAuthStore } from 'entities/auth/model/store';

export const HomePage: React.FC = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to={'/boards'} />;
  }

  return (
    <>
      <header className="home-header">
        <Link to="/" className="home-header-home-link">
          <img src={logoImg} alt="logo" className="trello-main-logo" />
        </Link>

        <div>
          <Link to="/login" className="home-header-login">
            Login
          </Link>
          <Link to="/register" className="home-header-register">
            Register
          </Link>
        </div>
      </header>
      <div className="home-hero">
        <div className="home-container">
          <div>
            <h1 className="home-title">
              Trello helps teams work more collaborativelyt and get more done
            </h1>
            <p className="home-description">
              Thrello's boards, lists, and cards enable teams to organize and
              prioritize projects in a fun, flexible, and rewarding way.
            </p>
          </div>
          <div>
            <img src={heroImg} alt="hero" />
          </div>
        </div>
      </div>

      <div className="home-team">
        <div className="home-container team-container">
          <div>
            <h1 className="home-title">Work with any team</h1>
            <p className="home-description">
              Whether it’s for work, a side project or even the next family
              vacation, Trello helps your team stay organized.
            </p>
          </div>
          <div>
            <img src={teamImg} alt="team" className="team-image" />
          </div>
        </div>
      </div>

      <div className="home-information">
        <div className="home-container information-container">
          <div>
            <img src={infoImg} alt="info" />
          </div>
          <div>
            <h1 className="home-title">Information at a glance</h1>
            <p className="home-description">
              Dive into the details by adding comments, attachments, due dates,
              and more directly to Trello cards. Collaborate on projects from
              beginning to end.
            </p>
          </div>
        </div>
      </div>

      <div className="home-workflow">
        <div className="home-container workflow-container">
          <div className="workflow-left-part">
            <h1 className="home-title">
              Built-In Workflow Automation With Butler
            </h1>
            <p className="home-description">
              Let the robots do the work! Boost spanroductivity by unleashing
              the power of automation across your entire team with Butler, and
              remove tedious tasks from your to-do lists with:
            </p>
            <ul>
              <li>Rule-Based Triggers</li>
              <li>Custom Card & Board Buttons</li>
              <li>Calendar Commands</li>
              <li>Due Date Commands</li>
            </ul>
          </div>

          <div>
            <img src={workflowImg} alt="workflow" className="workflow-image" />
          </div>
        </div>
      </div>
    </>
  );
};
