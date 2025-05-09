import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { DoctorLayout } from "../../layouts/doctor/doctorLayout.jsx";
import { doctorRoutes } from "../authRoute/data.js";


export const DoctorRouter = () => {
    return (
        <Routes>
            {doctorRoutes.map(({ path, element: Element }, index) => (
                <Route
                    key={index}
                    path={path}
                    element={
                        <Suspense fallback={<p>Loading...</p>}>
                            <DoctorLayout>
                                <Element />
                            </DoctorLayout>
                        </Suspense>
                    }
                />
            ))}
        </Routes>
    );
};
