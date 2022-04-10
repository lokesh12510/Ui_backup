import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import * as actions from "../../../utils/store/actions";
import Items from "./Items";
import Preview from "./Preview";

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);

  useEffect(() => {
    console.log(cartState);
  }, [cartState]);
  useEffect(() => {
    const { cartItemsCount, cartTotalAmount } = cartState.cartItems.reduce(
      ({ cartItemsCount, cartTotalAmount }, { u_subtotal }) => ({
        cartItemsCount: cartItemsCount + 1,
        cartTotalAmount: cartTotalAmount + u_subtotal,
      }),
      {
        cartItemsCount: 0,
        cartTotalAmount: 0,
      }
    );
    actions.cartItemsLocalSync(cartState.cartItems);
    dispatch(
      actions.cartUpdate({
        cartItemsCount: cartItemsCount,
        cartTotalAmount: cartTotalAmount,
      })
    );
  }, [cartState.cartItems]);

  const handleClose = () => {
    dispatch(actions.cartPopup(false));
  };

  return (
    <>
      <CartContainer
        open={cartState.popup}
        onClose={handleClose}
        maxWidth={"lg"}
        fullWidth
      >
        <DialogTitle>Cart</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Items />
            </Grid>
            <Grid item xs={12}>
              <Preview />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ marginBottom: 20, paddingInline: 20 }}>
          <Button variant="outlined" color="info" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </CartContainer>
    </>
  );
};

export default Cart;

const CartContainer = styled(Dialog)`
  & .MuiPaper-root {
    background-color: #f5f5f5;
  }
`;
