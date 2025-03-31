import { PATIENT_MENUS } from "../../../utils/index.js";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/logo.png";

export const PatientNavbar = () => {
  const route = useLocation();
  const currentRoute = route.pathname;
  return (
    <nav className="py-6 px-4 bg-[#0F2D6B] w-full h-screen flex flex-col">
      <img
        src={Logo}
        alt="Logo"
        className="w-[300px] h-[20px] object-contain mb-8"
      />
      <div className="flex flex-col gap-2">
        {Object.keys(PATIENT_MENUS).map((key) => (
          <Link to={`${PATIENT_MENUS[key]}`} key={key} className="w-full">
            <div
              className={`relative w-full text-sm rounded-lg transition-all duration-300 ease-in-out ${
                currentRoute === PATIENT_MENUS[key]
                  ? "bg-gradient-to-r from-[#1A4FBA] to-[#71DDB1] shadow-lg"
                  : "hover:bg-[rgba(63,189,241,0.1)]"
              }`}
            >
              <div className="w-full h-full flex items-center px-4 py-3 text-white font-medium">
                {key}
              </div>
              {currentRoute === PATIENT_MENUS[key] && (
                <div className="absolute left-0 top-0 h-full w-1 bg-white rounded-l-lg"></div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};
