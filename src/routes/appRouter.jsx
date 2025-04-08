import { AuthRouter } from "./authRoute/authRouter.jsx";
import { MainRouter } from "./mainRoute/mainRouter.jsx";

export const AppRouter = () => {
  return (
    <main className={"w-full h-full flex items-center justify-center"}>
      <AuthRouter />
      {/* <MainRouter/> */}
    </main>
  );
};
