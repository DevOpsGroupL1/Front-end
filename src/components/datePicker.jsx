import { DatePicker } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";

export const GDatePicker = ({ label, name, control, error, errorText }) => {
  return (
    <div style={{ width: "100%" }}>
      {" "}
      {/* Set the container to 100% width */}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <DatePicker
              {...field}
              label={label}
              slotProps={{
                textField: {
                  error: !!fieldState.error,
                  fullWidth: true, // Make the TextField full width
                },
              }}
              sx={{
                width: "100%", // Set DatePicker width to 100%
                "& label": {
                  color: "gray",
                },
                "& .MuiOutlinedInput-root": {
                  width: "100%", // Ensure the input is full width
                  "& fieldset": {
                    borderColor: fieldState.error
                      ? "var(--error-color)"
                      : "var(--border-gray)",
                  },
                  "&:hover fieldset": {
                    borderColor: fieldState.error
                      ? "var(--error-color)"
                      : "var(--primary-color)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: fieldState.error
                      ? "var(--error-color)"
                      : "var(--primary-color)",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: fieldState.error
                      ? "var(--error-color)"
                      : "var(--primary-color)",
                  },
                },
              }}
            />
          </>
        )}
      />
      {error && <p className="text-red-500 text-sm">{errorText}</p>}
    </div>
  );
};
