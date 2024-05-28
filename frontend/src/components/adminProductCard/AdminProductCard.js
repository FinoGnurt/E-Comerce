import { EditOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "@react-spring/web";
import AdminEditProduct from "../adminEditProduct/AdminEditProduct.js";
import displayVNDCurrency from "../../helpers/displayCurrency.js";

//Transition Modal AdminEditProduct
const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const maxText = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
};

const heightResponsive = [
  { height: { xs: 300, sm: 330, md: 360 } },
  { height: { xs: 201, sm: 231, md: 261 } },
];

//---------------------------------------------------------
const AdminProductCard = ({ productData, fetchdata }) => {
  //Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        ...heightResponsive[0],
        // maxWidth: "300px",
        borderRadius: "20px",
        border: "1px solid ",
        borderColor: "divider",
        backgroundColor: "white",
        // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box width={"60%"}>
          <Typography sx={{ cursor: "default", ...maxText }} variant="h6">
            {productData.productName}
          </Typography>
          <Typography
            sx={{ cursor: "default", ...maxText }}
            variant="h6"
            fontWeight={"bold"}
          >
            {displayVNDCurrency(productData.sellingPrice)}
          </Typography>
        </Box>
        <Box width={"30%"} textAlign={"right"}>
          <Typography sx={{ cursor: "default", ...maxText }} variant="body1">
            {productData.sellingPrice}
          </Typography>
          <IconButton
            sx={{
              "&:hover": { backgroundColor: "#cacaca" },
              "&:hover .hoverIconEdit": { color: "#0082ff" },
            }}
            onClick={handleOpen}
          >
            <EditOutlined
              className="hoverIconEdit"
              sx={{ color: "text.secondary" }}
            />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          pt: "15px",
          width: { xs: 265, sm: 270, md: 300, xl: 2000 },
          ...heightResponsive[1],
          display: "block",
          maxWidth: "100%",
          maxHeight: "100%",
          margin: "auto",
        }}
      >
        <img
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src={productData.productImage[0]}
          alt="ImgProduct"
        />
      </Box>

      <AdminEditProduct
        productDataEdit={productData}
        open={open}
        handleClose={handleClose}
        fetchdata={fetchdata}
      />
    </Box>
  );
};

export default AdminProductCard;
