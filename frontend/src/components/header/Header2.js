import {
  Clear,
  Javascript,
  Logout,
  Person2Outlined,
  PersonAdd,
  Search,
  Settings,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Container,
  Divider,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SummaryApi from "../../common";
import toast from "react-hot-toast";
import { setUserDetails } from "../../store/userSlice";
import ROLE from "../../common/role";

//Card style
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

//Search Style
const SearchBar = styled("div")(({ theme }) => ({
  // backgroundColor: "#e7e7e7",
  alignItems: "center",
  display: "flex",
  // borderRadius: "100rem",
  // border: "0.5px solid #d1d1d1",
  position: "relative",
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  // backgroundColor: "#e7e7e7",
  marginLeft: "15px",
  width: "0px",
  position: "absolute",
  right: 0,
  opacity: 0,
  transition: "0.3s all",
  padding: "0 45px 0 15px",
}));

const Header2 = () => {
  //Search
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!searchValue) {
      setIsFocused(false);
    }
  };

  const handleClear = () => {
    setSearchValue("");
    setIsFocused(false);
  };

  //Account
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <Box sx={{ py: 2.5, boxShadow: "0 0 16px rgba(0, 0, 0, 0.15)" }}>
      <Container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={"/"}>
          <Stack alignItems={"center"}>
            <ShoppingCartOutlined />
            <Typography variant="body2">E-commerce</Typography>
          </Stack>
        </Link>

        <Box display={"flex"}>
          <SearchBar
            sx={{
              ":hover .hoverSearchInput": {
                width: "270px",
                opacity: 1,
                border: "0.5px solid #d1d1d1",
                borderRadius: "100rem",
              },
            }}
          >
            <SearchInput
              className="hoverSearchInput"
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              sx={{
                width: isFocused || searchValue ? "270px" : "0px",
                opacity: isFocused || searchValue ? 1 : 0,
                border:
                  isFocused || searchValue ? "0.5px solid #d1d1d1" : "none",
                borderRadius: isFocused || searchValue ? "100rem" : "none",
                transition: "0.4s all",
                backgroundColor: "#0000001a",
              }}
            />
            <IconButton>
              {/* <Search sx={{ display: searchValue ? "none" : "block" }} />
              <Clear
                onClick={handleClear}
                sx={{ display: searchValue ? "block" : "none" }}
              /> */}
              {/* {searchValue ? <Clear /> : <Search />} */}
              {searchValue ? <Clear onClick={handleClear} /> : <Search />}
            </IconButton>
          </SearchBar>

          <Stack direction={"row"} alignItems={"center"}>
            {user?._id ? (
              <Fragment>
                <Box>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar
                        sx={{ width: 32, height: 32 }}
                        src={user?.profilePic || null}
                        alt={user?.name}
                      />
                      {/* {user?.profilePic ? (<img src={user?.profilePic} />) : null} */}
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleClose}>
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      src={user?.profilePic || null}
                      alt={user?.name}
                    />
                    {user?.firstName + " " + user?.lastName}
                  </MenuItem>
                  {user?.role === ROLE.ADMIN && (
                    <Link to={"/admin-panel/all-products"}>
                      <MenuItem onClick={handleClose}>
                        <Avatar
                          sx={{ width: 32, height: 32 }}
                          src={user?.profilePic || null}
                          alt={user?.name}
                        />
                        {/* Administrator */}
                        Admin Dashboard
                      </MenuItem>
                    </Link>
                  )}
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      handleLogout(e);
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Fragment>
            ) : (
              <Link to={"/login"}>
                <Typography
                  sx={{
                    // backgroundColor: "pink",
                    px: 1,
                    borderRadius: "10px",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: 0,
                      borderBottom: "2px solid black",
                      transition: "0.3s all",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  Login
                </Typography>
              </Link>
            )}

            <IconButton aria-label="cart">
              <StyledBadge badgeContent={4} color="primary">
                <ShoppingCart />
              </StyledBadge>
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Header2;
