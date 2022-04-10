const Url = {
    Login : '',
    Signup : '/signup',
    
    Dashboard : '/dashboard',
    
    Employee : '/employee',
    EmployeeAdd : '/employee/add',
    EmployeeEdit : '/employee/edit',
    
    Department : '/department',
    
    Customer : '/customer',
    
    Cook : '/cook',
    CookAdd: '/cook/add',
    CookEdit: '/cook/edit',
    
    Order : '/orders',
    
    Food : '/food',
    FoodAdd : '/food/add',
    FoodEdit : '/food/edit',
    
    //... more colors here
};

// to prepend '/admin' to all routes
Object.keys(Url).forEach(key => {
    Url[key] = '/admin' + Url[key];
});

export default Url;