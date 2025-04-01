
import { Routes, Route } from 'react-router-dom';
import { patientRoutes } from '../authRoute/data';
import { Suspense } from 'react';
import { PatientLayout } from '../../layouts/patient/patientLayout';


export const PatientRouter = () => {
    return (
        <Routes>
            {patientRoutes.map(({ path, element: Element }, index) => (
                <Route
                    key={index}
                    path={path}
                    element={
                        <Suspense fallback={<p>Loading...</p>}>
                            <PatientLayout>
                                <Element />
                            </PatientLayout>
                        </Suspense>
                    }
                />
            ))}
        </Routes>
    );
};
