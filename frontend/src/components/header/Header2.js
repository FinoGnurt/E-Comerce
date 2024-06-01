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
import React, { Fragment, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../../common";
import toast from "react-hot-toast";
import { setUserDetails } from "../../store/userSlice";
import ROLE from "../../common/role";
import Context from "../../context";

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

//Array
const linkNav = {
  name: ["Home", "Shop", "Blog", "Contact"],
  link: ["/", "/", "/blog", "/contact"],
};

const Header2 = () => {
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  //Search frontend
  const [searchValue, setSearchValue] = useState(searchQuery);
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

  //count cart backend
  const context = useContext(Context);
  const navigate = useNavigate();

  //Account backend
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
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };
  return (
    <Box
      sx={{
        py: 2.5,
        boxShadow: "0 0 16px rgba(0, 0, 0, 0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        bgcolor: "white",
      }}
    >
      <Container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display={"flex"} gap={10}>
          <Link to={"/"}>
            <Stack alignItems={"center"}>
              <ShoppingCartOutlined />
              <Typography variant="body2">E-commerce</Typography>
            </Stack>
          </Link>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              display={"flex"}
              sx={{
                maxWidth: "300px",
                width: "300px",
                justifyContent: "space-between",
              }}
            >
              {linkNav.name.map((item, index) => {
                console.log("dasas", item.name);
                return (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
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
                    <Link to={linkNav.link[index]}>
                      <Typography
                        variant="body1"
                        textTransform={"uppercase"}
                        fontWeight={500}
                      >
                        {item}
                      </Typography>
                    </Link>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

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
              onChange={handleSearch}
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
                    px: 1,
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

            <Link to={"/cart"}>
              <IconButton aria-label="cart">
                <StyledBadge
                  badgeContent={context?.cartProductCount}
                  color="primary"
                >
                  <ShoppingCart />
                </StyledBadge>
              </IconButton>
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Header2;
