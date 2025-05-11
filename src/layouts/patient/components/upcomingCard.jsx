import NotificationsIcon from "@mui/icons-material/Notifications";

export const UpcomingCard = ({item}) => {
  return (
    <div
      className={
        "w-full flex items-center gap-4 !pb-10 border-b-1 border-gray-700 hover:bg-[rgba(63,189,241,0.2)] cursor-pointer !rounded-xl p-4 !px-2 !pt-2 transition-all duration-300"
      }
    >
      <div
        className={
          "flex items-center justify-center bg-[rgba(63,189,241,0.2)] rounded-md w-[30px] h-[30px]"
        }
      >
        <NotificationsIcon sx={{ color: "#14d948" }} />
      </div>

      <div className={"flex flex-col gap-1"}>
        <h6 className={"font-bold text-lg"}>{item?.ailment} Medication</h6>
        <p className={"text-sm"}>Dr. {item?.doctor?.fName} {item?.doctor?.lName}</p>
        <p className={"text-sm"}>Dr. {item?.doctor?.doctorDetails?.specialization}</p>
      </div>
    </div>
  );
};
