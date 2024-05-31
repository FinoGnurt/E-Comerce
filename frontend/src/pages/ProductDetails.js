import {
  Box,
  Button,
  Container,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Scrollbar } from "swiper/modules";
import SummaryApi from "../common";
import { useParams } from "react-router-dom";
import displayVNDCurrency from "../helpers/displayCurrency";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataReponse = await response.json();

    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  return (
    <Box
      bgcolor={"#efefef"}
      height={"860px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Container>
        <Stack
          direction={{ sm: "column", md: "row" }}
          justifyContent={"space-between"}
        >
          <Box sx={{ width: { sm: "100%", md: "40%" } }}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                justifyContent: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#cbcbcb",
              }}
            >
              <img
                src={activeImage}
                alt=""
                style={{
                  width: "100%",
                  border: "1px solid #636363",
                  boxSizing: "border-box",
                }}
              />
            </Box>

            {/* <Skeleton variant="rectangular" width="100%" height={500} /> */}
            <Box pt={2}>
              <Swiper
                slidesPerView={4}
                centeredSlides={false}
                grabCursor={true}
                keyboard={{
                  enabled: true,
                }}
                breakpoints={{
                  769: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                  },
                }}
                scrollbar={true}
                modules={[Keyboard, Scrollbar]}
                className="mySwiper"
              >
                {data.productImage.map((imgURL, index) => {
                  return (
                    <SwiperSlide>
                      <img
                        style={{
                          width: "calc(100% -  (5px * 2))",
                          aspectRatio: "1/1",
                          border: "1px solid #636363",
                          boxSizing: "border-box",
                        }}
                        src={imgURL}
                        alt="product"
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                        onClick={() => handleMouseEnterProduct(imgURL)}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Box>
          </Box>
          <Box sx={{ width: { sm: "100%", md: "55%" } }}>
            <Typography
              variant="h6"
              sx={{
                borderRadius: "10px",
                bgcolor: "#ffd2d2",
                display: "inline-block",
                color: "#ff4444",
                px: 1,
              }}
            >
              {data?.brandName}
            </Typography>
            <Typography sx={{ py: 1 }} variant="h4">
              {data?.productName}
            </Typography>
            <Typography variant="h6" sx={{ color: "gray" }}>
              {data?.category}
            </Typography>
            <Rating
              name="half-rating"
              defaultValue={3.5}
              precision={0.5}
              readOnly
            />
            <Stack flexDirection={"row"} gap={2}>
              <Typography variant="h5" color={"red"} fontWeight={"600"}>
                {displayVNDCurrency(data.sellingPrice)}
              </Typography>
              <Typography
                variant="h5"
                sx={{ textDecoration: "line-through", color: "gray" }}
              >
                {displayVNDCurrency(data.price)}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={2} sx={{ m: "20px 0 40px" }}>
              <Button
                variant="outlined"
                sx={{
                  textTransform: "capitalize",
                  fontSize: "20px",
                  width: "150px",
                  "&:hover": { bgcolor: "rgba(25, 118, 210, 0.1)" },
                }}
              >
                Buy Now
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  fontSize: "20px",
                  width: "150px",
                }}
              >
                Add To Cart
              </Button>
            </Stack>
            <Typography variant="h6" color={"gray"}>
              Desciption:
            </Typography>
            <Typography
              variant="h6"
              maxHeight={"420px"}
              sx={{
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: "5px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#9c9c9c",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#888888",
                },
              }}
            >
              {data?.description}
            </Typography>
          </Box>
        </Stack>
      </Container>
      <style>
        {`
          .swiper-wrapper {
            padding: 0px !important;
          }
          .swiper-slide {
            background-color: inherit;
          }
          .swiper-initialized {
            background-color: #cbcbcb;
            padding: 4px 0;
            box-sizing:border-box;
          }
        `}
      </style>
    </Box>
  );
};

export default ProductDetails;
