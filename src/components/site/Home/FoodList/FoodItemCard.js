import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as homeService from "../../services/homeService";
import * as actions from "../../../../utils/store/actions";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Food from "../../../../assets/img/food.png";
import styled from "styled-components";
import { PopularFlag } from "../../../../utils/constants/Icons";
import { Grid, IconButton, Stack } from "@mui/material";
import { DefaultTheme } from "../../../../utils/constants/Theme";

// icons
import AddCircleIcon from "@mui/icons-material/AddCircle";

import StarIcon from "@mui/icons-material/Star";

const initialValues = {
  items: [],
  loading: false,
  totalRows: 0,
  page: 1,
  perPage: 6,
  totalPages: 1,
  search: {},
};

export default function FoodItemCard({ props }) {
  console.log(props);
  const dispatch = useDispatch();
  const [listValues, setListValues] = useState(initialValues);

  useEffect(() => {
    setListValues({ ...initialValues });
  }, [props]);
  useEffect(() => {
    getFoodList();
  }, [props, listValues.page, listValues.search]);

  const getFoodList = () => {
    const data = {
      page: listValues.page,
      perPage: listValues.perPage,
      latitude: props.latitude,
      longitude: props.longitude,
      cook: props.cook,
      food_type: props.foodType,
    };
    Object.keys(listValues.search).map((key) => {
      data[key] = listValues.search[key];
    });
    setListValues((prevState) => ({
      ...prevState,
      ...{
        loading: true,
      },
    }));
    homeService
      .FoodList(data)
      .then((response) => {
        //console.log(response.data.list);
        setListValues((prevState) => ({
          ...prevState,
          ...{
            loading: false,
            items:
              prevState.page > 1
                ? [...prevState.items, ...response.data.list]
                : response.data.list,
            totalRows: response.data.total,
            totalPages: Math.ceil(response.data.total / prevState.perPage),
          },
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    listValues.items &&
    listValues.items.length > 0 && (
      <FoodContainer container spacing={{ xs: 1, md: 2 }}>
        {listValues.items.map((item, index) => (
          <Grid item xs={12} md={4} lg={4} key={index}>
            <FoodCard>
              <div className="popularFlag">
                <PopularFlag />
              </div>
              <CardMedia
                component="img"
                height="220"
                image={item.image_url}
                alt="green iguana"
              />
              <CardContent>
                <Grid container justifyContent="space-between">
                  <Grid item xs={8}>
                    <Typography variant="h6" component="div">
                      {item.food_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {item.food_ingredients && item.food_ingredients.length ? (
                        <>
                          {item.food_ingredients
                            .map((item2, index2) => (
                              <React.Fragment key={index2}>
                                {item2.ingredient}
                              </React.Fragment>
                            ))
                            .reduce((prev, curr) => [prev, ", ", curr])}
                        </>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </Typography>

                    <Stack direction={"row"} spacing={1}>
                      <div className="ratingIndicator">
                        <StarIcon style={{ fontSize: 15 }} /> 4.5
                      </div>
                      <Typography>(300)</Typography>
                    </Stack>
                  </Grid>
                  <Grid item textAlign={"end"}>
                    <PriceText gutterBottom>
                      {item.price >= 0 && (
                        <>&#8377; {parseFloat(item.price).toFixed(2)}</>
                      )}
                    </PriceText>
                    <IconButton>
                      <AddCircleIcon
                        className="addToCart"
                        color="primary"
                        size="large"
                        onClick={() => {
                          dispatch(actions.cartPopup(true));
                          dispatch(actions.cartUpdate({ previewId: item.id }));
                        }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </FoodCard>
          </Grid>
        ))}
      </FoodContainer>
    )
  );
}

const FoodContainer = styled(Grid)`
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 20px;
`;

const FoodCard = styled(Card)`
  filter: drop-shadow(5px 5px 5px rgba(159, 159, 159, 0.25));
  box-shadow: none;
  padding: 0;
  & .MuiCardMedia-root {
    height: 220px;
  }
  position: relative;
  & .popularFlag {
    position: absolute;
    top: 0;
    left: 0;
  }
  & .MuiCardContent-root {
    padding: 10px;
    box-shadow: none;
  }
  & .ratingIndicator {
    width: auto;
    background-color: ${DefaultTheme.palette.secondary.dark};
    color: #fff;
    display: inline-flex;
    padding: 2px;
    text-align: center;
    min-width: 40px;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }
  & .addToCart {
    width: 1.5em;
    height: 1.5em;
  }
`;

const PriceText = styled(Typography)`
  color: ${DefaultTheme.palette.secondary.dark};
  font-size: 18px;
  font-weight: 600;
`;
