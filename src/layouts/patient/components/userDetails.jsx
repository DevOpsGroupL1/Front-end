import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useSelector } from "react-redux";
import { calculateAge } from "../../../utils";

export const UserDetails = () => {
  const user = useSelector((state) => state?.auth);
  return (
    <div
      className={
        "bg-[rgba(63,189,241,0.2)] !p-4 w-full flex flex-col items-center rounded-2xl"
      }
    >
      <img
        src={
          "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid"
        }
        className={"w-[60px] h-[60px] rounded-full !my-4 "}
      />
      <div className={"flex flex-col items-center justify-center"}>
        <h4 className={"font-bold text-xl text-white mb-3"}>{user?.user?.fName} {user?.user?.lName}</h4>
        <div className={"flex items-center gap-2"}>
          <p className={"text-white text-xs border-r-2 !pr-2 border-r-white"}>
            {calculateAge(user?.user?.userDetail?.dob)} years old
          </p>
          <p className={"flex gap-1 items-center text-xs text-white"}>
            {" "}
            <LocationOnOutlinedIcon fontSize={"10"} /> Bolton, Uk
          </p>
        </div>
        <div className={"w-full flex justify-between !mt-4 gap-2"}>
          <div className={"border-r-2 border-r-white !pr-4"}>
            <p className={"text-gray-400 text-xs"}>Blood</p>
            <p className={"text-white text-center font-bold"}>{user?.user?.userDetail?.bloodType}</p>
          </div>
          <div className={"border-r-2 border-r-white !pr-4"}>
            <p className={"text-gray-400 text-xs"}>Height</p>
            <p className={"text-white text-center font-bold"}>{user?.user?.userDetail?.height}m</p>
          </div>
          <div className={""}>
            <p className={"text-gray-400 text-xs"}>Weight</p>
            <p className={"text-white text-center font-bold"}>{user?.user?.userDetail?.weight}kg</p>
          </div>
        </div>
      </div>
    </div>
  );
};
