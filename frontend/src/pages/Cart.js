import React, { useCallback, useContext, useEffect, useState } from "react";
import Context from "../context";
import SummaryApi from "../common";
import displayVNDCurrency from "../helpers/displayCurrency";
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Stack,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = useCallback(async () => {
    await fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    handleLoading().finally(() => setLoading(false));
  }, [handleLoading]);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );
  return (
    <Container>
      {data.length === 0 && !loading && (
        <Box textAlign="center" my={3}>
          <Paper elevation={3} sx={{ py: 3 }}>
            <Typography variant="h6" mb={2}>
              No Data
            </Typography>
            <Link to="/">
              <Button variant="contained" color="primary">
                Go Shopping
              </Button>
            </Link>
          </Paper>
        </Box>
      )}

      {data.length > 0 && (
        <Grid container spacing={4} justifyContent="space-between" my={1}>
          <Grid item xs={12} lg={8}>
            {loading
              ? loadingCart.map((el, index) => (
                  <Box
                    key={el + "Add To Cart Loading" + index}
                    sx={{
                      width: "100%",
                      height: "8rem",
                      my: 2,
                      border: "1px solid",
                      borderColor: "grey.300",
                      backgroundColor: "grey.200",
                      borderRadius: 1,
                      animation: "pulse 2s infinite",
                    }}
                  />
                ))
              : data.map((product, index) => (
                  <Stack
                    key={product?._id + "Add To Cart Loading"}
                    flexDirection={"row"}
                    sx={{
                      my: 2,
                      border: "1px solid",
                      borderColor: "grey.400",
                      borderRadius: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 150,
                        height: 150,
                        backgroundColor: "grey.200",
                      }}
                    >
                      <img
                        src={product?.productId?.productImage[0]}
                        alt={product?.productId?.productName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "scale-down",
                          mixBlendMode: "multiply",
                        }}
                      />
                    </Box>
                    <Box
                      py={1}
                      px={2}
                      position="relative"
                      width={"calc(100% - 150px)"}
                    >
                      <IconButton
                        sx={{
                          position: "absolute",
                          p: "3px",
                          right: 7,
                          color: "error.main",
                          borderRadius: "50%",
                          cursor: "pointer",
                          transition: "all 0.3s",
                          "&:hover": {
                            backgroundColor: "error.main",
                            color: "common.white",
                          },
                        }}
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Typography
                        variant="h6"
                        noWrap
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        width={"95%"}
                      >
                        {product?.productId?.productName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {product?.productId.category}
                      </Typography>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={1}
                      >
                        <Stack flexDirection={"row"}>
                          <Typography variant="h6" color="error.main">
                            {displayVNDCurrency(
                              product?.productId?.sellingPrice
                            )}
                          </Typography>
                          <Typography variant="h6">
                            &nbsp;*&nbsp;{product?.quantity}&nbsp;
                          </Typography>
                        </Stack>
                        <Typography variant="h6">
                          {displayVNDCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </Typography>
                      </Box>
                      <Stack
                        flexDirection={"row"}
                        width={"180px"}
                        alignItems="center"
                        justifyContent={"space-between"}
                        gap={2}
                        mt={1}
                      >
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() =>
                            decraseQty(product?._id, product?.quantity)
                          }
                        >
                          <RemoveIcon />
                        </Button>
                        <Typography>{product?.quantity}</Typography>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          <AddIcon />
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                ))}
          </Grid>
          <Grid item xs={12} lg={4}>
            {loading ? (
              <Box
                sx={{
                  height: "9rem",
                  backgroundColor: "grey.200",
                  border: "1px solid",
                  borderColor: "grey.300",
                  animation: "pulse 2s infinite",
                }}
              />
            ) : (
              <Box sx={{ my: 2, position: "sticky", top: 100 }}>
                <Paper>
                  <Typography
                    variant="h6"
                    sx={{
                      backgroundColor: "error.main",
                      color: "common.white",
                      p: 1,
                    }}
                  >
                    Summary
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    p={2}
                    fontWeight="medium"
                    fontSize="1.1rem"
                    color="textSecondary"
                  >
                    <Typography>Quantity</Typography>
                    <Typography>{totalQty}</Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    p={2}
                    fontWeight="medium"
                    fontSize="1.1rem"
                    color="textSecondary"
                  >
                    <Typography>Total Price</Typography>
                    <Typography>{displayVNDCurrency(totalPrice)}</Typography>
                  </Box>
                </Paper>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Payment
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;
