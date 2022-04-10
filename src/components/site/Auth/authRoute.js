import React from "react";
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import url from '../url';

const AuthRoute = ({ children, ...rest }) => {
    // redux store
    const { isLoggedIn, token, user, loading } = useSelector((state) => state.auth);
    
    // if loading 
    if(loading)
    {
        return (
            <p className="container">Checking auth..</p>
        );
    }
    
    // if logged in
    if(isLoggedIn && token !== null)
    {
        return <Navigate to={ url.Dashboard } />
    }
    
    return children;
}

export default AuthRoute;