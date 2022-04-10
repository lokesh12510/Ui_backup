import React, {useEffect, useState} from "react";
import { Row, Col, Button, Card } from 'react-bootstrap';

import * as homeService from "../services/homeService";

const FoodTypeList = (props) => {
    const [foodTypeList, setFoodTypeList] = useState([]);
    
    useEffect(() => {
        getFoodTypeList();
    }, []);
    
    const getFoodTypeList = () => {
        homeService.foodTypeList()
        .then((response) => {
            setFoodTypeList(response.data);
        }).catch((e) => {
            console.log(e);
        });
    };

    return (
        <>
            <Row className="pb-3">
                <Col md={12}>
                    {foodTypeList && foodTypeList.length > 0 ? (
                    <Row>                        
                        {foodTypeList.map((item, index) => (
                        <Col key={index} md={3}>
                            <Card border="primary" bg={props.value === item.id && 'warning'} className="my-2 p-1" onClick={() => props.onSelect(item.id)} role="button">
                                <Card.Body>
                                    <div className="text-center fw-bold">
                                        {item.type}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        ))}
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

export default FoodTypeList;