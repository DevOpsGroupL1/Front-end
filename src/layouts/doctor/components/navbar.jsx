import { DOCTOR_MENUS, PATIENT_MENUS } from "../../../utils/index.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from "react-redux";
import { clearCurrentUser } from "../../../redux/reducers/authSlice.js";

export const DoctorNavbar = () => {
  const route = useLocation();
  const currentRoute = route.pathname;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(clearCurrentUser())
    navigate("/")
  }
  return (
    <nav className="!py-3 !px-3 bg-gray-100 w-full flex flex-col h-screen justify-between border-r-1 border-gray-300">
      <div className="">
        <div className="flex items-center justify-center bg-blue-950 mb-14">
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
                className={`text-white w-full text-sm rounded-md hover:bg-[rgba(63,189,241,0.2)] !p-3 bg-[rgba(63,189,241,0.2)] `}
              >
                <div className="w-full h-full flex items-center text-blue-950 font-bold">{key}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>


      <div className="flex items-center mb-5 cursor-pointer" onClick={logout}>
        <LogoutIcon />
        <p className="!text-blue-950 !ml-2 font-medium">Logout</p>
      </div>
    </nav>
  );
};
