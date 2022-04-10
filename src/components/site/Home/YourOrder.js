import React, {useEffect, useState} from "react";
import { useNavigate} from 'react-router-dom';
import { Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { FaEdit, FaShoppingBasket } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";

import url from '../url';
import * as actions from "../../../utils/store/actions";

const YourOrder = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart);    
    
    return (
        <>
            <Row>
                <Col md={12}>
                    <Card border="primary" className="my-2 p-1">
                        <Card.Header>
                            <h5>
                                <FaShoppingBasket size={20} className="me-1" /> Your Order
                                <span className="float-end">
                                    <FaEdit 
                                        size={20} 
                                        color="blue" 
                                        role="button" 
                                        onClick={() => {
                                            dispatch(actions.cartPopup(true));
                                        }} 
                                    />
                                </span>
                            </h5>
                        </Card.Header>
                        <Card.Body>
                            {cartState.cartItems && cartState.cartItems.length > 0 ? (
                            <Row>
                                <Col md={12} className="py-2">
                                    <ListGroup variant="flush">
                                        {cartState.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index} className="px-0 py-1">
                                            <div className="float-start">
                                                {item.food_name || ''} x {item.u_quantity }
                                            </div>
                                            <div className="float-end">
                                                &#8377; {item.u_subtotal?.toFixed(2)}
                                            </div>
                                        </ListGroup.Item>        
                                        ))}
                                    </ListGroup>
                                </Col>
                                <Col md={12} className="py-2">
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="px-0 py-1">
                                            <div className="float-start fw-bold">
                                                Total
                                            </div>
                                            <div className="float-end">
                                                &#8377; {cartState.cartTotalAmount?.toFixed(2)}
                                            </div>
                                        </ListGroup.Item>        
                                    </ListGroup>
                                </Col>
                                <Col md={12} className="pt-3 d-grid">
                                    <Button 
                                        variant="primary"
                                        onClick={() => navigate(url.OrderConfirm)}
                                    >
                                        Confirm Order
                                    </Button>
                                </Col>
                            </Row>
                            ) : (
                            <div className="text-center">
                                <p className="p-2">Your cart is empty</p>
                            </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default YourOrder;