import styled from "@emotion/styled";
import {
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import StaticImages from "../../../utils/constants/Images";
import { DefaultTheme } from "../../../utils/constants/Theme";
// Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { FaCaretDown, FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../utils/store/actions";

const Banner = () => {
  const dispatch = useDispatch();
  const locationState = useSelector((state) => state.location);

  const showLocationPopup = () => {
    dispatch(actions.locationPopup(true));
  };
  return (
    <BannerContainer maxWidth="xxl" minHeight={500} src={StaticImages.Banner}>
      <BannerContent>
        <>
          <HeroText>Order Food Online From</HeroText>
          <HeroSubText>the Best Homecook</HeroSubText>
        </>
        <Typography
          variant="h5"
          component={"div"}
          fontWeight="500"
          fontSize={{ xs: "14px", md: "22px" }}
        >
          Homecook In Your Mobile ! Get Our App
        </Typography>
        <Typography
          variant="h6"
          component={"p"}
          fontWeight="400"
          fontSize={{ xs: "10px", md: "14px" }}
        >
          Get our app, it's the fastest way to order food on the go.
        </Typography>
        <Stack
          alignItems={"center"}
          justifyContent="center"
          direction={"row"}
          spacing="3"
          mb={4}
        >
          <img src={StaticImages.GooglePlay} alt="google play" />
          <img src={StaticImages.AppStore} alt="App Store" />
        </Stack>
        <LocationTextField
          variant="outlined"
          placeholder="Choose Location"
          value={locationState.address || ""}
          onClick={showLocationPopup}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon style={{ color: "#fff" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <ArrowDropDownIcon style={{ color: "#fff" }} />
              </InputAdornment>
            ),
          }}
        />
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;

const BannerContainer = styled(Container)`
  width: 100%;
  min-height: ${(props) => props.minHeight}px;
  background-color: #e6e6e6;
  background-image: url(${(props) => props.src});
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #00000078;
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 1;
  padding-top: 100px;
  @media (max-width: 600px) {
    font-size: 14px;
    padding-top: 70px;
  }
`;

const HeroText = styled(Typography)`
  color: ${DefaultTheme.palette.secondary.main};
  font-size: 50px;
  text-align: center;
  margin-bottom: 0;
  line-height: 0.7;
  font-family: "Wendy One", sans-serif;
  @media (max-width: 600px) {
    font-size: 30px;
  }
`;
const HeroSubText = styled(Typography)`
  color: inherit;
  font-size: 50px;
  text-align: center;
  margin-bottom: 10px;
  line-height: 0.7;
  font-family: "Wendy One", sans-serif;
  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const LocationTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    min-width: 500px;
  }
  @media (max-width: 600px) {
    & .MuiOutlinedInput-root {
      min-width: 100%;
    }
  }
  & .MuiOutlinedInput-input {
    color: white;
    padding: 11.5px 14px;
  }
  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: white;
    color: white;
    border-radius: 50px;
    background-color: #ffffff35;
    top: 0;
  }
  & :hover.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: ${DefaultTheme.palette.secondary.main};
  }
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${DefaultTheme.palette.secondary.main};
  }
  & fieldset {
    & legend {
      display: none;
    }
  }
`;
