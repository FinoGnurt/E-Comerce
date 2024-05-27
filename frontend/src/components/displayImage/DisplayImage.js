import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const styleImg = {
  maxWidth: "90%",
  maxHeight: "90%",
  objectFit: "contain",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const cursorZoomOut = {
  cursor: "zoom-out",
};

const DisplayImage = ({ imgUrl, openModalImg, handleCloseModalImg }) => {
  console.log(imgUrl);
  return (
    <div>
      <Modal
        open={openModalImg}
        onClose={handleCloseModalImg}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ width: "100vw", height: "100vh", ...cursorZoomOut }}
      >
        <img
          onClick={handleCloseModalImg}
          style={{ ...styleImg, ...cursorZoomOut }}
          src={imgUrl}
          alt=""
        />
      </Modal>
    </div>
  );
};

export default DisplayImage;
