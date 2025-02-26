import { AuthRouter } from "./authRoute/authRouter.jsx";

export const AppRouter = () => {
  return (
    <main className={"w-full h-full flex items-center justify-center"}>
      <AuthRouter />
    </main>
  );
};
