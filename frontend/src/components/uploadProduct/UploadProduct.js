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
  ImageList,
  ImageListItem,
  Modal,
  OutlinedInput,
  Typography,
  styled,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

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

const UploadProduct = ({ open, handleClose }) => {
  //Backend
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });

  const [uploadProductImage, setUploadProductImage] = useState("");

  const handleOnChange = (e) => {};

  const handleUploadProduct = (e) => {
    const file = e.target.files[0];
    setUploadProductImage(file.name);
    console.log(e);
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
              <ImageList
                sx={{ width: 300, height: 250 }}
                cols={3}
                rowHeight={164}
              >
                <ImageListItem>
                  <img
                    srcSet="{`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}"
                    src="{`${item.img}?w=164&h=164&fit=crop&auto=format`}"
                    alt=""
                    loading="lazy"
                  />
                </ImageListItem>
              </ImageList>
              <FormGrid item xs={6}>
                <FormLabel htmlFor="city" required>
                  City
                </FormLabel>
                <OutlinedInput
                  id="city"
                  name="city"
                  type="city"
                  placeholder="New York"
                  autoComplete="City"
                  required
                />
              </FormGrid>
              <FormGrid item xs={6}>
                <FormLabel htmlFor="state" required>
                  State
                </FormLabel>
                <OutlinedInput
                  id="state"
                  name="state"
                  type="state"
                  placeholder="NY"
                  autoComplete="State"
                  required
                />
              </FormGrid>
              <FormGrid item xs={6}>
                <FormLabel htmlFor="zip" required>
                  Zip / Postal code
                </FormLabel>
                <OutlinedInput
                  id="zip"
                  name="zip"
                  type="zip"
                  placeholder="12345"
                  autoComplete="shipping postal-code"
                  required
                />
              </FormGrid>
              <FormGrid item xs={6}>
                <FormLabel htmlFor="country" required>
                  Country
                </FormLabel>
                <OutlinedInput
                  id="country"
                  name="country"
                  type="country"
                  placeholder="United States"
                  autoComplete="shipping country"
                  required
                />
              </FormGrid>
              <FormGrid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="saveAddress" value="yes" />}
                  label="Use this address for payment details"
                />
              </FormGrid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default UploadProduct;
