import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { Link } from "react-router-dom";
import { Box, Container, List, ListItem, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);

  console.log("categoryProduct", categoryProduct);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <Container sx={{ my: "50px" }}>
      <List
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <Box key={"categoryLoading" + index}>
                  <CircularProgress color="inherit" />
                </Box>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <ListItem
                  sx={{
                    mx: "5px",
                    borderRadius: "12px",
                    background: "#e5e5e5",
                    "&:hover": {
                      boxShadow:
                        " -4px -4px 8px rgba(134, 134, 134, .2), 4px 4px 8px rgba(28, 28, 28, .4)",
                    },
                  }}
                  key={index}
                >
                  <Link
                    to={"/product-category?category=" + product?.category}
                    className="cursor-pointer"
                    key={product?.category}
                  >
                    <Box display={"flex"}>
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                        }}
                        src={product?.productImage[0]}
                        alt={product?.category}
                      />
                    </Box>
                    <Typography
                      textAlign={"center"}
                      textTransform={"capitalize"}
                      mt={"5px"}
                    >
                      {product?.category}
                    </Typography>
                  </Link>
                </ListItem>
              );
            })}
      </List>
    </Container>
  );
};

export default CategoryList;
