import { PatientNavbar } from "./components/navbar.jsx";
import { PatientSidebar } from "./components/sidebar.jsx";

export const PatientLayout = ({children}) => {
  return (
    <main className={"flex items-center h-screen w-full"}>
      <aside>
        <PatientNavbar />
      </aside>

      <section className={"w-full h-full bg-[#002062]"}>
        {children}
      </section>

      <aside className={"w-[35%] h-full "}>
        <PatientSidebar />
      </aside>
    </main>
  );
};
