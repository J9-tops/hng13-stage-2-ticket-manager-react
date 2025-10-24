import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function DashboardHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("current_user");
    navigate("/sign-in");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
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
          <NavLink
            to="/dashboard"
            end
            className="nav-link"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
              color: isActive ? "#13A4EC" : "#333333",
            })}
          >
            Overview
          </NavLink>
          <NavLink
            to="/dashboard/tickets"
            end
            className="nav-link"
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
              color: isActive ? "#13A4EC" : "#333333",
            })}
          >
            Manage Tickets
          </NavLink>
        </nav>
        <div className="nav-buttons">
          <button className="btn-primary" onClick={logout}>
            Logout
          </button>
          <button className="menu-btn" onClick={toggleSidebar}>
            <span className="icon">☰</span>
          </button>
        </div>

        {isSidebarOpen && (
          <div className="sidebar-overlay" onClick={closeSidebar} />
        )}

        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <div className="sidebar-header">
            <h2 className="sidebar-title">Menu</h2>
            <button className="sidebar-close" onClick={closeSidebar}>
              ✕
            </button>
          </div>
          <nav className="sidebar-nav">
            <NavLink
              to="/dashboard"
              end
              className="sidebar-link"
              onClick={closeSidebar}
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                backgroundColor: isActive
                  ? "rgba(19, 164, 236, 0.1)"
                  : "transparent",
                color: isActive ? "#13A4EC" : "#333333",
              })}
            >
              Overview
            </NavLink>
            <NavLink
              to="/dashboard/tickets"
              end
              className="sidebar-link"
              onClick={closeSidebar}
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                backgroundColor: isActive
                  ? "rgba(19, 164, 236, 0.1)"
                  : "transparent",
                color: isActive ? "#13A4EC" : "#333333",
              })}
            >
              Manage Tickets
            </NavLink>
            <button className="sidebar-logout" onClick={logout}>
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
