import { memo, useState } from "react";
import { USER_TYPE } from "../../../utils";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { PatientLogin } from "./patient.jsx";
import { DoctorLogin } from "./doctor.jsx";
import { Link } from "react-router-dom";
import DOCTOR from "../../../assets/doctor.png"

const Login = () => {
  const [userType, setUserType] = useState(USER_TYPE.PATIENT);
  const handleTypeChange = (e, newValue) => {
    
    setUserType(newValue);
  };

  return (
    <section className={"w-full h-screen flex flex-col justify-center items-center gap-20 bg-gray-100"}>
      <img src={DOCTOR} className="absolute bottom-0 right-0 !z-20 w-[600px] h-[600px] object-cover" />
      <div className="h-screen w-[40%] absolute right-0 bottom-0 bg-[#0F2D6B] flex flex-col !pt-[50px] items-center gap-10 !z-10">
        <div className="w-[80%] !mt-10 !ml-18">
          <h4 className=" text-5xl font-bold">Unlock the world of impossibilities with us.</h4>
          <p className="!mt-5">Keep track of your health.</p>
        </div>
      </div>
      <div className="w-[30%] flex relative !z-20 flex-col justify-center border-1 border-gray-300 gap-20 neumorphism !p-10">
        <div>
          {/* <p className="text-center text-4xl font-bold !text-[#0F2D6B]">Login</p> */}
          <div className={"w-full !mt-5"}>
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
        </div>

        <div>
          {userType === USER_TYPE.PATIENT ? <PatientLogin /> : <DoctorLogin />}
        </div>

        <div className={"mt-4"}>
          <p className="text-center !text-gray-500">
            Already a user?{" "}
            <Link className={"text-blue-400 underline !ml-4"} to={"/register"}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Login);
