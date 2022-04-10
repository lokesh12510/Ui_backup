import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Banner from "./Banner";
import CookList from "./CookList";
import FoodTypeList from "./FoodTypeList";
import FoodList from "./FoodList";
import YourOrder from "./YourOrder";
import KitchenSliderContainer from "./KitchenSlider/KitchenSliderContainer";
import styled from "styled-components";
import OrderSidebar from "./OrderSidebar/OrderSidebar";
import { Container, Grid } from "@mui/material";
import FoodListTabContainer from "./FoodList/FoodListTabContainer";
import HScroll from "../../ui/HScroll";

export const Home = (props) => {
  const navigate = useNavigate();

  const locationState = useSelector((state) => state.location);
  const latitude = locationState.latitude || null;
  const longitude = locationState.longitude || null;

  const [cook, setCook] = useState("");
  const [foodType, setFoodType] = useState(0);

  useEffect(() => {
    setCook("");
  }, [latitude, longitude]);
  useEffect(() => {
    setFoodType("");
  }, [cook]);

  return (
    <>
      <Banner />
      <BodyContainer maxWidth="xl">
        <KitchenSliderContainer
          value={cook}
          onSelect={setCook}
          latitude={latitude}
          longitude={longitude}
        />
        {/* <HScroll /> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={9}>
            <FoodListTabContainer
              value={foodType}
              onSelect={setFoodType}
              latitude={latitude}
              longitude={longitude}
              cook={cook}
              foodType={foodType}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={3}>
            <OrderSidebar />
          </Grid>
        </Grid>
      </BodyContainer>
    </>
  );
};

const BodyContainer = styled(Container)`
  margin-bottom: 24px;
  padding-block: 25px;
`;
