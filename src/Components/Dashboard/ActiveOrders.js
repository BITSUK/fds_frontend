import React from "react";
import {useContext} from "react";
import {UserContext} from '../../Contexts/UserContext.js';
import Active_Orders from '../../Data/Orders.json';
import Order from './Order.js';
import './ActiveOrders.css';

export default function ActiveOrders(){

    const [userContext, setUserContext] = useContext(UserContext);

    //Active order filter
    const users_active_orders = Active_Orders.filter(e => 
            (e.user_id == userContext.uid) && (e.order_status == "Pending") );

    return(
        <>
            <div> 
                {users_active_orders.length === 0 ? (
                    <div>
                        <p className="order"><b>None</b></p>
                    </div>
                ) : (   users_active_orders.map(record => (
                            <div >  
                                <br/>                             
                                <div className="order">
                                    {/* <br/>
                                    <p key={record.order_no}>
                                        <p><b>Order No: {record.order_no}</b></p>
                                        <p>Date: {record.delivery_date}</p>
                                        <p>Station: {record.delivery_station}</p>
                                        <p>Train/Coach/Seat No: {record.train_no}/{record.coach_no}/{record.seat_no}</p>
                                        <p><b className={record.order_status}>Status: {record.order_status}</b></p>
                                    </p> 
                                    <br/>   */}
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
                <br/>

            </div>
        </>
    )    
}
