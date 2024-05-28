import { CloudUpload, DeleteOutline } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormLabel,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  InputAdornment,
  Modal,
  OutlinedInput,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import SummaryApi from "../../common";
import toast from "react-hot-toast";
import uploadImage from "../../helpers/uploadImage";
import DisplayImage from "../displayImage/DisplayImage";
import productCategory from "../../helpers/productCategory";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100vw", sm: "80vw", md: "50%" },
  maxWidth: "1000px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "1rem",
  overflow: "auto",
  maxHeight: "90vh",
};

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const Textarea = {
  fontFamily: "inherit",
  font: "inherit",
  letterSpacing: "inherit",
  color: "currentColor",
  fontWeight: "inherit",
  fontSize: "inherit",
  padding: "16.5px 14px",
};

//-----------------------------------------------------------------------------
const AdminEditProduct = ({
  open,
  handleClose,
  productDataEdit,
  fetchdata,
}) => {
  //Frontend
  const [openModalChildren, setOpenModalChildren] = React.useState(false);
  const handleOpenModalChildren = () => {
    setOpenModalChildren(true);
  };
  const handleCloseModalChildren = () => {
    setOpenModalChildren(false);
  };

  const [fullScreenImage, setFullScreenImage] = useState("");

  //Backend
  const [data, setData] = useState({
    ...productDataEdit,
    productName: productDataEdit?.productName,
    brandName: productDataEdit?.brandName,
    category: productDataEdit?.category,
    productImage: productDataEdit?.productImage || [],
    description: productDataEdit?.description,
    price: productDataEdit?.price,
    sellingPrice: productDataEdit?.sellingPrice,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    console.log("image index", index);

    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  //upload product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      handleClose();
      fetchdata();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="spring-modal-title"
              variant="h6"
              component="h2"
              textAlign={"center"}
              fontWeight={"bold"}
            >
              Edit Product
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} paddingTop={"20px"}>
                <FormGrid item xs={12}>
                  <FormLabel htmlFor="productName" required>
                    Product Name :
                  </FormLabel>
                  <OutlinedInput
                    id="productName"
                    name="productName"
                    type="text"
                    placeholder="enter product name"
                    autoComplete="productName"
                    value={data.productName}
                    onChange={handleOnChange}
                    required
                  />
                </FormGrid>
                <FormGrid item xs={12}>
                  <FormLabel htmlFor="brandName">Brand Name :</FormLabel>
                  <OutlinedInput
                    id="brandName"
                    name="brandName"
                    type="text"
                    placeholder=""
                    autoComplete="enter brand name"
                    value={data.brandName}
                    onChange={handleOnChange}
                    required
                  />
                </FormGrid>
                <FormGrid item xs={12}>
                  <FormLabel htmlFor="category">Category :</FormLabel>
                  <select
                    style={{
                      height: "55px",
                      fontSize: "inherit",
                      padding: "16.5px 14px",
                      borderRadius: "5px",
                    }}
                    value={data.category}
                    name="category"
                    onChange={handleOnChange}
                    required
                  >
                    <option>Select Category</option>
                    {productCategory.map((i, index) => {
                      return (
                        <option value={i.value} key={i.value + index}>
                          {i.label}
                        </option>
                      );
                    })}
                  </select>
                </FormGrid>
                <FormGrid item xs={12}>
                  <FormLabel htmlFor="productImage">Product Image :</FormLabel>
                  <Box
                    sx={{
                      backgroundColor: "rgb(241 245 249)",
                      p: "0px",
                      border: "1px solid",
                      borderRadius: "5px",
                      height: "100px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      component="label"
                      sx={{
                        color: "rgb(100 116 139)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "16px",
                        width: "100%",
                        height: "100%",
                        p: 0,
                      }}
                    >
                      <CloudUpload />
                      <Typography>Upload Product Image</Typography>
                      <input
                        id="uploadImageInput"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleUploadProduct}
                      />
                    </Button>
                  </Box>
                </FormGrid>
                <FormGrid item xs={12} paddingTop={"0 !important"}>
                  {data?.productImage[0] ? (
                    <ImageList
                      sx={{
                        width: "100%",
                        maxHeight: "200px",
                        gridAutoRows: "150px",
                      }}
                      cols={4}
                      gap={10}
                    >
                      {data.productImage.map((image, index) => {
                        return (
                          <ImageListItem
                            key={index}
                            sx={{
                              backgroundColor: "#e0e0e0",
                              cursor: "zoom-in",
                              border: "1px solid black",
                              borderRadius: "5px",
                              "&:hover .hoverImage": {
                                opacity: 1,
                              },
                            }}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                              srcSet={image}
                              src={image}
                              alt={image}
                              loading="lazy"
                              onClick={() => {
                                handleOpenModalChildren();
                                setFullScreenImage(image);
                              }}
                            />
                            <IconButton
                              className="hoverImage"
                              sx={{
                                backgroundColor: "#c8c8c8",
                                position: "absolute",
                                bottom: 6,
                                right: 6,
                                opacity: 0,
                                p: 0.5,
                                transition: "0.3s all",
                                "&:hover .hoverIconDelete": {
                                  color: "#ff3a3a",
                                },
                                "&:hover": { backgroundColor: "#484848" },
                              }}
                              onClick={() => {
                                handleDeleteProductImage(index);
                              }}
                            >
                              <DeleteOutline
                                className="hoverIconDelete"
                                fontSize="medium"
                              />
                            </IconButton>
                          </ImageListItem>
                        );
                      })}
                    </ImageList>
                  ) : (
                    <Typography color={"red"}>
                      *Please upload product
                    </Typography>
                  )}
                </FormGrid>
                <FormGrid item xs={12} md={6}>
                  <FormLabel htmlFor="price" required>
                    Price :
                  </FormLabel>
                  <OutlinedInput
                    id="price"
                    name="price"
                    type="number"
                    placeholder="enter price price"
                    autoComplete="price"
                    value={data.price}
                    onChange={handleOnChange}
                    endAdornment={
                      <InputAdornment position="end">đ</InputAdornment>
                    }
                    required
                  />
                </FormGrid>

                <FormGrid item xs={12} md={6}>
                  <FormLabel htmlFor="sellingPrice" required>
                    Selling Price :
                  </FormLabel>
                  <OutlinedInput
                    id="sellingPrice"
                    name="sellingPrice"
                    type="number"
                    placeholder="enter selling price"
                    autoComplete="sellingPrice"
                    value={data.sellingPrice}
                    onChange={handleOnChange}
                    endAdornment={
                      <InputAdornment position="end">đ</InputAdornment>
                    }
                    required
                  />
                </FormGrid>

                <FormGrid item xs={12}>
                  <FormLabel htmlFor="sellingPrice" required>
                    Description :
                  </FormLabel>
                  <textarea
                    style={Textarea}
                    placeholder="enter product description"
                    onChange={handleOnChange}
                    name="description"
                    value={data.description}
                    required
                  ></textarea>
                </FormGrid>

                <FormGrid item xs={12}>
                  <Button
                    type="submit"
                    width="100%"
                    variant="contained"
                    color="primary"
                  >
                    Update Product
                  </Button>
                </FormGrid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>

      <DisplayImage
        imgUrl={fullScreenImage}
        openModalImg={openModalChildren}
        handleCloseModalImg={handleCloseModalChildren}
      />
    </div>
  );
};

export default AdminEditProduct;
