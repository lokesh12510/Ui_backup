import { Button, Rating, Stack, Tab, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

// local Images
import K1 from "../../../../assets/img/k1.png";
import K2 from "../../../../assets/img/k2.png";
import K3 from "../../../../assets/img/k3.png";
import {
  LocationIcon,
  StarIcon,
  StopwatchIcon,
} from "../../../../utils/constants/Icons";

const KitchenSliderItem = ({ slider, props }) => {
  return (
    <SliderItem
      key={slider.id}
      onClick={() => props.onSelect(slider.id)}
      className="sliderItem"
    >
      <img
        src={slider.image}
        alt=""
        width="110px"
        height={"110px"}
        style={{ objectFit: "cover" }}
      />
      <SliderContent>
        <Typography className="shopTitle">{slider.kitchen_name}</Typography>
        <Stack direction={"row"} alignItems="center" spacing={1}>
          <></>
          <StopwatchIcon />
          <Typography>{slider.distance}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems="center" spacing={1}>
          <></>
          <LocationIcon />
          <Typography>{slider.city}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems="center">
          {[...new Array(5)].map((item) => {
            return <StarIcon />;
          })}
          <Typography fontWeight={"600"} ml={1}>
            (300)
          </Typography>
        </Stack>
      </SliderContent>
    </SliderItem>
  );
};

export default KitchenSliderItem;

const SliderItem = styled(Button)`
  border: 1px solid #cbcbcb;
  border-radius: 5px;
  padding: 7px;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  color: #7b7b7b;
  width: 350px;
  min-height: 100px;
  gap: 10px;
  text-transform: initial;
  margin-right: 10px;
  background-color: #fff;
  & .shopTitle {
    font-size: 18px;
    color: #000;
    font-weight: bold;
  }
`;

const SliderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  text-transform: initial;
`;

const SliderCover = styled(Tab)`
  padding-right: 10px;
`;
