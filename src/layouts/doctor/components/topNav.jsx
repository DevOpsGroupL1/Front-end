

export const TopNav = () => {
    return (
        <div className="w-full h-full flex items-center justify-between bg-gray-100 !p-4">
            <div>
                <h1 className="!text-blue-950 font-bold text-2xl">Dashboard</h1>
                <p className="!text-gray-500 text-sm">Patients</p>
            </div>
            <div className="flex items-center gap-2">
                <img src={""} className="w-[40px] bg-[#0F2D6B] h-[40px] rounded-full" alt="user" />
                <div>
                    <h6 className="!text-blue-950 font-bold text-sm">Dr. Victor Ama</h6>
                    <p className="!text-gray-500 text-sm">Urologist</p>
                </div>
            </div>
        </div>
    )
}