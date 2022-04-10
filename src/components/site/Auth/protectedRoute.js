import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as actions from '../../../utils/store/actions';
import { Forbidden as DenyAccess } from '../../Error';
import url from '../url';

const ProtectedRoute = ({ children, ...rest }) => {
    const location = useLocation();

    // props
    const roles = (rest.roles && rest.roles.length > 0) ? rest.roles : [];
    
    // redux store
    const { isLoggedIn, token, user, loading } = useSelector((state) => state.auth);

    // if loading 
    if(loading)
    {
        return (
            <p className="container">Checking auth..</p>
        );
    }

    // if not logged in
    if(!isLoggedIn || token === null)
    {
        return <Navigate to={ url.Login } state={{ from: location }} />
    }
    
    // to check role access
    const permission = actions.authGrantPermission(roles, user);
    // access denied
    if(!permission)
    {
        return (<DenyAccess />);
    }
    
    return children;
}

export default ProtectedRoute;