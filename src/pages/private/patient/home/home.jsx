import { useSelector } from "react-redux";
import Yoga from "../../../../assets/yoga.png";
import { GTable } from "../../../../components/index.js";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useApiGet } from "../../../../hooks/useApi.js";
import { getDashboard, getLastTaken, getUpcoming } from "../../../../urls/patient.js";
import { useMemo } from "react";
import { formatReadableDateTime } from "../../../../utils/utils.js";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
// import AnimatedProgressProvider from "./AnimatedProgressProvider";

export const Home = () => {
  const user = useSelector((state) => state?.auth);
  const percentage = user?.health;
  const navigate = useNavigate()
  const { data, isLoading } = useApiGet(
    ['dashboard'],
    () => getDashboard(),
    {
      enabled: true
    }
  )

  const columns = [
    { id: 'ailment', label: 'Ailment', align: 'left' },
    { id: 'doctor', label: 'Doctor', align: 'left' },
    { id: 'drugName', label: 'Drug', align: 'left' },
    { id: 'prescription', label: 'Prescription', align: 'left' },
    { id: 'startDate', label: 'Start Date', align: 'left' },
    { id: 'endDate', label: 'End Date', align: 'left' },

  ];

  const rows = useMemo(() => {
    return data?.map((pres) => ({
      id: pres?.id,
      ailment: pres?.ailment,
      doctor: `${pres?.doctor?.fName} ${pres?.doctor?.lName}`,
      drugName: pres?.drugName,
      prescription: pres?.prescription,
      startDate: formatReadableDateTime(pres?.startDate),
      endDate: formatReadableDateTime(pres?.endDate),
    }));
  }, [data]);


  return (
    <div className="w-full h-full !p-10">
      <p className="font-bold text-2xl !mb-10">Dashboard Overview</p>
      <div className="w-full h-[20%] rounded-lg flex justify-between items-center !p-8 bg-gradient-to-r from-[#1A4FBA] to-[#71DDB1] ">
        <div>
          <p className="text-2xl">
            Hello, <span className="font-bold">{user?.user?.fName} {user?.user?.lName}</span>
          </p>
          <p className="text-sm ">
            Have a nice day and don&apos;t forget to take your medicine, and care of
            your health
          </p>
        </div>
        <div>
          <img
            src={Yoga}
            alt="yoga"
            className="w-[150px] h-[150px] object-cover"
          />
        </div>
      </div>

      <section className="w-full flex justify-between gap-4 items-center !mt-10">
        <div className="flex w-full gap-4 items-center bg-[#0F2D6B] !p-8 rounded-lg">
          {/* <div className={"w-[70px] h-[70px]"}>
            <CircularProgressbar
              value={percentage}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `rgba(36, 224, 86, ${percentage / 100})`,
                textColor: "!text-green-500",
                backgroundColor: "#3e98c7",
              })}
            />
          </div> */}

          <div>
            <p className="text-xl">Expected Water
              intake</p>
            <p className="text-md !text-green-500">&#8593; {user?.litre} litres</p>
          </div>
        </div>
        <div className="flex w-full  gap-4 items-center bg-[#0F2D6B] !p-8 rounded-lg">
          {/* <div className={"w-[70px] h-[70px]"}>
            <CircularProgressbar
              value={percentage}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `rgba(36, 224, 86, ${percentage / 100})`,
                textColor: "!text-green-500",
                backgroundColor: "#3e98c7",
              })}
            />
          </div> */}

          <div>
            <p className="text-xl">Weight Loss</p>
            <p className="text-md !text-green-500">&#8593; {user?.weightLoss} kg</p>
          </div>
        </div>
        <div className="flex w-full  gap-4 items-center bg-[#0F2D6B] !p-8 rounded-lg">
          {/* <div className={"w-[70px] h-[70px]"}>
            <CircularProgressbar
              value={percentage}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `rgba(36, 224, 86, ${percentage / 100})`,
                textColor: "!text-green-500",
                backgroundColor: "#3e98c7",
              })}
            />
          </div> */}

          <div>
            <p className="text-xl">Personal Doctor</p>
            <p className="text-sm !text-green-500">{data?.length > 0 && data[0]?.doctor?.fName} {data?.length > 0 && data[0]?.doctor?.lName}, {data?.length > 0 && data[0]?.doctor?.doctorDetail?.specialization}</p>
          </div>
        </div>
      </section>

      <section
        className={"flex w-full items-center justify-between !mt-10 gap-6"}
      >
        <div>
          {
            isLoading ?
              <Skeleton
                baseColor="#3FBDF133"
                height={150}
                className="!w-[40vw]"
              />
              :
              data?.length > 0 ? (
                <GTable
                  columns={columns}
                  data={rows}
                  search false
                  pressable
                  onRowClick={() => navigate('/report')}
                />) :
                <div className="!w-[40vw] !h-full flex items-center justify-center">
                  <p className="text-sm text-gray-400">No Medical Prescriptions Yet...</p>
                </div>
          }

        </div>
        <div
          className={
            "bg-[#0F2D6B] flex flex-col items-center justify-center gap-4 h-[340px] rounded-xl w-full"
          }
        >
          <div className={"h-[200px] w-[200px]"}>
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "12px",
                width: "60px",
                height: "60px",
                pathTransitionDuration: 0.5,
                pathColor: `rgba(36, 224, 86, ${percentage / 100})`,
                textColor: "!text-green-500",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>

          <div>
            <h6 className={"text-center"}>Chances of Getting Better</h6>
            <p className={"text-center text-sm"}>
              You&apos;ve been doing really well
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
