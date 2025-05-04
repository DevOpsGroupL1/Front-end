import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

// Update your GTimePicker component
export const GTimePicker = ({ label, name, control, placeholder }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TimePicker
          label={label}
          value={field.value || null}
          onChange={field.onChange}
          slots={{
            textField: TextField,
          }}
          className={"w-full"}
          slotProps={{
            textField: {
              placeholder: placeholder,
              sx: {
                "& label": {
                  color: "gray",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: fieldState.error ? "red" : "var(--border-gray)",
                  },
                  "&:hover fieldset": {
                    borderColor: fieldState.error ? "red" : "var(--primary-color)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: fieldState.error ? "red" : "var(--primary-color)",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: fieldState.error ? "red" : "var(--primary-color)",
                  },
                },
              },
            },
          }}
        />
      )}
    />
  );
};