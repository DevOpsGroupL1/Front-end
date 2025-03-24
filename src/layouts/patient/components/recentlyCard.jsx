import LinearScaleIcon from "@mui/icons-material/LinearScale";

export const RecentlyCard = () => {
  return (
    <div className={"w-full !p-5 bg-[rgba(63,189,241,0.2)] rounded-xl"}>
      <div className={"w-full flex justify-between items-center"}>
        <p className={"font-semibold"}>Oxidion Dosage</p>
        <LinearScaleIcon sx={{ color: "white" }} />
      </div>

      <div className={"flex justify-between"}>
        <div>
          <p className={"text-xs"}>5:00pm - 6:00pm</p>
          <p className={"text-xs"}>Medication: 2 tablets of pain killers</p>
        </div>

        <p className={"text-xs"}>11/02/15</p>
      </div>
    </div>
  );
};
