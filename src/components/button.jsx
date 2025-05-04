import { Button, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const GButton = ({
  label,
  variant = "contained",
  isDisabled,
  size,
  onClick,
  isLoading,
  type = "submit",
  applyFilter,
  clearFilter,
  ...props
}) => {
  const theme = useTheme();

  const getButtonStyles = () => {
    if (applyFilter) {
      return {
        backgroundColor: "black",
        color: "white",
        "&:hover": {
          backgroundColor: "#333",
        },
      };
    }
    if (clearFilter) {
      return {
        backgroundColor: "transparent",
        color: "black",
        border: "1px solid black",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
          border: "1px solid black",
        },
      };
    }
    return {
      backgroundColor:
        variant === "text" ? "transparent" : "var(--primary-color)",
      color: variant === "text" ? "var(--primary-color)" : "white",
      "&:hover": {
        backgroundColor:
          variant === "text" ? "transparent" : "var(--button-hover)",
      },
    };
  };

  return (
    <Button
      variant={clearFilter ? "outlined" : variant}
      onClick={onClick}
      disabled={isDisabled}
      size={size}
      type={type}
      disableElevation
      sx={{
        width: "100%",
        height: "auto",
        fontWeight: 600,
        textTransform: "none",
        padding: "15px 0",
        fontSize: "14px",
        cursor: "pointer",
        ...getButtonStyles(),
        [theme.breakpoints.down("sm")]: {
          fontSize: "12px",
          padding: "10px 0",
        },
        [theme.breakpoints.between("sm", "md")]: {
          fontSize: "13px",
          padding: "12px 0",
        },
      }}
      {...props}
    >
      {isLoading ? (
        <CircularProgress sx={{ color: "white", width: 20, height: 20 }} />
      ) : typeof label === "function" ? (
        label()
      ) : (
        label
      )}
    </Button>
  );
};
