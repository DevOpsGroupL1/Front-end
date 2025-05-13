import { useApiGet } from "../../../../hooks/useApi";
import { getMyReports } from "../../../../urls";
import { MedicationCalendar } from "../../../../components";

export const PatientReports = () => {

  const { data, isLoading } = useApiGet(
    ['get-my-reports'],
    () => getMyReports(),
    {
      enabled: true
    }
  )
  const views = ['month', 'week', 'day']

  return (
    <section className={"w-full h-full !p-10"}>
      <h2 className={"text-2xl font-bold !mb-10"}>
        Medical Prescription History
      </h2>
      <div className="!w-[65vw] !h-[87vh]">
        <MedicationCalendar
          darkMode medicationData={data} />
      </div>
    </section>
  );
};
