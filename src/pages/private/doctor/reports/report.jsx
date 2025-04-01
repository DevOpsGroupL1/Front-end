import { useNavigate } from "react-router-dom";
import { GTable, PopMenu } from "../../../../components";
import { useState } from 'react';


export const DoctorReports = () => {
  const [selectedTab, setSelectedTab] = useState("in-progress");
  const navigate = useNavigate()

  const tabs = [
    { name: "In Progress", value: "in-progress" },
    { name: "Completed", value: "completed" },
    { name: "Drafts", value: "drafts" },
  ];
  const handleNavigate = (id) => {
    navigate(id);
  }
  const handleTabClick = (tab) => {
    setSelectedTab(tab.value);
  }
  const isTabSelected = (tab) => {
    return selectedTab === tab.value;
  }

  const columns = [
    { id: 'date', label: 'Date Assigned', align: 'left' },
    { id: 'patient', label: 'Patient', align: 'right' },
    { id: 'code', label: 'Patient Code', align: 'right' },
    { id: 'description', label: 'Medical Description', align: 'right' },
    { id: 'status', label: 'Status', align: 'right' },
    { id: 'action', label: 'Action', align: 'right' },
  ];



  const rows = [
    {
      date: '2023-10-15',
      patient: 'John Smith',
      code: 'PT-1234',
      description: 'Influenza Type A',
      status: 'In Treatment',
      action: function () {
        return (
          <PopMenu
            options={[
              { label: "View Details", action: () => handleNavigate(`/details/${this.code}`) },
              { label: "Stop Tracking", action: () => console.log("Stop Tracking clicked") },
              { label: "Set Reminder", action: () => console.log("Set Reminder clicked") },
            ]}
          >
            <span style={{ cursor: "pointer", color: "white" }}>•••</span>
          </PopMenu>
        );
      },
    },
    {
      date: '2023-10-18',
      patient: 'Sarah Johnson',
      code: 'PT-5678',
      description: 'Hypertension Evaluation',
      status: 'Completed',
      action: function () {
        return (
          <PopMenu
            options={[
              { label: "View Details", action: () => handleNavigate(`/details/${this.code}`) },
              { label: "Stop Tracking", action: () => console.log("Stop Tracking clicked") },
              { label: "Set Reminder", action: () => console.log("Set Reminder clicked") },
            ]}
          >
            <span style={{ cursor: "pointer", color: "white" }}>•••</span>
          </PopMenu>
        );
      },
    },
    {
      date: '2023-10-20',
      patient: 'Michael Brown',
      code: 'PT-9012',
      description: 'Diabetes Mellitus Type 2',
      status: 'Scheduled',
      action: function () {
        return (
          <PopMenu
            options={[
              { label: "View Details", action: () => handleNavigate(`/details/${this.code}`) },
              { label: "Stop Tracking", action: () => console.log("Stop Tracking clicked") },
              { label: "Set Reminder", action: () => console.log("Set Reminder clicked") },
            ]}
          >
            <span style={{ cursor: "pointer", color: "white" }}>•••</span>
          </PopMenu>
        );
      },
    },
  ];
  


  return (
    <section className={"w-full h-full !p-10"}>
      <h2 className={"text-2xl font-bold !mb-10"}>
        Medical Prescription History
      </h2>

      <div className="w-full flex justify-between items-center 
      !mb-5">
        <div className="flex items-center gap-2">
          {
            tabs.map((tab) => (
              <div
                key={tab.value}
                onClick={() => handleTabClick(tab)}
                className={`!px-4 !py-2 rounded-md cursor-pointer text-sm ${isTabSelected(tab) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                  }`}
              >
                {tab.name}
              </div>
            ))
          }
        </div>

        <div>
          <button onClick={() => handleNavigate("/add-patient")} className="bg-blue-500 text-sm cursor-pointer !p-2 text-white px-4 py-2 rounded-md">
            Add New Patient
          </button>
        </div>
      </div>
      <div className="!w-full !flex items-center justify-between !mb-4">
        <h5 className="!text-blue-950 font-bold text-2xl">Patients List</h5>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-[10px] h-[10px] rounded-full bg-green-500" />
            <p className="!text-gray-500 text-sm">Completed</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-[10px] h-[10px] rounded-full bg-yellow-500" />
            <p className="!text-gray-500 text-sm">In progress</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-[10px] h-[10px] rounded-full bg-red-500" />
            <p className="!text-gray-500 text-sm">Drafts</p>
          </div>
        </div>
      </div>
      <GTable
        columns={columns}
        data={rows}
        search={false}
        pagination={false}
      />
    </section>
  );
};
