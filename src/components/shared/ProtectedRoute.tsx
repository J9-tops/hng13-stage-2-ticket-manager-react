import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const currentUser = localStorage.getItem("current_user");

  // If no user is logged in, redirect to sign-in page
  if (!currentUser) {
    return <Navigate to="/sign-in" replace />;
  }

  // If user is logged in, render the child routes
  return <Outlet />;
}
