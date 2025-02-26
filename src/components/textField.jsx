import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const GTextField = ({
  label,
  placeholder,
  isDisabled = false,
  required,
  inputType = "text",
  multiline,
  white,
  value,
  name,
  error,
  errorText = "",
  focus = () => {},
  register,
  startIcon,
  endIcon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const startAdornment = startIcon ? (
    <InputAdornment position="start">{startIcon}</InputAdornment>
  ) : null;

  const passwordEndAdornment =
    inputType === "password" ? (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </InputAdornment>
    ) : null;

  return (
    <div className="w-full">
      <TextField
        id="outlined-basic"
        label={label}
        value={value}
        type={inputType === "password" && showPassword ? "text" : inputType}
        onFocus={focus}
        multiline={multiline}
        placeholder={placeholder}
        disabled={isDisabled}
        required={required}
        className="w-full"
        InputProps={{
          startAdornment: startAdornment,
          endAdornment: passwordEndAdornment || endIcon,
        }}
        sx={{
          backgroundColor: white ? "white" : "inherit",
          minHeight: multiline ? "100px !important" : "auto",
          "& label": {
            color: "gray",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: white ? "transparent" : "var(--border-gray)",
              minHeight: multiline ? "100px !important" : "auto",
            },
            "&:hover fieldset": {
              borderColor: white ? "transparent" : "var(--primary-color)",
            },
            "&.Mui-focused fieldset": {
              borderColor: white ? "transparent" : "var(--primary-color)",
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "var(--primary-color)",
            },
          },
        }}
        {...(register && name ? register(name) : {})}
        {...props}
      />
      {error && errorText && (
        <p className="text-red-500 text-sm">{errorText}</p>
      )}
    </div>
  );
};
