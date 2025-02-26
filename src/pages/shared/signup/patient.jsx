import { GButton, GDatePicker, GTextField } from "../../../components/index.js";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupSchema } from "./schema.js";

export const PatientSignup = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  return (
    <form onSubmit={handleSubmit} className={"w-full flex flex-col gap-4"}>
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
        label="Blood Type"
        name="bloodType"
        placeholder={"Enter blood type"}
        register={register}
        error={errors.bloodType}
        errorText={errors.bloodType?.message}
      />

      <GTextField
        label="Weight"
        name="weight"
        placeholder={"Enter body weight"}
        register={register}
        error={errors.weight}
        errorText={errors.weight?.message}
      />

      <GTextField
        label="Height"
        name="height"
        placeholder={"Enter body height"}
        register={register}
        error={errors.height}
        errorText={errors.height?.message}
      />

      <GDatePicker
        label="Date Of Birth"
        name="dateOfBirth"
        control={control}
        error={!!errors.dateOfBirth}
        errorText={errors.dateOfBirth?.message}
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
        <p className="text-primary-color text-sm">
          {errors.phoneNumber.message}
        </p>
      )}

      <GButton type={"submit"} label={"Login"} />
    </form>
  );
};
