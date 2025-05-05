import { useNavigate } from "react-router-dom";
import { GTable, PopMenu } from "../../../../components";
import { useState, useMemo } from 'react';
import { useApiGet } from "../../../../hooks/useApi";
import { getUsers } from "../../../../urls/doctor";
import { filterPatients } from "../../../../utils";



export const DoctorReports = () => {
  const [selectedTab, setSelectedTab] = useState("in-progress");
  const navigate = useNavigate()

  const { data, isLoading } = useApiGet(
    ['get-patients'],
    () => getUsers(),
    {
      enabled: true
    }
  )


  const tabs = [
    { name: "In Progress", value: "in-progress" },
    { name: "Completed", value: "completed" },
    { name: "Drafts", value: "drafts" },
  ];
  const handleNavigate = (route, data) => {
    
    navigate(route, {
      state: { ...data }
    });
  }
  const handleTabClick = (tab) => {
    setSelectedTab(tab.value);
  }
  const isTabSelected = (tab) => {
    return selectedTab === tab.value;
  }

  const columns = [
    { id: 'date', label: 'Date Of Birth', align: 'left' },
    { id: 'patient', label: 'Patient Name', align: 'left' },
    { id: 'code', label: 'Patient Code', align: 'left' },
    { id: 'bmi', label: 'BMI', align: 'left' },
    { id: 'email', label: 'Email', align: 'left' },
    { id: 'action', label: 'Action', align: 'left' },
  ];



  const rows = useMemo(() => {
    const patients = filterPatients(data);
    return patients?.map((patient) => ({
      id: patient?.id,
      date: patient?.dob,
      patient: patient?.name,
      code: patient?.code,
      bmi: Math.round(patient?.bmi * 100) / 100,
      email: patient?.email,
      action: function () {
        
        return (
          <PopMenu
            options={[
              { label: "View Details", action: () => handleNavigate(`/details/${patient.id}`, patient) },
              { label: "Add prescription", action: () => handleNavigate("/add-patient", patient) },
            ]}
          >
            <span style={{ cursor: "pointer", color: "white" }}>•••</span>
          </PopMenu>
        );
      },
    }));
  }, [data]);


  if (isLoading) {
    return (
      <section className={"w-full h-full flex items-center justify-center !p-10"}>
        <h2 className={"text-2xl font-bold !mb-10"}>
          Loading...
        </h2>
      </section>
    )
  }



  return (
    <section className={"w-full !h-full !p-10"}>
      <div className="!w-full !flex items-center justify-between !mb-4">
        <h5 className="!text-blue-950 font-bold text-2xl">Patients List</h5>
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
