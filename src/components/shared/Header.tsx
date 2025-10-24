import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <h2 className="logo-text">TicketFlow</h2>
        </div>
        <div className="nav-buttons">
          <Link to="/sign-in" className="btn btn-login">
            <span>Login</span>
          </Link>
          <Link to="/sign-up" className="btn btn-get-started">
            <span>Get Started</span>
          </Link>
        </div>
        <div className="mobile-menu">
          <button className="menu-icon">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
