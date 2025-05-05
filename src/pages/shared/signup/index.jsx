import "react-phone-number-input/style.css";
import { memo, useState } from "react";
import { USER_TYPE } from "../../../utils/index.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import { PatientSignup } from "./patient.jsx";
import { DoctorSignup } from "./doctor.jsx";
import DOCTOR from "../../../assets/doctor.png"


const Signup = () => {
  const [userType, setUserType] = useState(USER_TYPE.PATIENT);
  const handleTypeChange = (e, newValue) => {
    console.log(newValue);
    setUserType(newValue);
  };

  return (
    <section className={"w-[30%] h-screen flex flex-col justify-center gap-20"}>
      <img src={DOCTOR} className="absolute bottom-0 right-0 !z-20 w-[600px] h-[600px] object-cover" />
      <div className="h-screen w-[40%] absolute right-0 bottom-0 bg-[#0F2D6B] flex flex-col !pt-[50px] items-center gap-10 !z-10">
        <div className="w-[80%] !mt-10 !ml-16">
          <h4 className=" text-5xl font-bold">Unlock the world of impossibilities with us.</h4>
          <p className="!mt-5">Keep track of your health.</p>
        </div>
      </div>
      <div className={"w-full"}>
        <div className="border-1 border-gray-300 neumorphism relative !z-10 bg-white !p-10">
          <div>
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
        </div>

      </div>


      <div className={"mt-4"}>
        <p className="text-center !text-gray-500">
          Already a user?{" "}
          <Link className={"text-blue-400 underline !ml-5"} to={"/"}>
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default memo(Signup);
