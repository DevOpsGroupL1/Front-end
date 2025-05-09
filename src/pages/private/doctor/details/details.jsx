
import { useLocation, useParams } from "react-router-dom";
import { MedicationCalendar } from "../../../../components/index.js";
import { useApiGet } from "../../../../hooks/useApi.js";
import { getPatientSchedule } from "../../../../urls/doctor.js";

export const DoctorPatientReports = () => {
  const location = useLocation()
  const { id } = useParams()
  const { state } = location

  const { data, isLoading } = useApiGet(
    [`get-schedule-${state?.id ?? id}`],
    () => getPatientSchedule(state?.id ?? id),
    {
      enabled: true
    }
  )

  return (
    <section className={"w-full h-full !p-10 !pb-20"}>
      <h2 className={"text-2xl font-bold !mb-10"}>
        Medical Prescription History
      </h2>
      <div className="!h-[90%]">
        <MedicationCalendar medicationData={data} />
      </div>

    </section>
  );
};

