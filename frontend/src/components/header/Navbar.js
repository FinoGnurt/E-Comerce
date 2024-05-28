import { ExpandMore, KeyboardArrowRightOutlined } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { Link } from "react-router-dom";

const Navbar = ({ nameLink }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        ":hover .show-when-hover": {
          visibility: "visible",
          opacity: 1,
          top: "100%",
        },
        ":hover": { cursor: "pointer" },
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          left: "20%",
          bottom: 10,
          width: 0,
          borderBottom: "2px solid black",
          transition: "0.3s all",
        },
        "&:hover::after": {
          width: "60%",
        },
        px: "30px",
      }}
    >
      <Typography variant="body1">dsadas</Typography>
      <ExpandMore sx={{ fontSize: "16px", ml: 1 }} />

      <Box
        className="show-when-hover"
        sx={{
          position: "absolute",
          top: "-50%",
          left: "50%",
          minWidth: "130px",
          transform: "TranslateX(-50%)",
          visibility: "hidden",
          opacity: 0,
          transition: "0.2s all",
          zIndex: 50,
        }}
      >
        laskjdkljkalsjl
      </Box>
    </Box>
  );
};

export default Navbar;
