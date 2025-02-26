import React from "react";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomSwitch = styled((props) => <Switch {...props} />)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "var(--primary-color, #da190b)",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--primary-color, #da190b)",
  },
}));

export const GSwitch = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <CustomSwitch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "primary switch" }}
      />
    </div>
  );
};
