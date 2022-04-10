import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card } from 'react-bootstrap';
import { FaPlusCircle, FaStar } from "react-icons/fa";
import { useSelector } from 'react-redux';

import * as cartService from '../services/cartService';

const Related = (props) => {
    const { getFoodData } = props;
    
    const cartState = useSelector((state) => state.cart);
    
    const [cookData, setCookData] = useState({});
    const [relatedFoodList, setRelatedFoodList] = useState([]);
    
    useEffect(() => {
        if(cartState.previewId)
        {
            getRelatedItems(cartState.previewId);
        }
        else
        {
            setCookData({});
            setRelatedFoodList([]);
        }
    }, [cartState.previewId]);
    const getRelatedItems = (food_id) => {
        const data = {
            food_id: food_id,
        };
        cartService.relatedFoodList(data)
        .then((response) => {
            setCookData(response.data.cookData);
            setRelatedFoodList(response.data.foodList);
        }).catch((e) => {
            console.log(e);
        });
    }
    
    return (
        <>
            {relatedFoodList && relatedFoodList.length > 0 && (
            <Row>
                <Col md={12}>
                    <h5 className="fw-bold">
                        {(cookData && cookData.kitchen_name) || ''}
                    </h5>
                </Col>
                
                {/* food types */}
                {relatedFoodList.map((food_type, ft_index) => (
                <Col md={6} key={ft_index}>
                    {food_type.foods && food_type.foods.length > 0 && (
                    <Row>
                        <Col md={12}>
                            <h6 className="fw-bold pt-3">
                                {food_type.type || ''}
                            </h6>
                        </Col>
                        
                        {/* foods */}
                        {food_type.foods.map((item, index) => (
                        <Col md={6} key={index}>
                            <Card border="primary" className="m-0 p-0">
                                <Card.Body>
                                    <Row>
                                        <Col md={4}>
                                            <Card.Img variant="left" src={item.image_url} style={{ objectFit: "cover", height: "80px" }} />
                                        </Col>
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
                                            <div>
                                                <div className="float-start text-info">
                                                    {item.price >= 0 && (
                                                    <>
                                                    &#8377; {parseFloat(item.price).toFixed(2)}
                                                    </>
                                                    )}
                                                </div>
                                                <div className="float-end">
                                                    <FaPlusCircle 
                                                        size={22}
                                                        color="red" 
                                                        role="button"
                                                        onClick={() => getFoodData(item.id)} 
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        ))}
                        {/* foods */}

                    </Row>
                    )}
                </Col>
                ))}
                {/* food types */}

            </Row>
            )}
        </>
    )
}

export default Related;