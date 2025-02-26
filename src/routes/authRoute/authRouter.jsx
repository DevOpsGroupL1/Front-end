import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { authRoutes } from "./data.js";

export const AuthRouter = () => {
  return (
    <Routes>
      {authRoutes.map(({ path, element: Element }, index) => (
        <Route
          key={index}
          path={path}
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <Element />
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};
