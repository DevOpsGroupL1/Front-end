import { lazy } from "react";
import { Home } from "../../pages/private/patient/home/home";
import { PatientReports } from "../../pages/private/patient/reports/report.jsx";
import { DoctorReports } from "../../pages/private/doctor/reports/report.jsx";
import { DoctorPatientReports } from "../../pages/private/doctor/details/details.jsx";
import { AddPatient } from "../../pages/private/doctor/addPatient/addPatient.jsx";


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
    element: PatientReports,
    exact: true,
  },
  {
    path: "/details",
    element: Home,
    exact: true,
  },
];

export const doctorRoutes = [
  {
    path: "/patients",
    element: DoctorReports,
    exact: true,
  },
  {
    path: "/details/:id",
    element: DoctorPatientReports,
    exact: true,
  },
  {
    path: "/add-patient",
    element: AddPatient,
    exact: true,
  },
];
