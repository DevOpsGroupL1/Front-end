
import { DoctorNavbar } from './components/navbar';
import { TopNav } from './components/topNav';

export const DoctorLayout = ({ children }) => {
  return (
    <main className={"flex items-center h-screen w-full"}>
      <aside>
        <DoctorNavbar />
      </aside>

      <aside className={"w-[84.8%] absolute top-0 right-0"}>
        <TopNav />
      </aside>

      <section className={"w-full h-full bg-white"}>
        {children}
      </section>

    </main>
  );
};
