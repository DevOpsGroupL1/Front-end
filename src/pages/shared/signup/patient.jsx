import { GButton, GDatePicker, GTextField } from "../../../components/index.js";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupSchema } from "./schema.js";
import { useApiSend } from "../../../hooks/useApi.js";
import { activateUser, registerPatient } from "../../../urls";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setCurrentUser } from "../../../redux/reducers/authSlice.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const PatientSignup = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const { mutate: activate, isPending: isActivating } = useApiSend(
    activateUser,
    (data) => {
      if (data?.responseCode === "99") {
        toast.error(data?.responseMessage);
        return;
      }
      else {
        toast.success("Registration successful");
        toast.toString("Please login to continue");
        navigate("/")
      }
    },
    () => {
      toast.error("Registration failed");
    }
  )


  const { mutate, isPending } = useApiSend(
    registerPatient,
    (data) => {
      setUser(data)
      activate(data?.id)

    },
    () => {
      toast.error("Registration failed");
    }
  )


  const onSubmit = (data) => {
    
    const det = {
      fName: data.fName,
      mName: data.mName,
      lName: data.lName,
      email: data.email,
      password: data.password,
      userDetail: {
        dob: data.dateOfBirth,
        height: data.height,
        weight: data.weight,
        bloodType: data.bloodType,
      }
    }
    mutate(det)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"w-full flex flex-col gap-4"}>
      <GTextField
        label="First Name"
        name="fName"
        placeholder={"Enter your first name"}
        register={register}
        error={errors.fName}
        errorText={errors.fName?.message}
      />
      <GTextField
        label="Middle Name"
        name="mName"
        placeholder={"Enter your middle name"}
        register={register}
        error={errors.mName}
        errorText={errors.mName?.message}
      />
      <GTextField
        label="Last Name"
        name="lName"
        placeholder={"Enter your last name"}
        register={register}
        error={errors.lName}
        errorText={errors.lName?.message}
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
        label="Password"
        name="password"
        inputType="password"
        placeholder={"Enter Password"}
        register={register}
        error={errors.password}
        errorText={errors.password?.message}
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

      {/* <Controller
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
      /> */}
      {errors.phoneNumber && (
        <p className="text-primary-color text-sm">
          {errors.phoneNumber.message}
        </p>
      )}

      <GButton isLoading={isPending || isActivating} type={"submit"} label={"Sign Up"} />
    </form>
  );
};
