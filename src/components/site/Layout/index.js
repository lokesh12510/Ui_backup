import React from 'react'

import Header from './Header';
import Footer from './Footer';
import Location from '../Location';
import Cart from '../Cart';

const Layout = (props) => {
    return (
        <>
            <Header />
            
            { props.children }
            <Location />
            <Cart />
            
            <Footer />
        </>
    );
}

export default Layout;