import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import {
  FaHamburger,
  FaMinusCircle,
  FaPlusCircle,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import * as cartService from "../services/cartService";
import * as actions from "../../../utils/store/actions";
import * as commonHelper from "../../../utils/helpers/commonHelper";
import Related from "./Related";
import { SectionBox } from "../../../utils/constants/Styles";
import { Box } from "@mui/material";
import styled from "styled-components";

const Preview = (props) => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);

  const [previewItems, setPreviewItems] = useState([]);
  const dayHourList = commonHelper.getDayHourList();
  const currentDayHour = commonHelper.getCurrentDayHour();

  useEffect(() => {
    if (cartState.previewId) {
      getFoodData(cartState.previewId);
    } else {
      setPreviewItems([]);
    }
  }, [cartState.previewId]);
  const getFoodData = (food_id) => {
    let checState = previewItems.some((x) => x.id === food_id);
    if (checState) {
      // if already exists
      return;
    }
    // check cart
    if (cartState.cartItems && cartState.cartItems.length > 0) {
      let checkCart = cartState.cartItems.some((x) => x.id === food_id);
      if (checkCart) {
        // if already exists
        return;
      }
    }

    const data = {
      food_id: food_id,
    };
    cartService
      .foodData(data)
      .then((response) => {
        let foodData = response.data.foodData;
        foodData.price = +foodData.price || 0;
        foodData.u_quantity = 1;
        foodData.u_subtotal = foodData.u_quantity * foodData.price;
        foodData.u_day = currentDayHour.day;
        foodData.u_hour = currentDayHour.hour;
        foodData.u_period = currentDayHour.period;
        foodData.u_date_time = commonHelper.calcCartDateTime(
          foodData.u_day,
          foodData.u_hour,
          foodData.u_period
        );
        setPreviewItems((p) => [...p, foodData]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const plusMinusItem = (food_id, type) => {
    let newItems = [...previewItems];
    let index = newItems.findIndex((x) => x.id === food_id);
    if (index !== -1 && newItems[index]) {
      // if exists
      let u_quantity = parseInt(newItems[index].u_quantity);
      let price = parseFloat(newItems[index].price);
      u_quantity = type === "minus" ? --u_quantity : ++u_quantity;
      if (u_quantity >= 1) {
        let u_subtotal = parseFloat(u_quantity * price);
        newItems[index].u_quantity = u_quantity;
        newItems[index].u_subtotal = u_subtotal;
        setPreviewItems(newItems);
      }
    }
  };
  const changeHandlerItem = (food_id, event) => {
    let newItems = [...previewItems];
    let index = newItems.findIndex((x) => x.id === food_id);
    if (index !== -1 && newItems[index]) {
      // if exists
      const { name, value } = event.target;
      newItems[index][name] = value;
      newItems[index]["u_date_time"] = commonHelper.calcCartDateTime(
        newItems[index].u_day,
        newItems[index].u_hour,
        newItems[index].u_period
      );
      setPreviewItems(newItems);
    }
  };
  const removeItem = (food_id) => {
    let newItems = [...previewItems];
    newItems = newItems.filter((x) => x.id !== food_id);
    setPreviewItems(newItems);
  };

  const orderNow = (food_id) => {
    let newItems = [...previewItems];
    let index = newItems.findIndex((x) => x.id === food_id);
    if (index !== -1 && newItems[index]) {
      // if exists
      dispatch(actions.cartItemAdd(newItems[index]));
      removeItem(food_id);
    }
  };

  return (
    <>
      {(!previewItems || previewItems.length < 1) &&
        (!cartState.cartItems || cartState.cartItems.length < 1) && (
          <Row>
            <Col md={12}>
              <div className="text-center">
                <p className="p-5">Your cart is empty</p>
              </div>
            </Col>
          </Row>
        )}

      {/* preview items */}
      {previewItems && previewItems.length > 0 && (
        <CartItemBox>
          <Row>
            <Col md={12}>
              {previewItems.map((item, index) => (
                <Row key={index} className="py-2">
                  <Col md={2}>
                    <img
                      src={item.image_url}
                      style={{
                        objectFit: "cover",
                        height: "80px",
                        width: "100%",
                      }}
                    />
                  </Col>
                  <Col md={3}>
                    <div className="fw-bold">{item.food_name}</div>
                    <div className="text-muted">
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
                    </div>
                    <div className="">
                      {item.food_type && (
                        <>
                          <FaHamburger /> {item.food_type.type}
                        </>
                      )}
                    </div>
                    <div className="text-info">
                      &#8377; {item.price?.toFixed(2)}
                    </div>
                  </Col>
                  <Col md={3}>
                    <InputGroup>
                      <Form.Select
                        name="u_day"
                        value={item.u_day}
                        onChange={(event) => changeHandlerItem(item.id, event)}
                      >
                        {dayHourList.dayList &&
                          dayHourList.dayList.length > 0 &&
                          dayHourList.dayList.map((x, xi) => (
                            <option key={xi} value={x.name}>
                              {x.name}
                            </option>
                          ))}
                      </Form.Select>
                      <Form.Select
                        name="u_hour"
                        value={item.u_hour}
                        onChange={(event) => changeHandlerItem(item.id, event)}
                      >
                        {dayHourList.hourList &&
                          dayHourList.hourList.length > 0 &&
                          dayHourList.hourList.map((x, xi) => (
                            <option key={xi} value={x.name}>
                              {x.name}
                            </option>
                          ))}
                      </Form.Select>
                      <Form.Select
                        name="u_period"
                        value={item.u_period}
                        onChange={(event) => changeHandlerItem(item.id, event)}
                      >
                        {dayHourList.periodList &&
                          dayHourList.periodList.length > 0 &&
                          dayHourList.periodList.map((x, xi) => (
                            <option key={xi} value={x.name}>
                              {x.name}
                            </option>
                          ))}
                      </Form.Select>
                    </InputGroup>
                  </Col>
                  <Col md={2}>
                    <div className="">
                      <InputGroup
                        size="sm"
                        className="d-flex justify-content-center"
                      >
                        <Button
                          variant="light"
                          onClick={() => plusMinusItem(item.id, "minus")}
                        >
                          <FaMinusCircle size={15} color="blue" />
                        </Button>
                        <InputGroup.Text className="text-center px-3">
                          {item.u_quantity >= 0 ? <>{item.u_quantity}</> : 0}
                        </InputGroup.Text>
                        <Button
                          variant="light"
                          onClick={() => plusMinusItem(item.id, "plus")}
                        >
                          <FaPlusCircle size={15} color="blue" />
                        </Button>
                      </InputGroup>
                    </div>
                    <div className="text-info text-center pt-2">
                      &#8377; {item.u_subtotal?.toFixed(2)}
                    </div>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline-dark"
                      onClick={() => orderNow(item.id)}
                    >
                      Order Now
                    </Button>
                    <FaTimes
                      size={22}
                      color="red"
                      className="float-end"
                      role="button"
                      onClick={() => removeItem(item.id)}
                    />
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </CartItemBox>
      )}

      {/* related items */}
      <Row className="p-2 pt-3">
        <Col md={12}>
          <Related getFoodData={getFoodData} />
        </Col>
      </Row>
    </>
  );
};

export default Preview;

const CartItemBox = styled(Box)`
  padding: 0;
  background-color: #fff;
`;
