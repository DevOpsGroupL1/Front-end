
import { GCalendar } from "../../../../components/index.js";

export const DoctorPatientReports = () => {
  return (
    <section className={"w-full h-full !p-10"}>
      <h2 className={"text-2xl font-bold !mb-10"}>
        Medical Prescription History
      </h2>
      <GCalendar />
    </section>
  );
};
