import {
  Clear,
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
import { Link } from "react-router-dom";

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
  transition: "0.5s all",
  padding: "0 45px 0 15px",
}));

const Header2 = () => {
  //Search
  const [searchValue, setSearchValue] = useState("");
  const handleClear = () => {
    setSearchValue("");
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
              sx={{
                width: searchValue ? "270px" : "0px",
                opacity: searchValue ? 1 : 0,
                border: searchValue ? "0.5px solid #d1d1d1" : "none",
                borderRadius: searchValue ? "100rem" : "none",
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
            {/* <Fragment>
              <Box>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
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
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
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
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
              <Person2Outlined />
            </Fragment> */}
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
