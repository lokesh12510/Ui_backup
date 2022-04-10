import React, {useEffect, useState} from "react";
import { Row, Col, Button, Card, InputGroup, Form } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";

const initialValues = {
    food_name: '',
};

const FoodListSearch = (props) => {
    const [values, setValues] = useState(initialValues);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevState) => ({ ...prevState, [name]: value }));
    }
    const handleSearch = () => {
        props.setData(values);
    }
    
    return (
        <>
            <Row className="pb-3">
                <Col md={12}>
                    <InputGroup size="lg">
                        <Form.Control 
                            type="text"
                            name="food_name"
                            value={ values.food_name }
                            onChange={ handleChange }
                            placeholder="Search food item"
                        />
                        <Button variant="light">
                            <FaSearch onClick={ handleSearch } />
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
        </>
    )
}

export default FoodListSearch;