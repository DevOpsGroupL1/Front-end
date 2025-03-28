import Yoga from "../../../../assets/yoga.png";
import { GTable } from "../../../../components/index.js";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import AnimatedProgressProvider from "./AnimatedProgressProvider";

export const Home = () => {
  const percentage = 60;

  return (
    <div className="w-full h-full !p-10">
      <p className="font-bold text-2xl !mb-10">Dashboard Overview</p>
      <div className="w-full h-[20%] rounded-lg flex justify-between items-center !p-8 bg-gradient-to-r from-[#1A4FBA] to-[#71DDB1] ">
        <div>
          <p className="text-2xl">
            Hello, <span className="font-bold">Victor Ama</span>
          </p>
          <p className="text-sm ">
            Have a nice day and dont forget to take your medicine, and care of
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
          <div className={"w-[150px] h-[150px]"}>
            <CircularProgressbar
              value={percentage}
              // text={`${percentage}%`}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.25,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                textSize: "16px",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',
                // Colors
                pathColor: `rgba(36, 224, 86, ${percentage / 100})`,
                textColor: "!text-green-500",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>

          <div>
            <p className="text-xl">Weight loss</p>
            <p className="text-md !text-green-500">80% decrease</p>
          </div>
        </div>
        <div className="flex w-full  gap-4 items-center bg-[#0F2D6B] !p-8 rounded-lg">
          <div className={"w-[150px] h-[150px]"}>
            <CircularProgressbar
              value={percentage}
              // text={`${percentage}%`}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.25,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",

                // Text size
                textSize: "16px",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',
                // Colors
                pathColor: `rgba(36, 224, 86, ${percentage / 100})`,
                textColor: "!text-green-500",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>

          <div>
            <p className="text-xl">Weight loss</p>
            <p className="text-md !text-green-500">80% decrease</p>
          </div>
        </div>
        <div className="flex w-full  gap-4 items-center bg-[#0F2D6B] !p-8 rounded-lg">
          <div className={"w-[150px] h-[150px]"}>
            <CircularProgressbar
              value={percentage}
              // text={`${percentage}%`}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.25,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",

                // Text size
                textSize: "16px",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',
                // Colors
                pathColor: `rgba(36, 224, 86, ${percentage / 100})`,
                textColor: "!text-green-500",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>

          <div>
            <p className="text-xl">Weight loss</p>
            <p className="text-sm !text-green-500">80% decrease</p>
          </div>
        </div>
      </section>

      <section
        className={"flex w-full items-center justify-between !mt-10 gap-6"}
      >
        <div>
          <GTable />
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
              You've been doing really well
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
