import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { patientRoutes } from "../authRoute/data.js";
import { PatientLayout } from "../../layouts/patient/patientLayout.jsx";

export const MainRouter = () => {
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
