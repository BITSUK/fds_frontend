import React, { useState} from "react";
import {useContext} from "react";
import {UserContext} from '../../Contexts/UserContext.js';
import Active_Orders from '../../Data/Orders.json';
import { AlertContext } from '../../Contexts/AlertContext.js';
import Alert from "../Alert/Alert.js";
import Order from '../Dashboard/Order.js';
import './OrderHistory.css';

export default function RestOrderHistory(){

    const [userContext, setUserContext] = useContext(UserContext);
    const [alertMessage, setAlert] = useContext(AlertContext);
    const [query, setQuery] = useState("");

    const users_active_orders_temp = Active_Orders.filter(e => ((e.user_id == userContext.uid)&&(e.order_status != "Pending")));
    const users_active_orders = users_active_orders_temp.filter(e => (e.order_no.toLowerCase().includes(query.toLowerCase())))

    return(
        <>  
        <Alert/>
        <h2>Previous Orders: </h2>
            <div> 
                <div>
                    <label> Search Order No:</label>
                    <input type="text" className="form-control" id="Search" placeholder="Search Menu..." onChange={e => setQuery(e.target.value)} />
                </div>  

                {users_active_orders.length === 0 ? (
                    <div>
                        <p className="order">No active orders.</p>
                    </div>
                ) : (   users_active_orders.map(record => (
                            <div >                               
                                <div className="order">
                                    {/* <br/> */}
                                    {/* <p key={record.order_no}>
                                        <p><b>Order No: {record.order_no}</b></p>
                                        <p>Date: {record.delivery_date}</p>
                                        <p>Station: {record.delivery_station}</p>
                                        <p>Train/Coach/Seat No: {record.train_no}/{record.coach_no}/{record.seat_no}</p>
                                        <p >Status: <b className={record.order_status}>{record.order_status}</b></p>
                                    </p>  */}
                                    <br/>                               
                                    <Order 
                                        order_no={record.order_no} 
                                        delivery_date={record.delivery_date}  
                                        delivery_station={record.delivery_station} 
                                        train_no={record.train_no}  
                                        train_name={record.train_name}   
                                        coach_no={record.coach_no}       
                                        seat_no={record.seat_no}    
                                        order_status={record.order_status}                                          
                                    />
                                </div>
                            </div>
                        ))
                )}
            </div>
        </>
    )    
}
