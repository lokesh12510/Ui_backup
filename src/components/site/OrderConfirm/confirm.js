import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button,Card,Nav, InputGroup } from 'react-bootstrap';
import * as SweetAlert from "../../ui/SweetAlert";
import { useSelector,useDispatch} from "react-redux";
import * as orderConfirmService from '../services/orderConfirmService'
import * as actions from "../../../utils/store/actions";
import url from '../url';


export const Confirm = () => {
  const navigate = useNavigate();

  const [deliveryLocation,setDeliveryLocation] = useState();
  const [orderDetail, setOrderDetail] = useState([ 
    { id: "", u_subtotal:'',u_date_time:'',food_name: "",image_url:'',food_type:'',u_day:'',u_hour:'',u_period:'',u_quantity:'' },
  ]);
  const locationState = useSelector((state) => state.location);
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();
    const [basicOrderInfo,setBasicOrderInfo] = useState(
      {order_reference_number:Math.floor(1000 + Math.random() * 9000),
      total_price:'',
      order_date_time:'',
      payment_status:'1',
      payment_type:'Cash',
      address:'',
      user_id:'',
      }
    );
 
    const [show, setShow] = useState(false);
    const handleClose = () => {
      setShow(false);
  }
  
   const [deliveryAddress,setFoodDeliveryAddress] = useState([
   
  ]);
  const authState = useSelector((state) => state.auth);

  const [totalPrice,setTotalPrice] = useState(0);

  useEffect(()=>{
   
    getDeliveryAddress();
    setDeliveryLocation(locationState.address);
    setOrderDetail(cartState.cartItems);
   
    },[]);

  useEffect(()=>{
      let total = orderDetail.reduce((a, b) => a + (+b['u_subtotal'] || 0), 0);
      setTotalPrice(total);
    },[orderDetail]);
    
   
  
   function getDeliveryAddress()
    {
      let user_id=authState.user.id;
      orderConfirmService.DeliveryAddressList(user_id).then((response)=>{
       setFoodDeliveryAddress(response.data);
      });
    }

   
    const handleInputChange=(e)=>{
      const {name, value} = e.target;
      setDeliveryLocation(value);

    };
    const handleDefaultAddresschange =(e)=>{
      const {name, value} = e.target;

      setDeliveryLocation(value);
    }

    const submitData= async (e)=>{
      if(deliveryLocation=='')
      {
        alert('Delivery Address cannot be empty');
        e.preventDefault();
        return false;

      }
      if(totalPrice<=0)
      {
        alert('Order Total Cannot be 0');
        e.preventDefault();
        return false;
      }
      let addressData ={
        user_id:'',
        delivery_address:'',
        delivery_latitude:'',
        delivery_longitude:'',
        default_flag:1
      }
      addressData.delivery_address = deliveryLocation;
      addressData.delivery_latitude = locationState.latitude;
      addressData.delivery_longitude = locationState.longitude;
      addressData.user_id = authState.user.id;

      e.preventDefault();
      basicOrderInfo.address = deliveryLocation;
      basicOrderInfo.user_id = authState.user.id;
      basicOrderInfo.total_price = totalPrice;
      let formData = new FormData();
      Object.keys(basicOrderInfo).forEach((key) => {
        formData.append(key, basicOrderInfo[key]);
      });
      formData.append('orderDetail', JSON.stringify(orderDetail));
      formData.append('addressData',JSON.stringify(addressData));
      orderConfirmService.Store(formData).then(()=>{
        SweetAlert.successAlert('Order Confirmed').then((result) => {
          if(result.isConfirmed)
          {
            dispatch(actions.cartClear());
            navigate(url.Home);
            
          }
        });
      
      });
    };
  

   

   
  return (
    <>
      <Container>
        <div className="card">
          <Row>
            <Col md={6}><h3>Confirm Order</h3></Col>
            <Col md={6} className="text-end"></Col>
              
          </Row>
          {orderDetail.map((data,index) =>(
        
                    <div className="row mt-4 border" key={index}>
                              <div className="row  mt-4"  >
                                    <div className="form-group py-2 col-md-4">
                                      <img src={((data.image_url)?(data.image_url):'') } style={{ objectFit: "cover", height: "180px" }}></img>
                                    </div>
                                        <div className="form-group py-2 col-md-3">
                                        <label><b>Food Item</b> </label>
                                        <p>{ data.food_name } </p>
                                        </div>
                                        <div className="form-group py-2 col-md-2">
                                        <label><b>Qty</b> </label>
                                        <p>{data.u_quantity}</p>

                                        </div>

                                        <div className="form-group py-2 col-md-2">
                                        <label><b>Price</b></label>
                                        <p>{data.u_subtotal}</p>

                                        </div>
                              
                              </div>
                             
                         
                   </div>
                  
                   
             
                  ))}
                  {orderDetail && orderDetail.length>0 && (<div><Row>
                   <Col md={8} className="text-end"></Col>
                   <Col md={2} className="text-center">------------</Col>
                   </Row>
                   <Row>
                   <Col md={8} className="text-end"></Col>
                    <Col md={2} className="text-center " ><strong>{totalPrice}</strong> </Col>

                   </Row>
                   </div>
                     )}
                     <Row>
               
                   <Col md={5} className="text-end"></Col>
                   <div><h3>
                   Default Delivery Address</h3>
                   </div>
                   <div>
                  
                   <div className="row">
                      <label><input type="radio" value={locationState.address} name="deliveryaddress" onChange={handleDefaultAddresschange} /> {locationState.address}</label> 

                    </div> 
                    <div className="row mt-2">
                     
                        <div className="col-md-8">
                        <input
                                type="text"
                                className="form-control"
                                id="default_address"
                                name="default_address"
                                value={deliveryLocation}
                                 onChange={handleInputChange}
                                placeholder="Enter Default Address"
                          />

                          </div>
                          

                    </div>
                      </div>
                   
                   <div className="mt-2 fw-bold">Note : Selecting any one of the below addresses will be considered as Default Delivery Address</div>
                   {deliveryAddress.map((addressdata,index) =>(
                  
                        <div className="row mt-4">
                           <label><input type="radio" value={addressdata.delivery_address}  name="deliveryaddress" onChange={handleDefaultAddresschange} /> {addressdata.delivery_address}</label> 
                           
                          </div>

                        ))}
                        
                      
                   </Row>
        
        
          </div>
          <div className="row border mb-4 border-primary"><p className="fw-bold mt-2">Note:The Delivery will be made to address that lies within radius of kitchen's mentioned in the order.Providing Wrong Delivery Address may lead to loss of payment.</p></div>
          {orderDetail && orderDetail.length>0 && (<div className="mt-4">
          <button  className="btn btn-primary mb-4" onClick={submitData}>
          Confirm Order
        </button>
          </div>)}
        
      </Container>
   
    </>
  );
}
