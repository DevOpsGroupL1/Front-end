import { DOCTOR_MENUS, PATIENT_MENUS } from "../../../utils/index.js";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/logo.png";

export const DoctorNavbar = () => {
  const route = useLocation();
  const currentRoute = route.pathname;
  return (
    <nav className="!py-3 !px-3 bg-gray-100 w-full h-screen">
      <div className="flex items-center justify-center bg-blue-950">
        <img
          src={Logo}
          alt={"Logo"}
          className={"!my-5 !mb-5 w-[300px] h-[20px] object-cover"}
        />
      </div>

      <div className={"flex flex-col gap-2 !mt-10"}>
        {Object.keys(DOCTOR_MENUS).map((key) => (
          <Link to={`${DOCTOR_MENUS[key]}`} key={key}>
            <div
              className={`text-white w-full text-sm rounded-md hover:bg-[rgba(63,189,241,0.2)] !p-3 ${currentRoute === DOCTOR_MENUS[key] ? "bg-[rgba(63,189,241,0.2)]" : "bg-transparent"} `}
            >
              <div className="w-full h-full flex items-center text-blue-950 font-bold">{key}</div>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};
