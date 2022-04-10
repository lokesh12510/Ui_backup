import React from "react";

import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Breadcrumb from "../Breadcrumb/breadcrumb";
import { Container } from "@mui/material";
import { StyledContainer } from "../../../utils/constants/Styles";

const Layout = (props) => {
  return (
    <>
      <Navbar />

      {/* <Breadcrumb /> */}
      {props.children}

      {/* <Footer /> */}
    </>
  );
};

export default Layout;
