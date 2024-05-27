import React, { useState } from "react";
import productCategory from "../../helpers/productCategory";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
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
import { CloudUpload } from "@mui/icons-material";
import uploadImage from "../../helpers/uploadImage";
import DisplayImage from "../displayImage/DisplayImage";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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

const UploadProduct = ({ open, handleClose }) => {
  //modal image
  const [openModalImg, setOpenModalImg] = React.useState(false);
  const handleOpenModalImg = () => setOpenModalImg(true);
  const handleCloseModalImg = () => setOpenModalImg(false);

  //link img modal""
  const [fullScreenImgUrl, setFullScreenImgUrl] = useState("");

  //Backend
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [uploadProductImage, setUploadProductImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    setUploadProductImage(file.name);
    console.log(file);

    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });

    console.log("sss", uploadImageCloudinary);
  };

  //delete img button
  const handleDeleteProductImage = async (index) => {
    console.log("image index", index);

    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => ({
      ...prev,
      productImage: [...newProductImage],
    }));
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
            <Typography id="spring-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>

            <Grid container spacing={3} paddingTop={"20px"}>
              <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="productName" required>
                  Product Name
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
              <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="last-name" required>
                  Last name
                </FormLabel>
                <OutlinedInput
                  id="last-name"
                  name="last-name"
                  type="last-name"
                  placeholder="Snow"
                  autoComplete="last name"
                  required
                />
              </FormGrid>
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
                <select value={data.category}>
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
              {data?.productImage[0] ? (
                <FormGrid
                  item
                  xs={12}
                  paddingTop={"10px !important"}
                  maxHeight={250}
                >
                  <ImageList
                    sx={{
                      m: 0,
                      p: 1,
                      bgcolor: "#e1e1e1",
                      borderRadius: "10px",
                    }}
                    cols={3}
                    rowHeight={100}
                  >
                    {data.productImage.map((img, index) => (
                      <ImageListItem
                        sx={{
                          border: "1px solid #7f7f7f",
                          p: "0 !important",
                          cursor: "zoom-in",
                          position: "relative",
                          backgroundColor: "#e0e0e0",
                          borderRadius: "5px",
                          "&:hover .hoverImage": {
                            opacity: 1,
                          },
                        }}
                      >
                        <img
                          style={{ objectFit: "contain", height: "100%" }}
                          key={index}
                          srcSet={img}
                          src={img}
                          alt="product"
                          loading="lazy"
                          onClick={() => {
                            handleOpenModalImg();
                            setFullScreenImgUrl(img);
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
                          <DeleteIcon
                            fontSize="small"
                            className="hoverIconDelete"
                          />
                        </IconButton>
                      </ImageListItem>
                    ))}
                  </ImageList>
                </FormGrid>
              ) : (
                <FormGrid item xs={12} paddingTop={"0 !important"}>
                  <Typography color={"red"}>
                    *Please upload product image
                  </Typography>
                </FormGrid>
              )}
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
                  Contained
                </Button>
              </FormGrid>
            </Grid>
          </Box>
        </Fade>
      </Modal>

      <DisplayImage
        openModalImg={openModalImg}
        handleCloseModalImg={handleCloseModalImg}
        imgUrl={fullScreenImgUrl}
      />
    </div>
  );
};

export default UploadProduct;
