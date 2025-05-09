import { useSelector } from 'react-redux';
import { DoctorRouter } from './doctorRouter';
import { PatientRouter } from './patientRouter';

export const MainRouter = () => {
    const user = useSelector((state) => state?.auth);
    
    if (user?.user?.userRole?.id === 1) {
        return <PatientRouter />
    }
    else {
        return <DoctorRouter />
    }
}