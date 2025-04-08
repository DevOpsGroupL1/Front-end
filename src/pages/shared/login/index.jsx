import { memo, useState } from "react";
import { USER_TYPE } from "../../../utils";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { PatientLogin } from "./patient.jsx";
import { DoctorLogin } from "./doctor.jsx";
import { Link } from "react-router-dom";

const Login = () => {
  const [userType, setUserType] = useState(USER_TYPE.PATIENT);
  const handleTypeChange = (e, newValue) => {
    console.log(newValue);
    setUserType(newValue);
  };
  return (
    <section className={"w-full h-screen flex flex-col justify-center items-center bg-[#002062] gap-20"}>
      <div className="w-[30%] flex flex-col justify-center gap-20">
        <div className={"w-full"}>
          <Tabs
            value={userType}
            onChange={handleTypeChange}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#8ecdf5",
              },
              "& .MuiTab-root": {
                color: "#000000",
                "&.Mui-selected": {
                  color: "#8ecdf5",
                },
              },
            }}
          >
            <Tab value={USER_TYPE.PATIENT} label="Patient" />
            <Tab value={USER_TYPE.DOCTOR} label="Doctor" />
          </Tabs>
        </div>
        <div>
          {userType === USER_TYPE.PATIENT ? <PatientLogin /> : <DoctorLogin />}
        </div>

        <div className={"mt-4"}>
          <p>
            Already a user?{" "}
            <Link className={"text-blue-400 underline"} to={"/register"}>
              Sign up
            </Link>
          </p>
        </div>
      </div>

    </section>
  );
};

export default memo(Login);
