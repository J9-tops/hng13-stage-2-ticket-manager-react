import { Outlet } from "react-router-dom";
import "../../styles/dashboard.css";
import DashboardHeader from "../DashboardHeader";

export default function DashboardLayout() {
  return (
    <div className="light dashboard">
      <div className="container">
        <DashboardHeader />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
