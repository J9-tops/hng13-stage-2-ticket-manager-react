import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const currentUser = localStorage.getItem("ticketapp_session");

  if (!currentUser) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
