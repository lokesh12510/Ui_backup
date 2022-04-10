import React, {useEffect, useState} from "react";
import { Row, Col, Button, Card } from 'react-bootstrap';
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

import * as homeService from "../services/homeService";

const CookList = (props) => {
    const [cookList, setCookList] = useState([]);
    
    useEffect(() => {
        getCookList();
    }, [props.latitude, props.longitude]);
    
    const getCookList = () => {
        const data = {
            page: 1,
            perPage: 10,
            latitude: props.latitude,
            longitude: props.longitude,
        };
        homeService.cookList(data)
        .then((response) => {
            setCookList(response.data.list);
        }).catch((e) => {
            console.log(e);
        });
    };
    
    return (
        <>
            <Row className="pb-3">
                <Col md={12}>
                    <h5>Top Popular Kitchen</h5>
                </Col>
                <Col md={12}>
                    {cookList && cookList.length > 0 ? (
                    <Row>
                        {cookList.map((item, index) => (
                        <Col key={index} md={4}>
                            <Card border="primary" bg={props.value === item.id && 'warning'} className="my-2 p-1" onClick={() => props.onSelect(item.id)} role="button">
                                <Card.Body>
                                    <Row>
                                        <Col md={4}>
                                            <Card.Img variant="left" src={item.image} style={{ objectFit: "cover", height: "80px" }} />
                                        </Col>
                                        <Col md={8}>
                                            <div className="fw-bold">
                                                {item.kitchen_name}
                                            </div>
                                            <div className="mt-1">
                                                <FaMapMarkerAlt size={15} /> {item.city} {item.distance >= 0 && ' - ' + item.distance?.toFixed(1) + ' km'}
                                            </div>
                                            <div className="mt-1">
                                                <FaStar size={12} /><FaStar size={12} /><FaStar size={12} /><FaStar size={12} /><FaStar size={12} />
                                            </div>
                                        </Col>
                                    </Row>
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

export default CookList;