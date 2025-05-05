import { GButton, GTextField } from "../../../components/index.js";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerDoctor, activateUser } from "../../../urls/auth.js";
import { toast } from 'react-hot-toast';
import { setCurrentUser } from "../../../redux/reducers/authSlice.js";
import { useApiSend } from "../../../hooks/useApi.js";


export const DoctorSignup = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(SignupSchema),
  });

  const [user, SetUser] = useState(null)
  const navigate = useNavigate()


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

  const { mutate: registerDoc, isPending } = useApiSend(
    registerDoctor,
    (data) => {
      SetUser(data)
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
      userDetail: null,
      doctorDetail: {
        specialization: data.specialization,
      }
    }

    registerDoc(det)
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"w-full flex flex-col gap-4"}
    >
      <GTextField
        label="Full Name"
        name="fName"
        placeholder={"Enter your full name"}
        register={register}
        error={errors.email}
        errorText={errors.email?.message}
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
        name="specialization"
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
      {/* 
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
      )} */}

      <GButton
        type={"submit"}
        isLoading={isPending || isActivating}
        isDisabled={isPending || isActivating}
        label={"Signup"}

      />
    </form>
  );
};
