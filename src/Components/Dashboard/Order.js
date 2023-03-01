import React, {useState} from "react";
import {useContext} from "react";
import { UserContext } from '../../Contexts/UserContext.js';
import './Order.css';

export default function Order(props){
    const [userContext, setUserContext] = useContext(UserContext);	

    //=====================================================================
    // Handle Confirm Order
    //=====================================================================
    const handleConfirmOrder = (event) => {

        event.preventDefault(); 
        
        // Backend server call
        var baseURL     = "http://127.0.0.1:8000/fds/";
        var specificURL = "rest/api/orders/" ;
        var queryString = "?order_id=" + event.target.name;

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

            payload.order_status = '3';         //confirmed
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
                        alert("Order confirmed. To see page refreshed navigate to another page and come back.");
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
        .catch(error => {
            console.log("Error Fetching:" + error);
            alert ("System faced some issue, please try after some time.");
            return;
        });
        return;
    }


    //=====================================================================
    // Handle Reject Order
    //=====================================================================
    const handleRejectOrder = (event) => {

        event.preventDefault(); 
        // Backend server call
        var baseURL     = "http://127.0.0.1:8000/fds/";
        var specificURL = "rest/api/orders/" ;
        var queryString = "?order_id=" + event.target.name;

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

            payload.order_status = '4';         //rejected
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
                        alert("Order rejected. To see page refreshed navigate to another page and come back.");
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
        .catch(error => {
            console.log("Error Fetching:" + error);
            alert ("System faced some issue, please try after some time.");
            return;
        });
        return;
    }

    var order_status = "";
    if (props.order_status === "2") {
        order_status = "Pending";
    } else if (props.order_status === "3") {
        order_status = "Confirmed";
    } else if (props.order_status === "4") {
        order_status = "Rejected";
    } else if (props.order_status === "8") {
        order_status = "Delivered";
    } else {
        order_status = props.order_status;
    }

    return(
        <>
            <div className="container-fluid ">
                <div className="row col-sm-12 bg-info">
                    <div>
                        <div className="col-sm-4">
                            <p><b>Order No: {props.order_id}</b></p>
                            <p>Train: {props.train_no} </p>
                        </div>
                        <div className="col-sm-4">
                            <p>Date: {props.order_date}</p>
                            <p>Coach/Seat No: {props.coach_no}/{props.seat_no}</p>
                        </div>
                        <div className="col-sm-4">
                            <p><b>Status: </b><b className={order_status}>{order_status}</b></p>
                            <p>Station: {props.station_code}</p>
                        </div>
                    </div>
                    <div>
                        {(userContext.role === "restaurant") && (props.order_status === "2") &&
                            <div className="col-sm-12">
                                <button type="submit" name={props.order_id} className="btn btn-primary" onClick={handleConfirmOrder}>Confirm</button>
                                <button type="submit" name={props.order_id} className="btn btn-danger" onClick={handleRejectOrder}>Reject</button>
                            </div>
                        }
                    </div>                    
                </div>                                               
            </div>
        </>
    )    
}
