import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Badge,
  Avatar,
  ListItemIcon,
  ListItemText,
  useScrollTrigger,
} from "@mui/material";
//import MenuIcon from '@mui/icons-material/Menu';
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import NotificationsIcon from '@mui/icons-material/Notifications';
//import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../utils/store/actions";
import CheckAccess from "../Auth/checkAccess";
import url from "../url";
import StaticImages from "../../../utils/constants/Images";

const Navbar = () => {
  const navigate = useNavigate();

  const trigger = useScrollTrigger();
  // const ProfileDropdownList = [
  //   {label:"Logout",icon: <ExitToAppIcon/>}
  // ];

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(actions.authLogout());
    navigate(url.Login);
  };

  return (
    <>
      <AppBar position="sticky" elevation={trigger ? 4 : 0}>
        <Toolbar>
          {/* <Sidebar />
          <Typography variant="h6"></Typography> */}
          <img src={StaticImages.LogoLight} alt="logo" width="70" height="50" />
          {authState.isLoggedIn && authState.token !== null ? (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex" },
                justifyContent: "end",
              }}
            >
              <CheckAccess request={["ROLE_ADMIN", "ROLE_CHEF"]}>
                <Button
                  color="secondary"
                  onClick={() => navigate(url.Dashboard)}
                >
                  Dashboard
                </Button>
              </CheckAccess>
              {/* <CheckAccess request={['ROLE_ADMIN', 'ROLE_CHEF']}>
                <Button color="secondary" onClick={() => navigate(url.Department) }>Department</Button>
              </CheckAccess> */}
              {/* <CheckAccess request={['ROLE_ADMIN', 'ROLE_CHEF']}>
                <Button color="secondary" onClick={() => navigate(url.Employee) }>Employee</Button>
              </CheckAccess> */}
              <CheckAccess request={["ROLE_ADMIN"]}>
                <Button
                  color="secondary"
                  onClick={() => navigate(url.Customer)}
                >
                  Customer
                </Button>
              </CheckAccess>
              <CheckAccess request={["ROLE_ADMIN"]}>
                <Button color="secondary" onClick={() => navigate(url.Cook)}>
                  Home Cook
                </Button>
              </CheckAccess>
              <CheckAccess request={["ROLE_ADMIN", "ROLE_CHEF"]}>
                <Button color="secondary" onClick={() => navigate(url.Food)}>
                  Food
                </Button>
              </CheckAccess>
              <CheckAccess request={["ROLE_ADMIN", "ROLE_CHEF"]}>
                <Button color="secondary" onClick={() => navigate(url.Order)}>
                  Orders
                </Button>
              </CheckAccess>
              <Button color="secondary" onClick={() => logout()}>
                Logout
              </Button>
            </Box>
          ) : (
            <>
              <Button color="primary" onClick={() => navigate(url.Login)}>
                Login
              </Button>
              {/* <Button color="primary" onClick={() => navigate(url.Signup) }>Register</Button> */}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
