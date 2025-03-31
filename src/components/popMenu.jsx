import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const PopMenu = ({ options, children }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {children ? (
                <div onClick={handleClick}>{children}</div>
            ) : (
                <Button
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    variant="contained"
                >
                    Open Menu
                </Button>
            )}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} onClick={() => {
                        option.action();
                        handleClose();
                    }}
                        className="!text-sm !text-gray-700 hover:!bg-blue-500 hover:!text-white"
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
