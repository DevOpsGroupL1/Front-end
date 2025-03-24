import { UpcomingCard } from "./upcomingCard.jsx";

export const Upcoming = () => {
  return (
    <div>
      <h3 className={"font-semibold text-xl !mb-10"}>Upcoming</h3>
      <div className={"flex flex-col gap-3"}>
        <UpcomingCard />
        <UpcomingCard />
      </div>
    </div>
  );
};
