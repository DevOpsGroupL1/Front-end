import Skeleton from "react-loading-skeleton";
import { useApiGet } from "../../../hooks/useApi.js";
import { getUpcoming } from "../../../urls/patient.js";
import { UpcomingCard } from "./upcomingCard.jsx";

export const Upcoming = () => {

  const { data, isLoading } = useApiGet(
    ['upcoming'],
    () => getUpcoming(),
    {
      enabled: true
    }
  )

  const EmptyUpcoming = () => {
    return (
      <div className={"flex flex-col items-center justify-center h-[60%]"}>
        <p className={"font-semibold text-sm !mb-10 !text-gray-400"}>No Upcoming Medications...</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className={"font-semibold text-xl !mb-10"}>Upcoming</h3>

      {
        isLoading ?
          <div className="flex flex-col gap-1">
            <Skeleton
              baseColor="#3FBDF133"
              height={80}
            />
            <Skeleton
              baseColor="#3FBDF133"
              height={80}
            />
          </div> : (
            data?.length > 0 ? (
              <div className={"flex flex-col gap-3"}>
                <UpcomingCard />
                <UpcomingCard />
              </div>
            ) : <EmptyUpcoming />)

      }
    </div>
  );
};
