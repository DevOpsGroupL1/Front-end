import { Checkbox, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.grey[400],
  "&.Mui-checked": {
    color: "var(--primary-color, #1976d2)",
  },
}));

export const GCheckbox = ({ label, ...props }) => {
  return (
    <FormControlLabel
      control={<StyledCheckbox {...props} />}
      label={label || ""}
    />
  );
};
