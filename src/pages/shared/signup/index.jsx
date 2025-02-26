import "react-phone-number-input/style.css";
import { memo, useState } from "react";
import { USER_TYPE } from "../../../utils/index.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import { PatientSignup } from "./patient.jsx";
import { DoctorSignup } from "./doctor.jsx";

const Signup = () => {
  const [userType, setUserType] = useState(USER_TYPE.PATIENT);
  const handleTypeChange = (e, newValue) => {
    console.log(newValue);
    setUserType(newValue);
  };

  return (
    <section className={"w-[30%] h-screen flex flex-col justify-center gap-20"}>
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
        {userType === USER_TYPE.PATIENT ? <PatientSignup /> : <DoctorSignup />}
      </div>

      <div className={"mt-4"}>
        <p>
          Already a user?{" "}
          <Link className={"text-blue-400 underline"} to={"/register"}>
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default memo(Signup);
