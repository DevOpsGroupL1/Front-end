import { useSelector } from "react-redux";
import { AuthRouter } from "./authRoute/authRouter.jsx";
import { MainRouter } from "./mainRoute/mainRouter.jsx";

export const AppRouter = () => {
  const user = useSelector((state) => state?.auth);
  if (user)
    return <div className={"w-full h-full flex items-center justify-center"}>
      <MainRouter />
    </div>
  else return <div className={"w-full h-full flex items-center justify-center"}>
    <AuthRouter />
  </div>

};
