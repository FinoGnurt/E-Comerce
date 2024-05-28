import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./slider.css";

import banner1222 from "../../assets/banner/banner-16.jpg";
import banner1223 from "../../assets/banner/banner-17.jpg";

import bannerElectric from "../../assets/banner/bannerElectric.jpg";
import banner2 from "../../assets/banner/product-banner-jpg.webp";
import IconSection from "./IconSection";

const bannerSlider = [
  { text: "MEN", banner: bannerElectric },
  { text: "WOMEN", banner: banner2 },
];

const Hero = () => {
  console.log(bannerSlider);
  const theme = useTheme();
  return (
    <Container>
      <Box sx={{ pt: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Swiper
          spaceBetween={15}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {bannerSlider.map((slider, index) => (
            <SwiperSlide key={index} className="parent-slider">
              <img src={slider.banner} alt="" />
              <Box
                sx={{
                  [theme.breakpoints.up("sm")]: {
                    display: "none",
                  },

                  [theme.breakpoints.down("sm")]: {
                    display: "block",
                    pt: 4,
                    pb: 4,
                  },
                }}
              >
                <Typography sx={{ color: "#222" }} variant="h6">
                  LIFESTYLE COLLECTION
                </Typography>
                <Typography
                  sx={{ color: "#222", fontWeight: "400", my: 1 }}
                  variant="h4"
                >
                  {slider.text}
                </Typography>
                <Stack
                  sx={{ justifyContent: { xs: "center", sm: "left" } }}
                  direction={"row"}
                  alignItems={"center"}
                >
                  <Typography color={"#333"} mr={1} variant="h5">
                    SALE UP TO
                  </Typography>
                  <Typography color={"#D23F57"} variant="h5">
                    30% OFF
                  </Typography>
                </Stack>
                <Typography
                  sx={{ color: "#000", fontWeight: 300, my: 1 }}
                  variant="body1"
                >
                  Get Free Shipping on orders orver $99.00
                </Typography>
                <Button
                  sx={{
                    my: 5,
                    py: 1,
                    mt: 2,
                    backgroundColor: "#222",
                    boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                    color: "#fff",
                    borderRadius: "1px",
                    "&:hover": {
                      backgroundColor: "#151515",
                      boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                    },
                  }}
                  variant="contained"
                >
                  shop now
                </Button>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
              minWidth: "26.6%",
              maxWidth: "0px",
            },
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box display={"flex"} position={"relative"}>
            <img width={"100%"} src={banner1222} alt="" />
            <Stack
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: 31,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#2B3445", fontSize: "18px" }}
              >
                NEW ARRIVALS
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#2B3445", lineHeight: "16px", mt: 1 }}
              >
                SUMMER
              </Typography>
              <Typography variant="h6" sx={{ color: "#2B3445" }}>
                SALE 20% OFF
              </Typography>

              <Link
                sx={{
                  color: "#2B3445",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  transition: "0.2s",

                  "&:hover": { color: "#D23F57" },
                }}
                href="#"
                underline="none"
              >
                shop now
                <ArrowForwardIcon sx={{ fontSize: "13px" }} />
              </Link>
            </Stack>
          </Box>
          <Box display={"flex"} position={"relative"}>
            <img width={"100%"} src={banner1223} alt="" />
            <Stack
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: 31,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#2B3445", fontSize: "18px" }}
              >
                NEW ARRIVALS
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#2B3445", lineHeight: "16px", mt: 1 }}
              >
                SUMMER
              </Typography>
              <Typography variant="h6" sx={{ color: "#2B3445" }}>
                SALE 20% OFF
              </Typography>

              <Link
                sx={{
                  color: "#2B3445",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  transition: "0.2s",

                  "&:hover": { color: "#D23F57" },
                }}
                href="#"
                underline="none"
              >
                shop now
                <ArrowForwardIcon sx={{ fontSize: "13px" }} />
              </Link>
            </Stack>
          </Box>
        </Box>
      </Box>

      <IconSection />
    </Container>
  );
};

export default Hero;
