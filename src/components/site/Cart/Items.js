import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import {
  FaHamburger,
  FaMinusCircle,
  FaPlusCircle,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../utils/store/actions";
import * as commonHelper from "../../../utils/helpers/commonHelper";
import { SectionBox } from "../../../utils/constants/Styles";

const Items = (props) => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);

  const dayHourList = commonHelper.getDayHourList();

  const plusMinusItem = (food_id, type) => {
    if (type === "plus") {
      dispatch(actions.cartItemQtyPlus({ id: food_id }));
    } else if (type === "minus") {
      dispatch(actions.cartItemQtyMinus({ id: food_id }));
    }
  };
  const changeHandlerItem = (food_id, event) => {
    let index = cartState.cartItems.findIndex((x) => x.id === food_id);
    if (index !== -1 && cartState.cartItems[index]) {
      // if exists
      const { name, value } = event.target;

      let curr_item = cartState.cartItems[index];
      curr_item[name] = value;
      let u_date_time = commonHelper.calcCartDateTime(
        curr_item.u_day,
        curr_item.u_hour,
        curr_item.u_period
      );
      dispatch(
        actions.cartItemUpdate({
          id: food_id,
          [name]: value,
          u_date_time: u_date_time,
        })
      );
    }
  };
  const removeItem = (food_id) => {
    dispatch(actions.cartItemDelete({ id: food_id }));
  };

  return (
    <>
      {cartState.cartItems && cartState.cartItems.length > 0 && (
        <SectionBox className="cart_item">
          <Row>
            <Col md={12}>
              {cartState.cartItems.map((item, index) => (
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
        </SectionBox>
      )}
    </>
  );
};

export default Items;
