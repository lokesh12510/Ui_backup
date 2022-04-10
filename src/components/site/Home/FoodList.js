import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card, Badge, Spinner } from 'react-bootstrap';
import { FaHeart, FaPlusCircle, FaRegHeart, FaStar } from "react-icons/fa";
import { useDispatch } from 'react-redux';

import * as homeService from "../services/homeService";
import * as actions from '../../../utils/store/actions';
import FoodListSearch from "./FoodListSearch";

const initialValues = {
    items: [],
    loading: false,
    totalRows: 0,
    page: 1,
    perPage: 6,
    totalPages: 1,
    search: {},
};

const FoodList = (props,{listValues,setListValues}) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        setListValues({...initialValues});
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
        setListValues((prevState) => ({...prevState, ...{
            loading: true,
        }}));
        homeService.FoodList(data)
        .then((response) => {
            //console.log(response.data.list);
            setListValues((prevState) => ({...prevState, ...{
                loading: false,
                items: (prevState.page > 1) ? [...prevState.items, ...response.data.list] : response.data.list,
                totalRows: response.data.total,
                totalPages: Math.ceil(response.data.total / prevState.perPage),
            }}));
        }).catch((e) => {
            console.log(e);
        });
    }
    
    return (
        <>
            <Row className="pb-3">
                <Col md={12}>
                    <FoodListSearch 
                        data={ listValues.search }
                        setData={(search) => {
                            if(search !== listValues.search)
                            {
                                setListValues({...initialValues, ['search']: search});
                            }
                        }}
                    />
                </Col>
                <Col md={12}>
                    {listValues.items && listValues.items.length > 0 ? (
                    <Row>
                        {listValues.items.map((item, index) => (
                        <Col key={index} md={4}>
                            <Card border="primary" className="my-2 p-0">
                                <Card.Img variant="top" src={item.image_url} style={{ objectFit: "cover", height: "180px" }} />
                                <Card.ImgOverlay>
                                    <div className="float-end">
                                        <FaRegHeart role="button" />
                                    </div>
                                </Card.ImgOverlay>
                                <Card.Body className="position-relative">
                                    <Row>
                                        <Col md={8}>
                                            <div className="fw-bold">
                                                {item.food_name}
                                            </div>
                                            <div className="mt-1 text-muted">
                                                {item.food_ingredients && item.food_ingredients.length ? (
                                                <>
                                                    {item.food_ingredients.map((item2, index2) => (
                                                        <React.Fragment key={index2}>
                                                            {item2.ingredient}
                                                        </React.Fragment>
                                                    )).reduce((prev, curr) => (
                                                        [prev, ', ', curr]
                                                    ))}
                                                </>
                                                ) : (
                                                <span>&nbsp;</span>
                                                )}
                                            </div>
                                            <div className="mt-1 text-muted">
                                                <Badge bg="warning">
                                                    <FaStar /> 4.5
                                                </Badge>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="text-info float-end">
                                                {item.price >= 0 && (
                                                <>
                                                &#8377; {parseFloat(item.price).toFixed(2)}
                                                </>
                                                )}
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="text-center mt-3">
                                                <FaPlusCircle 
                                                    size={30}
                                                    color="red" 
                                                    role="button"
                                                    onClick={() => {
                                                        dispatch(actions.cartPopup(true));
                                                        dispatch(actions.cartUpdate({'previewId': item.id}));
                                                    }} 
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        ))}
                        <Col md={12}>
                            <div className="text-center">
                                {listValues.loading ? (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                ) : (
                                <>
                                {listValues.totalPages !== listValues.page && (
                                <Button 
                                    variant="outline-dark"
                                    onClick={() => {
                                        setListValues((prevState) => ({...prevState, ...{
                                            page: prevState.page + 1,
                                        }}));
                                    }}
                                >
                                    See More
                                </Button>
                                )}
                                </>
                            )}
                            </div>
                        </Col>
                    </Row>
                    ) : (
                    <div className="text-center">
                        <p className="p-5">No results found</p>
                    </div>
                    )}
                </Col>
            </Row>
        </>
    )
}

export default FoodList;