import { lazy } from "react";
import { Home } from "../../pages/private/patient/home/home";

const Login = lazy(() => import("../../pages/shared/login"));
const SignUp = lazy(() => import("../../pages/shared/signup"));

export const authRoutes = [
  {
    path: "/",
    element: Login,
    exact: true,
  },
  {
    path: "/register",
    element: SignUp,
    exact: true,
  },
];

export const patientRoutes = [
  {
    path: "/",
    element: Home,
    exact: true,
  },
  {
    path: "/report",
    element: Home,
    exact: true,
  },
  {
    path: "/details",
    element: Home,
    exact: true,
  },
];