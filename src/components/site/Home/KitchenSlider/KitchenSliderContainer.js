import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import KitchenSliderItem from "./KitchenSliderItem";
import { SectionBox, SectionHeader } from "../../../../utils/constants/Styles";

import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { Button, IconButton } from "@mui/material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import styled from "styled-components";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// service call
import * as homeService from "../../services/homeService";

const KitchenSliderContainer = (props) => {
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const [cookList, setCookList] = useState([]);

  useEffect(() => {
    getCookList();
  }, [props.latitude, props.longitude]);

  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };

  const getCookList = () => {
    const data = {
      page: 1,
      perPage: 10,
      latitude: props.latitude,
      longitude: props.longitude,
    };
    homeService
      .cookList(data)
      .then((response) => {
        setCookList(response.data.list);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <SectionBox
      mb={3}
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
      }}
    >
      <SectionHeader marginBottom={"10px"} marginLeft="50px">
        Top popular kitchen
      </SectionHeader>

      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        className="noScroll"
      >
        {[...cookList, ...cookList, ...cookList, ...cookList].map((slider) => (
          <KitchenSliderItem
            slider={slider}
            props={props}
            itemId={slider.id} // NOTE: itemId is required for track items
            title={slider.id}
            key={slider.id}
            onClick={handleClick(slider.id)}
            selected={isItemSelected(slider.id)}
          />
        ))}
      </ScrollMenu>
    </SectionBox>
  );
};

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      <ChevronLeftIcon />
    </Arrow>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
      <ChevronRightIcon />
    </Arrow>
  );
}

function Card({ onClick, selected, title, itemId }) {
  const visibility = React.useContext(VisibilityContext);

  return (
    <div
      onClick={() => onClick(visibility)}
      style={{
        width: "160px",
      }}
      tabIndex={0}
    >
      <div className="card">
        <div>{title}</div>
        <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
        <div>selected: {JSON.stringify(!!selected)}</div>
      </div>
    </div>
  );
}

export default KitchenSliderContainer;

const Arrow = styled(Button)`
  position: relative;
`;
