import React,{useEffect} from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";

import breadcrumbAction from '../../../utils/store/actions/breadcrumb';

const Header = (props) => {
    const dispatch = useDispatch(); 
    let location = useLocation();
    
    useEffect(() => {
        dispatch(breadcrumbAction.pushBreadcrumb("ADD s",location.pathname));
    }, []);

    return (
        <>
            {/* <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand href="/Employee"><h2>LARAVEL REACT</h2></Navbar.Brand>
            </Navbar> */}
     
        </>    
    );
};

export default Header;