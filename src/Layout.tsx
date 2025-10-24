import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <>
      <Toaster position="top-right" />
      <Outlet />
    </>
  );
}
