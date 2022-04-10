import {
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Radio,
  Typography,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import {
  CardIcon,
  CartIcon,
  CashIcon,
  EditIcon,
} from "../../../../utils/constants/Icons";
import {
  PrimaryBtn,
  SectionBox,
  SectionHeader,
} from "../../../../utils//constants/Styles";
import { DefaultTheme } from "../../../../utils/constants/Theme";

import { useDispatch, useSelector } from "react-redux";

import url from "../../url";
import * as actions from "../../../../utils/store/actions";
import { useNavigate } from "react-router-dom";

const OrderSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  return (
    <SectionBox>
      {cartState.cartItems && cartState.cartItems.length > 0 ? (
        <>
          <FlexDiv>
            <SectionHeader>
              <CartIcon /> Your Order
            </SectionHeader>
            <IconButton
              onClick={() => {
                dispatch(actions.cartPopup(true));
              }}
            >
              <EditIcon />
            </IconButton>
          </FlexDiv>
          <Divider style={{ marginBlock: 10 }} />
          <ButtonGroup fullWidth>
            <ButtonTabs>
              <Radio
                checked={false}
                size="small"
                value="a"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
                disableRipple
              />
              <div className="tabContent">
                <div className="tabTitle">Pick-Up</div>
                <div className="tabSubTitle">Free</div>
              </div>
            </ButtonTabs>
            <ButtonTabs>
              <Radio
                checked={true}
                size="small"
                value="a"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
                disableRipple
              />
              <div className="tabContent">
                <div className="tabTitle">Delivery</div>
                <div className="tabSubTitle"> ₹ 50.00</div>
              </div>
            </ButtonTabs>
          </ButtonGroup>
          <Divider style={{ marginBlock: 10 }} />
          {cartState.cartItems.map((item, index) => {
            return (
              <FlexDiv className="main" key={index}>
                <Typography>
                  {item.food_name || ""} x {item.u_quantity}
                </Typography>
                <Typography> &#8377; {item.u_subtotal?.toFixed(2)}</Typography>
              </FlexDiv>
            );
          })}
          <Divider style={{ marginBlock: 10 }} />
          <FlexDiv>
            <Typography>Delivery</Typography>
            <Typography>₹ 50.00</Typography>
          </FlexDiv>
          <FlexDiv>
            <Typography>VAT</Typography>
            <Typography>₹ 10.00</Typography>
          </FlexDiv>
          <FlexDiv className="bg main">
            <Typography>Total</Typography>
            <Typography>
              {" "}
              &#8377; {cartState.cartTotalAmount?.toFixed(2)}
            </Typography>
          </FlexDiv>
          <BtnGroups fullWidth style={{ marginBottom: 15 }}>
            <ButtonTabs alignItems="center">
              <Radio
                checked={false}
                size="small"
                value="a"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />

              <CashIcon />
              <div className="tabTitle">Cash</div>
            </ButtonTabs>
            <ButtonTabs alignItems="center">
              <Radio
                checked={true}
                size="small"
                value="b"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <CardIcon />
              <div className="tabTitle">Card</div>
            </ButtonTabs>
          </BtnGroups>
          <PrimaryBtn
            fullWidth
            variant="contained"
            round
            onClick={() => navigate(url.OrderConfirm)}
          >
            Confirm Order
          </PrimaryBtn>{" "}
        </>
      ) : (
        <div className="text-center">
          <p className="p-2">Your cart is empty</p>
        </div>
      )}
    </SectionBox>
  );
};

export default OrderSidebar;

const FlexDiv = styled.div`
  &.main {
    color: #000;
  }
  &.bg {
    background-color: #f8f8f8;
    padding: 10px;
    margin-block: 10px;
  }
  display: flex;
  margin-bottom: 10px;
  color: #7b7b7b;
  ${({ justifyContent }) =>
    justifyContent
      ? ` justify-content:${justifyContent}`
      : "justify-content:space-between"};
  ${({ alignItems }) =>
    alignItems ? `  align-items:${alignItems}` : " align-items:center"};
  & .MuiTypography-root {
    font-weight: 500;
  }
`;

const ButtonTabs = styled(Button)`
  ${({ alignItems }) =>
    alignItems ? `  align-items:${alignItems}` : " align-items:start"};
  background-color: #fff;
  justify-content: start;
  color: #000;
  padding: 10px;
  width: 100%;
  border: none;
  & .tabContent {
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
  }
  & .tabTitle {
    font-size: 16px;
    color: #000;
  }
  & .tabSubTitle {
    font-size: 13px;
    color: ${DefaultTheme.palette.secondary.dark};
  }
  & svg {
    margin-inline: 5px;
  }
  &:hover {
    border: none;
  }
`;

const BtnGroups = styled(ButtonGroup)`
  & svg {
    width: 22px;
    height: 22px;
  }
`;
