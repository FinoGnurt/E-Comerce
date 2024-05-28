import React, { useEffect, useState } from "react";
import UploadProduct from "../components/uploadProduct/UploadProduct";
import { Box, Button, Typography } from "@mui/material";
import SummaryApi from "../common";
import AdminProductCard from "../components/adminProductCard/AdminProductCard";

const AllProducts = () => {
  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Hover Button
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  //backend, get all product
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("product data", dataResponse);

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <Box>
      <Box
        display={"flex"}
        width={"100%"}
        sx={{
          p: 3,
          justifyContent: { xs: "center", sm: "space-between" },
          position: "sticky",
          top: "5%",
          zIndex: 1000,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          background: "#fff",
          borderRadius: "10px",
          mb: "20px",
        }}
        flexWrap={"wrap"}
      >
        <Typography variant="h5" color={"#1976d2"}>
          All Products
        </Typography>

        <Button
          variant={isHovered ? "outlined" : "contained"}
          color="info"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleOpen}
        >
          Upload Product
        </Button>
      </Box>

      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(auto-fit, minmax(230px, 1fr))"}
        gap={2}
      >
        {allProduct.map((product, index) => {
          console.log("dataproduct", product);
          return (
            <AdminProductCard
              productData={product}
              key={index + "allProduct"}
              fetchdata={fetchAllProduct}
            />
          );
        })}
      </Box>

      <UploadProduct
        open={open}
        handleClose={handleClose}
        fetchData={fetchAllProduct}
      />
    </Box>
  );
};

export default AllProducts;
