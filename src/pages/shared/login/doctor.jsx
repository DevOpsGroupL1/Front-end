import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "./schema.js";
import { GButton, GTextField } from "../../../components/index.js";

export const DoctorLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const onSubmit = () => {
    console.log("Login");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"w-full flex flex-col gap-4"}
    >
      <GTextField
        label="Email"
        name="email"
        placeholder={"Email Address"}
        register={register}
        error={errors.email}
        errorText={errors.email?.message}
      />

      <GTextField
        label="Password"
        name="password"
        placeholder={"Enter Password"}
        register={register}
        error={errors.password}
        errorText={errors.password?.message}
      />

      <GButton type={"submit"} label={"Login"} />
    </form>
  );
};
