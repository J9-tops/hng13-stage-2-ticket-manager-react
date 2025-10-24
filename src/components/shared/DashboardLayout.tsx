import { Outlet } from "react-router-dom";
import DashboardHeader from "../DashboardHeader";
import ModalWrapper from "../ModalWrapper";

export default function DashboardLayout() {
  return (
    <>
      <ModalWrapper />
      <div className="light dashboard">
        <div className="container">
          <DashboardHeader />
          <main className="main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
