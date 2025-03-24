import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { UserDetails } from "./userDetails.jsx";
import { Upcoming } from "./upcoming.jsx";
import { RecentlyTaken } from "./recently.jsx";

export const PatientSidebar = () => {
  return (
    <div
      className={
        "!py-3 !px-3 !pb-10 bg-[#0F2D6B] w-full h-screen flex flex-col justify-between"
      }
    >
      <div>
        <section className={"w-full flex justify-end !mb-10"}>
          <NotificationsOutlinedIcon sx={{ color: "white" }} />
        </section>
        <div>
          <UserDetails />
        </div>
      </div>

      <div>
        <Upcoming />
      </div>
      <div>
        <RecentlyTaken />
      </div>
    </div>
  );
};
