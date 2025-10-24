import { LayoutDashboard, LogOut, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userJSON = localStorage.getItem("current_user");
    if (userJSON) {
      try {
        setCurrentUser(JSON.parse(userJSON));
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    setCurrentUser(null);
    toast.success("Logged out successfully");
    closeSidebar();
    navigate("/");
  };

  return (
    <>
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
          <div className="nav-buttons">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="btn btn-login">
                  <span>Dashboard</span>
                </Link>
                <button onClick={handleLogout} className="btn btn-get-started">
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="btn btn-login">
                  <span>Login</span>
                </Link>
                <Link to="/sign-up" className="btn btn-get-started">
                  <span>Get Started</span>
                </Link>
              </>
            )}
          </div>
          <div className="mobile-menu">
            <button className="menu-icon" onClick={toggleSidebar}>
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
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
          <button className="close-btn" onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>

        <div className="sidebar-content">
          {currentUser && (
            <div className="user-info">
              <div className="user-avatar">
                <User size={20} />
              </div>
              <div className="user-details">
                <p className="user-status">Signed in</p>
              </div>
            </div>
          )}

          <nav className="sidebar-nav">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="sidebar-link"
                  onClick={closeSidebar}
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
                <button className="sidebar-link logout" onClick={handleLogout}>
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="sidebar-link"
                  onClick={closeSidebar}
                >
                  <span>Login</span>
                </Link>
                <Link
                  to="/sign-up"
                  className="sidebar-link primary"
                  onClick={closeSidebar}
                >
                  <span>Get Started</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
