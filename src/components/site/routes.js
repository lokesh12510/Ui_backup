import url from './url';

import { Home } from './Home';
import { Login } from './Auth/login'
import { Signup } from './Auth/signup'
import { Confirm} from './OrderConfirm/confirm';
// routes
const routes = [
  {
    path: url.Home,
    element: Home,
    auth: false,
  },
  {
    path: url.Login,
    element: Login,
    auth: false,
  },
  {
    path: url.Signup,
    element: Signup,
    auth: false,
  },
  {
    path: url.OrderConfirm,
    element: Confirm,
      auth: true,
     roles: ['ROLE_CUSTOMER'],

  },
];

export default routes;