import React, { useState, useEffect } from "react";
import {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { OrderContext } from '../../Contexts/OrderContext.js';
import { CartContext, emptyCart} from '../../Contexts/CartContext.js';
import {UserContext} from '../../Contexts/UserContext.js';
import './OrderConfirmation.css';

export default function OrderConfirmation(props) {
    const [order, setOrder] = useContext(OrderContext);
    const orderItems = order.orderItems;
    const navigate = useNavigate();
    
    const [userContext, setUserContext] = useContext(UserContext);

    const [cart, setCart] = useContext(CartContext);
    const cartItems = cart.items;  //Extract cart items in a separate variable

    var updatedOrder = order;
    updatedOrder.orderItems = cartItems;
    updatedOrder.totalPrice = cart.totalPrice;
    updatedOrder.discount = cart.discount;
    updatedOrder.taxes = cart.taxes;
    updatedOrder.netprice = cart.netprice;

    // updatedOrder.orderDate = new Date();
    // updatedOrder.orderDate = updatedOrder.orderDate.substring(6,) + "-" + updatedOrder.orderDate.substring(3,4) + "-" + updatedOrder.orderDate.substring(0,1)
    updatedOrder.customerName = userContext.name;
    updatedOrder.station = userContext.station;
    updatedOrder.stationName = userContext.stationName;
    updatedOrder.train = userContext.train;
    updatedOrder.trainName = userContext.trainName;
    updatedOrder.deliveryDate = userContext.jdate;
    setOrder(updatedOrder);

    //handle order confirmation
    //===================================================
    //Handle registration 
    //===================================================
    const handleOrderConfirmation = (event) => {

        var r = Math.floor((Math.random() * 10000000) + 1);
        var odrno = "OID"+ r.toString();
        var payload = {
            "order_id": odrno,
            "rest_id": userContext.rest,
            "order_date": order.orderDate,
            "delivery_date": order.deliveryDate,
            "user_id": userContext.uid,
            "contact_no": order.mobileNo,
            "station_code": order.station,
            "train_no": order.train,
            "coach_no": order.seatDetails.substring(0,2),
            "seat_no": parseInt(order.seatDetails.substring(3,)),
            "order_status": "2",
            "item_count": order.orderItems.length,
            "total_amount": order.totalPrice,
            "total_discount": order.discount,
            "tax": parseInt(order.taxes.toFixed()),
            "net_amount": order.netprice
        }

        var requestOptions = {
            method: 'POST',
            headers: {
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json',
            },
            body: JSON.stringify(payload),
        }

        // Backend server call
        var baseURL     = "http://127.0.0.1:8000/fds/";
        var specificURL = "rest/api/orders/";
        var queryString = "";

        var url = baseURL + specificURL + queryString;   

        fetch(url, requestOptions)
            .then(response => {
                    if(response.ok)  {
                        alert("Order number : " + odrno + ",payment step pending.");
                        return response.json();     
                    } 
                    // else some error has happened
                    return response.json().then(response => {
                        // console.log("Error:" + response.error)
                        throw new Error(response.error)
                    })
                }
            )
            .then(function(data) { 
                // window.location.reload(false);
                return;             
            })
            .catch(error => {
                console.log("Error creating order:" + error);
                // alert ("Error creating order. Try again.");
            });
        // fetch ends here
        return;
    }

    //************** RETURN ***************/
    return (
        <div className="container-fluid">
            <div className="row ">
                <h3><b className="col-sm-12">Order Details</b></h3>
                <div className="col-sm-12">.</div>
                <div className="col-sm-12"><b>Order Date:</b> {order.orderDate}</div>
                <div className="col-sm-12"><b>Order Number:</b> {order.orderNumber} </div>
                {userContext.isLoggedIn == true ? (
                        <div className="col-sm-12"><b>Customer Name:</b> {order.customerName} </div> 
                ) : (
                    <div className="col-sm-12">
                        <b>Customer Name:</b>
                        <input type="text" id="SeatDtls" value= {order.customerName}/>
                    </div>
                )
                }
                {userContext.isLoggedIn == true ? (
                    <div className="col-sm-12"><b>Mobile No:</b> {order.mobileNo} </div>
                ) : (
                    <div className="col-sm-12">
                        <b>Mobile No:</b>
                        <input type="text" id="mobileNo" value= {order.mobileNo} /> 
                    </div>
                )
                }
                {/* <div className="col-sm-12"><b>Mobile No:</b> {order.mobileNo} </div> */}
                <div className="col-sm-12"><b>Station:</b> {order.stationName} </div>
                {/* <div className="col-sm-12"><b>Delivery Date:</b> {order.deliveryDate} </div> */}
                <div className="col-sm-12">
                    <b>Delivery Date:</b>
                    <input type="text" id="deliveryDate" value= {order.deliveryDate} placeholder="25-02-2023"/> 
                    {/* <input type="date" id="deliveryDate" name="deliveryDate" value= {order.deliveryDate}></input> */}
                </div>
                <div className="col-sm-12"><b>Train:</b> {order.train} {order.trainName} </div>
                <div className="col-sm-12">
                    <b>Coach/Seat:</b>
                    <input type="text" id="SeatDtls" value= {order.seatDetails}/> 
                </div>

                <div className="col-sm-12">.</div>
                <br />
                <div className="col-sm-12"><b>Ordered Items:</b></div>
                <hr/>
                <div className="col-sm-12">
                    {orderItems.length === 0 ? (
                        <div className="row">
                            <div className="col-sm-12">
                                <div >
                                <p>Cart is empty</p>
                                </div>
                            </div>
                        </div>
                    ) : (orderItems.map(record => (
                        <div className="col-sm-12" style={{ padding: 0  }}>
                            <div className="col-sm-7" style={{  padding: 0 }}>                                    
                                {record.item_name}
                            </div>
                            <div className="col-sm-2" style={{ padding: 0 }}>                                    
                                {record.item_quantity} 
                            </div>
                            <div className="col-sm-2" style={{  padding: 0 }}>                                    
                                {record.item_price}
                            </div>
                            <div className="col-sm-1" style={{ padding: 0 }}>
                                <div >                            
                                    <Link to="#" style={{ padding: 0 }}>Delete</Link>
                                </div>
                            </div>
                        </div>
                        ))
                    )} 
                    .
                    <hr/>
                    <div className="col-sm-12" style={{  padding: 0 }}>
                        <div className="col-sm-9"><b> Total Amount:</b></div>
                        <div className="col-sm-3"><b> {order.totalPrice}</b></div>
                    </div>   
                    <div className="col-sm-12" style={{  padding: 0 }}>
                        <div className="col-sm-9"> Discount:</div>
                        <div className="col-sm-3"> {order.discount}</div>
                    </div>   
                    <div className="col-sm-12" style={{padding: 0 }}>
                        <div className="col-sm-9"> Taxes:</div>
                        <div className="col-sm-3"> {order.taxes}</div>
                    </div>   
                    <div className="col-sm-12" style={{  padding: 0 }}>
                        <b>
                            <div className="col-sm-9"> Net Price:</div>
                            <div className="col-sm-3"> {order.netprice}</div>
                        </b>
                    </div>  
                </div>
                .
                <hr/>
                <Link to="/order-food" className="btn btn-danger col-sm-3" role="button" >Cancel</Link>    
                <div className="col-sm-3"></div>
                <Link to="/payment" className="btn btn-primary col-sm-3" role="button" onClick={handleOrderConfirmation}>Confirm & Pay</Link>    
            </div>
        </div>
    )
}
