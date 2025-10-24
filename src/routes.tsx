import type { RouteObject } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "./components/pages/LandingPage";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import NotFound from "./components/shared/NotFound";

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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
