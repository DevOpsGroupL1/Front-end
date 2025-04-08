import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";

export const GTimePicker = ({ label, value, onChange }) => {
  return (
    <TimePicker
      label={label}
      value={value}
      onChange={onChange}
      slots={{
        textField: TextField,
      }}
      className={"w-full"}
      slotProps={{
        textField: {
          sx: {
            "& label": {
              color: "gray",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "var(--border-gray)",
              },
              "&:hover fieldset": {
                borderColor: "var(--primary-color)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--primary-color)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--primary-color)",
              },
            },
          },
        },
      }}
    />
  );
};
