import { useSelector } from "react-redux"


export const TopNav = () => {
    const user = useSelector((state) => state?.auth);
    return (
        <div className="w-full flex items-center justify-between bg-gray-100 !p-2">
            <div>
                <h1 className="!text-blue-950 font-bold text-2xl">Dashboard</h1>
                <p className="!text-gray-500 text-sm">Patients</p>
            </div>
            <div className="flex items-center gap-2">
                <img src={"https://www.shareicon.net/data/512x512/2016/09/15/829472_man_512x512.png"} className="w-[30px] bg-[#0F2D6B] h-[30px] rounded-full" alt="user" />
                <div>
                    <h6 className="!text-blue-950 font-bold text-sm">{`Dr.${user?.user?.fName} ${user?.user?.lName}`}</h6>
                    <p className="!text-gray-500 text-sm">{user?.user?.doctorDetail?.specialization}</p>
                </div>
            </div>
        </div>
    )
}