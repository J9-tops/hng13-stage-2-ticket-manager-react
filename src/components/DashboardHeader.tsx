import { Link, useNavigate } from "react-router-dom";

export default function DashboardHeader() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("current_user");
    navigate("/sign-in");
  };
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-section">
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
        </Link>
        <nav className="nav-links">
          <Link to="/dashboard" className="nav-link">
            Overview
          </Link>
          <Link to="/dashboard/tickets" className="nav-link">
            Manage Tickets
          </Link>
        </nav>
        <div className="nav-buttons">
          <button className="btn-primary" onClick={logout}>
            Logout
          </button>
          <button className="menu-btn">
            <span className="icon">☰</span>
          </button>
        </div>
      </div>
    </header>
  );
}
