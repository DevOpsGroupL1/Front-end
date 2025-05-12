import { useApiGet } from "../../../hooks/useApi.js";
import { getLastTaken } from "../../../urls/patient.js";
import { RecentlyCard } from "./recentlyCard.jsx";
import Skeleton from "react-loading-skeleton";

export const RecentlyTaken = () => {

  const { data, isLoading } = useApiGet(
    ['recently'],
    () => getLastTaken(),
    {
      enabled: true,
      refetchOnWindowFocus: true
    }
  )

  console.log(data, "recently")

  const EmptyRecently = () => {
    return (
      <div className={"flex flex-col items-center justify-center h-[60%]"}>
        <p className={"font-semibold text-sm !mb-10 !text-gray-400"}>No Recent Medications...</p>
      </div>
    )
  }

  return (
    <div>
      <h6 className={"font-bold text-xl !mb-5"}>Recently take dosages</h6>
      {
        isLoading ? (
          <div className="flex flex-col gap-1">
            <Skeleton
              baseColor="#3FBDF133"
              height={80}
            />
          </div>
        ) : (
          data ? (
            <RecentlyCard key={data.id} item={data?.length-1} />
          ) : <EmptyRecently />
        )

      }

    </div>
  );
};
