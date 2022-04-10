import api from '../../../utils/helpers/api';

export const Login = (data) => {
  return api.post("/auth/login", data);
};

export const Signup = (data) => {
  return api.post("/auth/signup", data);
};

export const CookSignup = (data) => {
  return api.post(`/auth/cooksignup`, data, {
    'content-type': 'multipart/form-data'
  });
};

export const CustomerSignup = (data) => {
  return api.post(`/auth/customersignup`, data, {
    'content-type': 'multipart/form-data'
  });
};