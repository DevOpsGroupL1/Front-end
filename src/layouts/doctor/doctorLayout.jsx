
import { DoctorNavbar } from './components/navbar';
import { TopNav } from './components/topNav';

export const DoctorLayout = ({ children }) => {
  return (
    <main className={"flex !max-h-screen !h-screen w-full"}>
      <aside>
        <DoctorNavbar />
      </aside>

      <div className='w-[84.8%] h-full'>
        <section>
          <TopNav />
        </section>
        <section className={"w-full h-auto"}>
          {children}
        </section>
      </div>
    </main>
  );
};
