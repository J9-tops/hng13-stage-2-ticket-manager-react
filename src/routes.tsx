import type { RouteObject } from "react-router-dom";
import DashboardLayout from "./components/shared/DashboardLayout";
import NotFound from "./components/shared/NotFound";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
