import { lazy } from "react";

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
