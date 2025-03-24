import { CircularProgress } from "@mui/material"
import Yoga from "../../../../assets/yoga.png"
export const Home = () => {

    return (
        <div className="w-full h-full !p-10">
            <p className="font-bold text-2xl !mb-10">Dashboard Overview</p>
            <div className="w-full h-[20%] rounded-lg flex justify-between items-center !p-8 bg-gradient-to-r from-[#1A4FBA] to-[#71DDB1] ">
                <div>
                    <p className="text-2xl">Hello, <span className="font-bold">Victor Ama</span></p>
                    <p className="text-sm ">Have a nice day and dont forget to take your medicine, and care of your health</p>
                </div>
                <div>
                    <img src={Yoga} alt="yoga" className="w-[150px] h-[150px] object-cover" />
                </div>
            </div>

            <section className="w-full flex justify-between gap-4 items-center !mt-10">
                <div className="flex w-full gap-4 items-center bg-[#0F2D6B] !p-8 rounded-lg">
                    <CircularProgress value={0.66} color="success" />
                    <div>
                        <p className="text-2xl">Weight loss</p>
                        <p className="text-md !text-green-500">80% decrease</p>
                    </div>
                </div>
                <div className="flex w-full  gap-4 items-center bg-[#0F2D6B] !p-8 rounded-lg">
                    <CircularProgress value={0.66} color="success" />
                    <div>
                        <p className="text-2xl">Weight loss</p>
                        <p className="text-md !text-green-500">80% decrease</p>
                    </div>
                </div>
                <div className="flex w-full  gap-4 items-center bg-[#0F2D6B] !p-8 rounded-lg">
                    <CircularProgress value={0.66} color="success" />
                    <div>
                        <p className="text-2xl">Weight loss</p>
                        <p className="text-sm !text-green-500">80% decrease</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

