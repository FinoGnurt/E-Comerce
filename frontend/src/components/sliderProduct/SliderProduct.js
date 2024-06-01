import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import {
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Skeleton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import fetchCategoryWiseProduct from "../../helpers/fetchCategoryWiseProduct";
import displayVNDCurrency from "../../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../../helpers/addToCart";
import Context from "../../context";

const SliderProduct = ({ category, title, sliderId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    console.log("horizontal data", categoryProduct.data);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  console.log(data.length);

  //swiper disable button when end
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSwiper = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    swiper.on("slideChange", () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    });
  };
  return (
    <Container>
      {data.length < 1 ? null : (
        <>
          <Box sx={{ mt: 6 }}>
            <Typography variant="h4">{title}</Typography>
            <Typography fontWeight={300} variant="body1">
              All our new arrivals in a exclusive brand selection
            </Typography>
          </Box>
          <Box sx={{ position: "relative" }}>
            <Swiper
              onSwiper={handleSwiper}
              slidesPerView={4}
              centeredSlides={false}
              grabCursor={true}
              speed={1000}
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
              navigation={{
                nextEl: `.buttonNext${sliderId}`,
                prevEl: `.buttonPrev${sliderId}`,
              }}
              modules={[Keyboard, Scrollbar, Navigation, Pagination]}
              className="mySwiper"
            >
              {loading
                ? loadingList.map((_, index) => {
                    return (
                      <SwiperSlide className="swiperCard" key={index}>
                        <Card
                          className="cardHover"
                          sx={{
                            maxWidth: 345,
                            width: "500px",
                            cursor: "pointer",
                            border: "1px solid #c7c7c7",
                            transition: "all 0.3s",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyItems: "center",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Skeleton
                              animation="wave"
                              variant="rectangular"
                              sx={{
                                width: "calc(100% - (16px*2)) !important",
                                height: "234px",
                                mt: "16px",
                              }}
                            />
                            <CardContent>
                              <Skeleton
                                animation="wave"
                                variant="rounded"
                                width="100%"
                                height={32}
                                sx={{ mb: "7px" }}
                              />
                              <Skeleton
                                animation="wave"
                                variant="rounded"
                                width="100%"
                                height={24}
                              />
                              <Box
                                display={"flex"}
                                justifyContent={"space-between"}
                                mt={"10px"}
                              >
                                <Skeleton
                                  animation="wave"
                                  variant="rounded"
                                  width="40%"
                                  height={20.02}
                                />
                                <Skeleton
                                  animation="wave"
                                  variant="rounded"
                                  width="40%"
                                  height={20.02}
                                />
                              </Box>
                            </CardContent>
                          </Box>
                          <Skeleton
                            variant="rounded"
                            animation="wave"
                            height={36.5}
                            sx={{
                              mx: 2,
                              mb: 2,
                              width: "calc(100% - (16px*2))",
                            }}
                          />
                        </Card>
                      </SwiperSlide>
                    );
                  })
                : data.map((product, index) => {
                    return (
                      <SwiperSlide className="swiperCard" key={index}>
                        <Link
                          style={{ width: "100%" }}
                          to={"product/" + product?._id}
                        >
                          <Card
                            className="cardHover"
                            sx={{
                              maxWidth: 345,
                              cursor: "pointer",
                              border: "1px solid #c7c7c7",
                              transition: "all 0.3s",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyItems: "center",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <CardMedia
                                sx={{
                                  width: "calc(100% - (16px*2)) !important",
                                  border: "1px solid black",
                                  aspectRatio: "1/1 !important",
                                  objectFit: "contain !important",
                                  background: "#cbcbcb",
                                  mt: "16px",
                                  boxSizing: "border-box",
                                }}
                                component="img"
                                image={product.productImage[0]}
                              />
                              <CardContent>
                                <Typography
                                  className="ellipsis-text"
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                >
                                  {product?.productName}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  component="div"
                                  sx={{ color: "#818181" }}
                                >
                                  {product?.category}
                                </Typography>
                                <Box
                                  sx={{ display: { xs: "block", md: "flex" } }}
                                  justifyContent={"space-evenly"}
                                  mt={"10px"}
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ color: "red", fontWeight: "600" }}
                                  >
                                    {displayVNDCurrency(product?.sellingPrice)}
                                  </Typography>
                                  <Typography
                                    sx={{ textDecoration: "line-through" }}
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {displayVNDCurrency(product?.price)}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Box>
                            <Button
                              variant="outlined"
                              color="primary"
                              sx={{
                                mx: 2,
                                mb: 2,
                                width: "calc(100% - (16px*2))",
                              }}
                              onClick={(e) => handleAddToCart(e, product?._id)}
                            >
                              Add To Card
                            </Button>
                          </Card>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
            </Swiper>
            {loading || data.length <= 4 ? null : (
              <Box className="buttonSlider">
                <IconButton
                  disabled={isBeginning}
                  className={`buttonPrev${sliderId} buttonArrow`}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton
                  disabled={isEnd}
                  className={`buttonNext${sliderId} buttonArrow`}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default SliderProduct;
