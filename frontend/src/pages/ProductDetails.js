import {
  Box,
  Button,
  Container,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Scrollbar } from "swiper/modules";
import SummaryApi from "../common";
import { useParams } from "react-router-dom";
import displayVNDCurrency from "../helpers/displayCurrency";
import SliderProduct from "../components/sliderProduct/SliderProduct";

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

  //img product zoom
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

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

  //image product zoom
  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("coordinate", left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  return (
    <Box>
      <Box
        bgcolor={"#efefef"}
        minHeight={"650px"}
        height={"calc(100vh - 47.72px - 84.02px)"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        boxSizing={"border-box"}
        py={"50px"}
      >
        <Container>
          <Stack
            direction={{ sm: "column", md: "row" }}
            justifyContent={"space-between"}
          >
            {loading ? (
              <Box
                position={"relative"}
                sx={{ width: { sm: "100%", md: "40%" } }}
              >
                <Box>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={"100%"}
                    sx={{
                      aspectRatio: "1/1",
                      border: "1px solid #c5c5c5",
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
                    {productImageListLoading.map((_, index) => {
                      return (
                        <SwiperSlide>
                          <Skeleton
                            key={"loadingImage" + index}
                            variant="rectangular"
                            width={"calc(100% -  (5px * 2))"}
                            height={"100%"}
                            style={{
                              aspectRatio: "1/1",
                            }}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </Box>
              </Box>
            ) : (
              <Box
                position={"relative"}
                sx={{ width: { sm: "100%", md: "40%" } }}
              >
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "1/1",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "#cbcbcb",
                    border: "1px solid #8b8b8b",
                    boxSizing: "border-box",
                    cursor: "zoom-in",
                  }}
                  onMouseMove={handleZoomImage}
                  onMouseLeave={handleLeaveImageZoom}
                >
                  <img
                    src={activeImage}
                    alt=""
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      // border: "1px solid #636363",
                      boxSizing: "border-box",
                      padding: "20px",
                    }}
                  />
                </Box>
                {zoomImage && (
                  <Box
                    position={"absolute"}
                    sx={{
                      width: "110%",
                      aspectRatio: "1/1",
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "#cbcbcb",
                      left: "105%",
                      top: 0,
                      border: "1px solid #ababab",
                      boxSizing: "border-box",
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                        zoomImageCoordinate.y * 100
                      }% `,
                      zIndex: 100,
                    }}
                  />
                )}

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
                    className="myCustomSwiper"
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
                              cursor: "pointer",
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
            )}

            {loading ? (
              <Box sx={{ width: { sm: "100%", md: "55%" } }}>
                <Skeleton
                  variant="rounded"
                  width={"120px"}
                  height={"30px"}
                  sx={{
                    borderRadius: "10px",
                    bgcolor: "#ffd2d2",
                    color: "#ff4444",
                  }}
                />

                <Skeleton
                  sx={{ m: "15px 0 20px" }}
                  variant="rounded"
                  width={"100%"}
                  height={"40px"}
                />

                <Skeleton variant="rounded" width={"130px"} height={"25px"} />

                <Skeleton
                  variant="rounded"
                  width={"160px"}
                  height={"25px"}
                  sx={{ my: "13px" }}
                />
                <Stack flexDirection={"row"} gap={2} my={"20px "}>
                  <Skeleton variant="rounded" width={"170px"} height={"35px"} />
                  <Skeleton variant="rounded" width={"170px"} height={"35px"} />
                </Stack>
                <Stack flexDirection={"row"} gap={2} sx={{ m: "30px 0 50px" }}>
                  <Skeleton variant="rounded" width={"150px"} height={"47px"} />
                  <Skeleton variant="rounded" width={"150px"} height={"47px"} />
                </Stack>
                <Skeleton variant="rounded" width={"100%"} height={"240px"} />
              </Box>
            ) : (
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
            )}
          </Stack>
        </Container>
      </Box>

      <Container>
        {data.category && (
          <SliderProduct
            category={data?.category}
            title={"Recommended Product"}
          />
        )}
      </Container>

      <style>
        {`
          .myCustomSwiper .swiper-wrapper {
            padding: 0px !important;
          }
          .myCustomSwiper .swiper-slide {
            background-color: inherit;
            cursor: default !important;
          }
          .myCustomSwiper .swiper-initialized {
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
