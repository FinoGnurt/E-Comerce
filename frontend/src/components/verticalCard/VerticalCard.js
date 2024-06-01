import React, { useContext } from "react";
// import scrollTop from "../../helpers/scrollTop";
import displayINRCurrency from "../../helpers/displayCurrency";
import Context from "../../context";
import addToCart from "../../helpers/addToCart";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material";

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(260px, 300px))"
      gap={2}
      justifyContent="center"
      overflowX="scroll"
      sx={{ "&::-webkit-scrollbar": { display: "none" } }}
    >
      {loading
        ? loadingList.map((_, index) => (
            <Card key={index} sx={{ minWidth: 280, maxWidth: 320 }}>
              <Box
                sx={{
                  height: 192,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "grey.200",
                  animation: "pulse 2s infinite",
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    bgcolor: "grey.200",
                    height: 28,
                    mb: 2,
                    borderRadius: 1,
                    animation: "pulse 2s infinite",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    bgcolor: "grey.200",
                    height: 24,
                    mb: 2,
                    borderRadius: 1,
                    animation: "pulse 2s infinite",
                  }}
                />
                <Box display="flex" gap={2}>
                  <Typography
                    variant="body2"
                    sx={{
                      bgcolor: "grey.200",
                      height: 24,
                      flexGrow: 1,
                      borderRadius: 1,
                      animation: "pulse 2s infinite",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      bgcolor: "grey.200",
                      height: 24,
                      flexGrow: 1,
                      borderRadius: 1,
                      animation: "pulse 2s infinite",
                    }}
                  />
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: "grey.200",
                    mt: 2,
                    animation: "pulse 2s infinite",
                  }}
                  disabled
                />
              </CardContent>
            </Card>
          ))
        : data.map((product, index) => (
            <Card key={product?._id} sx={{ minWidth: 280, maxWidth: 320 }}>
              <Link to={"/product/" + product?._id}>
                <CardMedia
                  component="img"
                  height="192"
                  image={product?.productImage[0]}
                  alt={product?.productName}
                  sx={{
                    objectFit: "scale-down",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                />
              </Link>
              <CardContent>
                <Typography variant="h6" noWrap>
                  {product?.productName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product?.category}
                </Typography>
                <Box display="flex" gap={2} mt={1}>
                  <Typography variant="body1" color="error">
                    {displayINRCurrency(product?.sellingPrice)}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {displayINRCurrency(product?.price)}
                  </Typography>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
    </Box>
  );
};

export default VerticalCard;
