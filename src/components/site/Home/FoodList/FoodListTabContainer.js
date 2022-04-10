import React, { useEffect, useState } from "react";

import styled from "styled-components";
import {
  AppBar,
  CircularProgress,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { LoadBtn, SectionBox } from "../../../../utils/constants/Styles";
import PropTypes from "prop-types";
import { Box } from "@mui/system";

import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import {
  StyledBreakfastIcon,
  StyledDinnerIcon,
  StyledLunchIcon,
  StyledSnacksIcon,
} from "../../../../utils/constants/Icons";
import { DefaultTheme } from "../../../../utils/constants/Theme";
import SearchIcon from "@mui/icons-material/Search";
import FoodItemCard from "./FoodItemCard";

// service
import * as homeService from "../../services/homeService";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const initialValues = {
  items: [],
  loading: false,
  totalRows: 0,
  page: 1,
  perPage: 6,
  totalPages: 1,
  search: {},
};

const FoodListTabContainer = (props) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.onSelect(newValue + 1);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
    props.onSelect(index + 1);
  };

  const [foodTypeList, setFoodTypeList] = useState([]);

  useEffect(() => {
    getFoodTypeList();
  }, []);

  const getFoodTypeList = () => {
    homeService
      .foodTypeList()
      .then((response) => {
        setFoodTypeList(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Search
  const [values, setValues] = useState("");

  const handleChangeSearch = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
    // props.setData(values);
  };

  const [listValues, setListValues] = useState(initialValues);

  return (
    foodTypeList &&
    foodTypeList.length > 0 && (
      <FoodListContainer>
        <FoodTabs position="static" elevation={0}>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProp={{
              style: {
                display: "none",
              },
            }}
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {foodTypeList.map((item, index) => {
              return (
                <Tab
                  key={item.id}
                  className="tab_btn"
                  label={item.type}
                  {...a11yProps(index)}
                  icon={<StyledBreakfastIcon />}
                  iconPosition="start"
                />
              );
            })}
          </Tabs>
        </FoodTabs>
        <TabsContentSection>
          <SearchTextField
            variant="outlined"
            placeholder="Search Food Item"
            value={values.food_name}
            onChange={handleChangeSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon style={{ color: "#000" }} />
                </InputAdornment>
              ),
            }}
          />
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            {foodTypeList.map((item, index) => {
              return (
                <TabPanel key={item.id} value={value} index={index}>
                  <FoodItemCard
                    props={props}
                    listValues={listValues}
                    setListValues={setListValues}
                  />
                  {listValues.loading ? (
                    <CircularProgress>
                      <span className="visually-hidden">Loading...</span>
                    </CircularProgress>
                  ) : (
                    <>
                      {listValues.totalPages !== listValues.page && (
                        <Grid container justifyContent={"center"}>
                          <Grid item>
                            <LoadBtn>Load More</LoadBtn>
                          </Grid>
                        </Grid>
                      )}
                    </>
                  )}
                </TabPanel>
              );
            })}
          </SwipeableViews>
        </TabsContentSection>
      </FoodListContainer>
    )
  );
};

export default FoodListTabContainer;

const FoodListContainer = styled(Box)`
  padding: 0;
  background-color: #fff;
  border: 1px solid #cbcbcb;
  padding-bottom: 35px;
  border-radius: 5px;
  overflow: hidden;
  & .MuiBox-root {
    padding: 0;
  }
`;

const FoodTabs = styled(AppBar)`
  background-color: #ebedf3;
  color: #000;

  & .Mui-selected {
    background-color: #fff;
    text-align: center;
    color: ${DefaultTheme.palette.secondary.dark};
    border: none;
    & .MuiTab-iconWrapper {
      path {
        fill: ${DefaultTheme.palette.secondary.dark};
      }
    }
  }
  & .MuiTabs-indicator {
    display: none;
  }
`;

const SearchTextField = styled(TextField)`
  padding-block: 20px;
  width: 100%;
  color: #000;
  & .MuiOutlinedInput-root {
    width: 100%;
  }

  & .MuiOutlinedInput-input {
    color: #000;
    padding: 11.5px 14px;
    z-index: 1;
  }

  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: white;
    color: white;
    border-radius: 50px;
    background-color: #f6f6f6;
    top: 0;
  }
  & :hover.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: ${DefaultTheme.palette.secondary.main};
  }
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${DefaultTheme.palette.secondary.main};
  }
  & .MuiInputAdornment-root {
    z-index: 1;
  }
  & fieldset {
    & legend {
      display: none;
    }
  }
`;

const TabsContentSection = styled.div`
  padding: 20px;
`;
