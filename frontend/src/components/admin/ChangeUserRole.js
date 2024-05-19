import React, { useState } from "react";
import { Backdrop, Box, Button, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ROLE from "../../common/role";
import SummaryApi from "../../common";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ChangeUserRole = ({
  userId,
  firstName,
  lastName,
  email,
  role,
  onClose,
  callFunc,
}) => {
  const [userRole, setUserRole] = useState(role);
  const handleOnChangeSelect = (event) => {
    setUserRole(event.target.value);

    console.log(event.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
    console.log("role update", responseData);
  };

  return (
    <div>
      <Box sx={style}>
        <Button onClick={onClose}>Close</Button>
        <Typography
          id="spring-modal-title"
          variant="h6"
          component="h2"
          textAlign={"center"}
        >
          Change User Role
        </Typography>
        <Typography id="spring-modal-description" sx={{ mt: 2 }}>
          First Name: {firstName}
        </Typography>
        <Typography id="spring-modal-description" sx={{ mt: 2 }}>
          Last Name: {lastName}
        </Typography>
        <Typography id="spring-modal-description" sx={{ mt: 2 }}>
          Email: {email}
        </Typography>

        <Box sx={{ m: 1, minWidth: 120 }}>
          <select
            style={{
              height: "30px",
              cursor: "pointer",
              border: "1px solid black",
              borderRadius: "2px",
            }}
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((item) => {
              return (
                <option style={{ fontSize: "15px" }} value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </Box>

        <Button onClick={updateUserRole}> Change</Button>
      </Box>
    </div>
  );
};

export default ChangeUserRole;
