import { combineReducers } from 'redux';

import auth from './authReducer';
import loginAttempts from './loginAttemptsReducer';
import breadcrumbsReducers from './breadcrumbReducer';
import locationReducers from './locationReducer';
import cartReducer from './cartReducer';


// combined reducers
export const rootReducer = combineReducers({
    auth: auth,
    loginAttempts: loginAttempts,
    breadcrumbs: breadcrumbsReducers,
    location: locationReducers,
    cart: cartReducer,
});