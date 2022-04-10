import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import styled from "styled-components";

import useScrollTrigger from "@mui/material/useScrollTrigger";

// style
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import StaticImages from "../../../utils/constants/Images";
import { PrimaryBtn, TextBtn } from "../../../utils/constants/Styles";

import url from "../url";
import * as actions from "../../../utils/store/actions";

const pages = [
  {
    label: "Home",
    href: url.Home,
  },
];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  // Func

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const cartState = useSelector((state) => state.cart);

  const logout = () => {
    dispatch(actions.authLogout());
    navigate(url.Home);
  };

  useEffect(() => {
    if (authState.isLoggedIn && authState.token !== null) {
      if (authState.user.role && authState.user.role !== "ROLE_CUSTOMER") {
        logout();
      }
    }
  }, [authState]);

  const showCartPopup = () => {
    dispatch(actions.cartPopup(true));
  };

  const [state, setState] = React.useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  React.useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const trigger = useScrollTrigger();

  const displayDesktop = () => {
    return (
      <Toolbar>
        <img
          height={trigger ? 50 : 70}
          src={StaticImages.LogoLight}
          alt="logo"
          style={{ marginRight: 150 }}
        />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            gap: 3,
          }}
        >
          {getMenuButtons()}
        </Box>

        <Stack
          sx={{ flexGrow: 0 }}
          direction="row"
          alignItems={"center"}
          justifyContent="space-evenly"
          spacing={3}
        >
          <Badge
            color="error"
            showZero
            badgeContent={cartState.cartItemsCount}
            max={99}
          >
            <FaShoppingCart
              size={22}
              color={trigger ? "black" : "white"}
              role="button"
              onClick={() => showCartPopup()}
            />
          </Badge>
          <TextBtn
            component={Link}
            to={url.OrderConfirm}
            variant="text"
            color="primary"
          >
            Confirm Order
          </TextBtn>
          {authState.isLoggedIn && authState.token !== null ? (
            <>
              <TextBtn sx={{ my: 2, display: "block" }}>
                {authState.user?.name}
              </TextBtn>
              <PrimaryBtn
                onClick={() => logout()}
                variant="contained"
                color="primary"
                round={"true"}
              >
                Logout
              </PrimaryBtn>
            </>
          ) : (
            <>
              <PrimaryBtn
                as={Link}
                to={url.Login}
                variant="outlined"
                color="primary"
                round={"true"}
              >
                Customer Login
              </PrimaryBtn>

              <PrimaryBtn
                as={Link}
                to={"/admin"}
                variant="contained"
                color="primary"
                round={"true"}
              >
                Cook Login
              </PrimaryBtn>
              <PrimaryBtn
                as={Link}
                to={url.Signup}
                variant="contained"
                color="primary"
                round={"true"}
              >
                Register
              </PrimaryBtn>
            </>
          )}
        </Stack>
      </Toolbar>
    );
  };

  const getMenuButtons = () => {
    return pages.map((page) => (
      <TextBtn
        component={Link}
        style={{ marginRight: 20 }}
        to={page.href}
        active={page.href === "/" ? true : false}
        key={page.label}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        {page.label}
      </TextBtn>
    ));
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
          }}
        >
          <IconButton
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src={StaticImages.LogoLight} alt="logo" />
          <PrimaryBtn variant="outlined" color="primary" round={"true"}>
            Login
          </PrimaryBtn>
        </Box>

        <Sidebar
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <List>{getDrawerChoices({ handleDrawerClose })}</List>
        </Sidebar>
      </Toolbar>
    );
  };

  const getDrawerChoices = ({ handleDrawerClose }) => {
    return pages.map((page) => (
      <ListItem
        disablePadding
        key={page.label}
        onClick={() => handleDrawerClose()}
      >
        <ListItemButton>
          <ListItemText primary={page.label} />
        </ListItemButton>
      </ListItem>
    ));
  };
  return (
    <TopBar
      trigger={trigger}
      position="fixed"
      elevation={trigger ? 4 : 0}
      style={{
        paddingBlock: trigger ? 0 : 15,
        backgroundColor: trigger ? "#fff" : "transparent",
      }}
    >
      <Container maxWidth="xl">
        {mobileView ? displayMobile() : displayDesktop()}
      </Container>
    </TopBar>
  );
};
export default Header;

const TopBar = styled(AppBar)`
  background-color: transparent;

  & .MuiToolbar-root {
    padding-left: 0;
    padding-right: 0;
  }
  & .MuiButton-text {
    ${({ trigger }) => (trigger ? "color:#000" : "color:#fff")}
  }
`;

const Sidebar = styled(Drawer)`
  & .MuiPaper-root {
    width: 90%;
  }
`;
