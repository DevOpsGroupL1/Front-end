import LinearScaleIcon from "@mui/icons-material/LinearScale";
import moment from "moment"; // Assuming you're using moment for date formatting

export const RecentlyCard = ({item}) => {
  const formattedIntakeTime = item?.intakeTime 
    ? moment(item.intakeTime).format('h:mma') 
    : '5:00pm';
  
  const formattedRemindAt = item?.remindAt 
    ? moment(item.remindAt).format('h:mma') 
    : '6:00pm';
    
  const formattedDate = item?.intakeTime 
    ? moment(item.intakeTime).format('MM/DD/YY') 
    : '11/02/15';

  return (
    <div className={"w-full !p-5 bg-[rgba(63,189,241,0.2)] rounded-xl"}>
      <div className={"w-full flex justify-between items-center"}>
        <p className={"font-semibold"}>{item?.dosage} dosage</p>
        <LinearScaleIcon sx={{ color: "white" }} />
      </div>

      <div className={"flex justify-between"}>
        <div>
          <p className={"text-xs"}>{formattedIntakeTime} - {formattedRemindAt}</p>
          <p className={"text-xs"}>Medication: {item?.description}</p>
          <p className={"text-xs"}>Reminded: {item?.reminded || "No"}</p>
        </div>

        <p className={"text-xs"}>{formattedDate}</p>
      </div>
    </div>
  );
};