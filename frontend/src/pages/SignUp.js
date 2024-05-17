import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import {
  LockOutlined,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";

const defaultTheme = createTheme();

const SignUp = () => {
  //Form
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  //Upload Image
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password == data.confirmPassword) {
      // const dataResponse = await fetch(SummaryApi.signUp.url, {
      //   method: SummaryApi.signUp.method,
      const dataResponse = await fetch("http://localhost:8080/api/signup", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataAPI = await dataResponse.json();

      console.log("data", dataAPI);
    } else {
      console.log("Please check");
    }
  };

  console.log("data", data);

  //Hide/Show Password
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [textShowIcon, setTextShowIcon] = React.useState(false);
  const [textShowConfirmIcon, setTextShowConfirmIcon] = React.useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            position="relative"
            sx={{
              m: 1,
              bgcolor: "secondary.main",
              width: "100px",
              height: "100px",
              backgroundColor: "0",
            }}
          >
            {data.profilePic ? (
              <img
                src={data.profilePic}
                alt=""
                style={{ width: "100%" }}
                // style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Person sx={{ fontSize: "6rem" }} />
            )}
            <Box
              component="form"
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "40%",
              }}
            >
              <Button
                component="label"
                sx={{
                  backgroundColor: "rgb(255, 255, 255, 0.7)",
                  textTransform: "none",
                  color: "black",
                  width: "100%",
                  height: "100%",
                  "&:hover": { backgroundColor: "rgb(255, 255, 255, 0.7)" },
                }}
              >
                <Typography textAlign={"center"} fontSize={"14px"}>
                  Upload Photo
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleUploadPic}
                />
              </Button>
            </Box>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={data.firstName}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={data.lastName}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  margin="normal"
                  required
                  fullWidth
                  variant="outlined"
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={data.password}
                    onChange={(e) => {
                      handleOnChange(e);
                      setTextShowIcon(e.target.value);
                    }}
                    endAdornment={
                      textShowIcon ? (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ) : null
                    }
                  />
                </FormControl>
                <FormControl
                  margin="normal"
                  required
                  fullWidth
                  variant="outlined"
                >
                  <InputLabel htmlFor="confirmPassword">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={data.confirmPassword}
                    onChange={(e) => {
                      handleOnChange(e);
                      setTextShowConfirmIcon(e.target.value);
                    }}
                    endAdornment={
                      textShowConfirmIcon ? (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirmPassword visibility"
                            onClick={() =>
                              setShowConfirmPassword((show) => !show)
                            }
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ) : null
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to={"/login"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography
          sx={{ mt: 5 }}
          variant="body2"
          color="text.secondary"
          align="center"
        >
          {"Copyright © "}
          <Link color="inherit" href="https://mui.com/">
            Your Website
          </Link>
          {new Date().getFullYear()}
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
