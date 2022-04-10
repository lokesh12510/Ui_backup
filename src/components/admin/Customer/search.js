import React, { useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';

const initialValues = {
    name: '',
    status: '',
};

export default (props) => {

    const [values, setValues] = useState(initialValues);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevState) => ({ ...prevState, [name]: value }));
    }
    const handleSearch = () => {
        props.setData(values);
    }
    const handleReset = () => {
        setValues((prevState) => ({ ...prevState, ...initialValues }));
        props.setData(initialValues);
    }

    return (
        <>
            <Row className="pt-3">
                <Col md={4}>
                    <div className="form-group py-2">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="form-control"
                            value={ values.name }
                            onChange={ handleChange }
                            placeholder="Name"
                        />
                    </div>
                </Col>
               
                <Col md={4}>
                    <div className="form-group py-2">

                        <select name="status" className="form-control status" value={values.status} onChange={handleChange}>
                        <option value="">select Status</option>
                        <option value="1">Active</option>
                        <option value="0">InActive</option>
                        </select>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="form-group py-2">
                        <Button variant="primary" type="button" onClick={ handleSearch }>
                            Search
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button variant="secondary" type="button" onClick={ handleReset }>
                            Reset
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    );
};