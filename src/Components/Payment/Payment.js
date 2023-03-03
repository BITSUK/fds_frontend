import React from 'react'
import './Payment.css';
import {Link} from "react-router-dom";
import { AlertContext } from '../../Contexts/AlertContext.js';
import {useContext, useState} from "react";
import Alert from "../Alert/Alert.js";
import {OrderContext} from '../../Contexts/OrderContext.js';
import {useNavigate } from "react-router-dom";

export default function Payment() {

    const [paymentStatus, setPaymentStatus] = useState("unpaid");
    const navigate = useNavigate();

    // Obtain alert context and define a local alert object
    const [alertMessage, setAlert] = useContext(AlertContext);
    const a = {
        alertType: alertMessage.alertType,
        alertMessage: alertMessage.alertMessage
    } 
    
    const [order, setOrder] = useContext(OrderContext);	

    const processPayment = (event) => {
        // event.preventDefault();  

        //In future we will add API call here

        var inputCardNo = document.getElementById("cardNo").value;
        var inputName = document.getElementById("name").value;
        var inputCardExpiry = document.getElementById("expiry").value;
        var inputCardCCV = document.getElementById("ccv").value;

        if ((inputCardNo === "") || (inputName === "") || (inputCardExpiry === "") || (inputCardCCV === "")) {
            
            a.alertMessage = "Mandatory details missing, please check.";
            a.alertType = "error";
            setAlert(a);

        } else if ((inputCardNo.length != 19) && (inputCardNo.length != 16)) {
            a.alertMessage = "Invalid Card Number.";
            a.alertType = "error";
            setAlert(a);
            //Pending: checks to validate only numbers are keys and format is XXXX-XXXX-XXXX-XXXX
        } else if (inputCardExpiry.length != 5) {
            a.alertMessage = "Invalid Card Expiry.";
            a.alertType = "error";
            setAlert(a);
            //Pending: checks to validate only numbers are keys and format is MM/YY
        } else if (inputCardCCV.length != 3) {
            a.alertMessage = "Invalid CCV.";
            a.alertType = "error";
            setAlert(a);
            //Pending: checks to validate only numbers are keys
        }
        // } else {
        //     a.alertMessage = "Order Placed Successfully. Order No: NT03456";
        //     a.alertType = "success";
        //     setAlert(a);
        //     setPaymentStatus("paid");    
        // }

        var r = Math.floor((Math.random() * 10000000000) + 1);
        var pid = "PID"+ r.toString();
        var r2 = Math.floor((Math.random() * 100000) + 1);
        var pref = pid + "R" + r2.toString();

        var payload = {
            "payment_id": pid,
            "order_id": order.orderNumber,
            "payment_date": order.orderDate,
            "payment_amount": order.netprice,
            "payment_mode": "Card",
            "payment_ref": pref,
            "payment_status": "1"
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
        var specificURL = "rest/api/payments/";
        var queryString = "";

        var url = baseURL + specificURL + queryString;   

        fetch(url, requestOptions)
            .then(response => {
                    if(response.ok)  {
                        // alert("Payment successful for : " + order.orderNumber );
                        //update order status
                        updateOrderAsPaid(order.orderNumber);
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
                console.log("Error making payment:" + error);
                // alert ("Error creating order. Try again.");
            });
        // fetch ends here
        return;

    }

    //===================================================
    //Update Order as paid 
    //===================================================
    const updateOrderAsPaid = (odr) => {

        // Backend server call
        var baseURL     = "http://127.0.0.1:8000/fds/";
        var specificURL = "rest/api/orders/" ;
        var queryString = "?order_id=" + odr;

        var url = baseURL + specificURL + queryString; 

        fetch(url)
        .then(response => {
                if(response.status === 200)  {
                    return response.json();     
                } 
                // else some error has happened
                return response.json().then(response => {
                    throw new Error(response.error)
                })
            }
        )
        .then(function(data) {
            var payload = data.results[0];
            var url = baseURL + specificURL + payload.id; 
            payload.order_status = 2;
            delete payload.id;
            
            var requestOptions = {
                method: 'PUT',
                headers: {
                    'Accept'        : 'application/json',
                    'Content-Type'  : 'application/json',
                },
                body: JSON.stringify(payload),
            }
            // ====
            fetch(url, requestOptions)
            .then(response => {
                    if(response.status === 200)  {
                        alert("Payment successful, Order no: " + odr);
                        return response.json();     
                    } 
                    // else some error has happened
                    return response.json().then(response => {
                        throw new Error(response.error)
                    })
                }
            )
            .then(function(data) {
                return;
            })
            .catch(error => {
                console.log("Error Updating:" + error);
                alert ("Update unsuccessful, please try after some time.");
                return;
            });
            // ====

            return;
        })
    }

    // Cancel Button
    const processCancel = (event) => {
        a.alertMessage = "";
        a.alertType = "default";
        setAlert(a);
    }

    // Go Back Button
    const handleGoBack = (event) => {
        a.alertMessage = "";
        a.alertType = "default";
        setAlert(a);
        navigate('/dashboard'); 
        return;
    }
    
    //********************** RETURN *******************
    return (
        
    <div>
        <Alert />
        {(paymentStatus != "paid")   && 
            <div className="reset-form-container">            
                <div>
                    <b>Order No: </b> {order.orderNumber}<br/>
                    <b>Payment Amount: </b> {order.netprice}
                </div>
                <hr />                 
                <div>
                    <input type="radio" id="radioWallet" name="payment-mode" value="Wallet" disabled/> &nbsp;
                    <label htmlFor="radioWallet">Wallet (Paytm)</label>	&nbsp;
                    <input type="radio" id="radioNetBanking" name="payment-mode" value="Net Banking" disabled/> &nbsp;
                    <label htmlFor="radioNetBanking">Net Banking</label>		&nbsp;	
                    <input type="radio" id="radioCard" name="payment-mode" value="Card" checked/> &nbsp;
                    <label htmlFor="radioCard">Card</label>			
                </div>
                <div>
                    <label className="form-label">Card No</label>
                    <input type="text" className="form-control" placeholder="XXXX-XXXX-XXXX-XXXX" id="cardNo"/>
                </div>
                <div>
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Name" id="name"/>
                </div>
                <div>
                    <label className="form-label">Expiry Date</label>
                    <input type="text" className="form-control" placeholder="MM/YY" id="expiry"/>
                </div>
                <div>
                    <label className="form-label">CCV Code</label>
                    <input type="password" className="form-control" placeholder="---" id="ccv"/>
                </div>
                <hr />
                <div>
                    <Link to="/home" className="btn btn-danger" role="button" id="btnCancel" onClick={processCancel}>Cancel</Link>  &nbsp;&nbsp;
                    <Link to="/dashboard" className="btn btn-primary" role="button" id="btnSubmit"  onClick={processPayment}>Submit</Link>
                </div>

            </div>
        }
        {(paymentStatus === "paid") && 
            <div>
                <br/>
                <button className="btn btn-info" onClick={handleGoBack}>Go Back</button>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        }
    </div>
  )
}
