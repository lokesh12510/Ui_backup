import React, {useEffect, useState} from "react";
import {Modal, Button} from 'react-bootstrap';

const Customer = (props) => {
    
    const handleInputChange = (e) => {
        props.handleInputChange(e);
    }

    return (

        <Modal 
            show={props.customerPopUpShow} 
            onHide={() => props.setCustomerPopUpShow(false)}
            centered={true}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Signup
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <form onSubmit={(e) => props.onSubmit(e)}>
                        {props.errors.length > 0 ? <p> Validation Errors </p> : ""}
                        <div className="form-group py-2">
                            <label>Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                onChange={handleInputChange}
                                placeholder="Enter Name"
                            />
                            <span className="text-danger">{props.renderError('name')}</span>
                        </div>

                        <div className="form-group py-2">
                            <label>Mobile
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="contact_number"
                                name="contact_number"
                                onChange={handleInputChange}
                                placeholder="Enter Mobile Number"
                            />
                            <span className="text-danger">{props.renderError('mobile')}</span>
                        </div>

                        <div className="form-group py-2">
                            <label>Email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={handleInputChange}
                                placeholder="Enter Email"
                            />
                            <span className="text-danger">{props.renderError('email')}</span>
                        </div>
                        <div className="form-group py-2">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={handleInputChange}
                                placeholder="Enter Password"
                            />
                            <span className="text-danger">{props.renderError('password')}</span>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">
                            Submit
                        </button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default Customer;