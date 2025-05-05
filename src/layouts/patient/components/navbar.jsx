import { PATIENT_MENUS } from "../../../utils/index.js";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCurrentUser } from "../../../redux/reducers/authSlice.js";



export const PatientNavbar = () => {
  const route = useLocation();
  const currentRoute = route.pathname;
  const dispatch = useDispatch()
  const navigate = useNavigate()



  const logout = () => {
    dispatch(clearCurrentUser())
    navigate("/")
  }


  return (
    <nav className="py-6 px-4 bg-[#0F2D6B] w-full h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <img
          src={Logo}
          alt="Logo"
          className="w-[300px] h-[60px] object-contain !mb-8"
        />
        {Object.keys(PATIENT_MENUS).map((key) => (
          <Link to={`${PATIENT_MENUS[key]}`} key={key} className="w-full">
            <div
              className={`!py-2 !px-4 relative w-full text-sm rounded-lg transition-all duration-300 ease-in-out ${currentRoute === PATIENT_MENUS[key]
                ? "bg-gradient-to-r from-[#1A4FBA] to-[#71DDB1] shadow-lg"
                : "hover:bg-[rgba(63,189,241,0.1)]"
                }`}
            >
              <div className="w-full h-full flex items-center px-4 py-3 text-white font-medium text-md ">
                {key}
              </div>
              {currentRoute === PATIENT_MENUS[key] && (
                <div className="absolute left-0 top-0 h-full w-1 bg-white rounded-l-lg"></div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center !mb-5 cursor-pointer" onClick={logout}>
        <p className="!ml-2 text-md font-medium !text-white">Logout</p>
      </div>
    </nav>
  );
};
