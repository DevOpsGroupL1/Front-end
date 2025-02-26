import { GButton, GTextField } from "../../../components/index.js";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupSchema } from "./schema.js";

export const DoctorSignup = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = () => {
    console.log("hahha");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"w-full flex flex-col gap-4"}
    >
      <GTextField
        label="Full Name"
        name="fullName"
        placeholder={"Enter your full name"}
        register={register}
        error={errors.email}
        errorText={errors.email?.message}
      />

      <GTextField
        label="Email"
        name="email"
        placeholder={"Enter your email"}
        register={register}
        error={errors.email}
        errorText={errors.email?.message}
      />

      <GTextField
        label="Occupation"
        name="occupation"
        placeholder={"Enter your occupation"}
        register={register}
        error={errors.occupation}
        errorText={errors.occupation?.message}
      />

      <GTextField
        label="Password"
        name="password"
        placeholder={"Enter your password"}
        register={register}
        error={errors.password}
        errorText={errors.password?.message}
      />
      <GTextField
        label="Confirm Password"
        name="confirmPassword"
        placeholder={"Confirm Password"}
        register={register}
        error={errors.confirmPassword}
        errorText={errors.confirmPassword?.message}
      />

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <PhoneInput
            {...field}
            defaultCountry="UK"
            international
            placeholder="Enter phone number"
            className="custom-phone-input"
          />
        )}
      />
      {errors.phoneNumber && (
        <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
      )}

      <GButton type={"submit"} label={"Login"} />
    </form>
  );
};
