import React from "react";
import {useContext} from "react";
import {UserContext} from '../../Contexts/UserContext.js';
import Active_Orders from '../../Data/Orders.json';
import { AlertContext } from '../../Contexts/AlertContext.js';
import Alert from "../Alert/Alert.js";
import Order from '../Dashboard/Order.js';
import './OrderHistory.css';

export default function OrderHistoryCust(){

    const [userContext, setUserContext] = useContext(UserContext);
    const [alertMessage, setAlert] = useContext(AlertContext);

    //History Order filter
    const users_active_orders = Active_Orders.filter(e => (e.user_id == userContext.uid) && ((e.order_status == "Delivered")||(e.order_status == "Cancelled")));

    return(
        <>
            <Alert/>
            <h2>Previous Orders: </h2>
            <div> 
                {users_active_orders.length === 0 ? (
                    <div>
                        <p className="order">No active orders.</p>
                    </div>
                ) : (   users_active_orders.map(record => (
                            <div >                               
                                <div className="order">
                                    {/* <br/>
                                    <p key={record.order_id}>
                                        <p><b>Order No: {record.order_id}</b></p>
                                        <p>Date: {record.order_date}</p>
                                        <p>Station: {record.station_code}</p>
                                        <p>Train/Coach/Seat No: {record.train_no}/{record.coach_no}/{record.seat_no}</p>
                                        <p >Status: <b className={record.order_status}>{record.order_status}</b></p>
                                    </p>  */}
                                    <br/>                               
                                    <Order 
                                        order_id={record.order_id} 
                                        order_date={record.order_date}  
                                        station_code={record.station_code} 
                                        train_no={record.train_no}                                          
                                        coach_no={record.coach_no}       
                                        seat_no={record.seat_no}    
                                        order_status={record.order_status}                                          
                                    />
                                </div>
                            </div>
                        ))
                )}
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        </>
    )    
}
