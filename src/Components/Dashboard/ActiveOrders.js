import React from "react";
import {useContext} from "react";
import {UserContext} from '../../Contexts/UserContext.js';
import Active_Orders from '../../Data/Orders.json';
import Order from './Order.js';
import './ActiveOrders.css';

export default function ActiveOrders(){

    const [userContext, setUserContext] = useContext(UserContext);

    //Active order filter
    var users_active_orders = "";
    if (userContext.role == "restaurant") {
        users_active_orders = Active_Orders.filter(e => (e.rest_id == userContext.uid) && ((e.order_status == "Pending")||(e.order_status == "Confirmed")));
    } else {
        users_active_orders = Active_Orders.filter(e => (e.user_id == userContext.uid) && ((e.order_status == "Pending")||(e.order_status == "Confirmed")));
    }

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
                                    <p key={record.order_id}>
                                        <p><b>Order No: {record.order_id}</b></p>
                                        <p>Date: {record.order_date}</p>
                                        <p>Station: {record.station_code}</p>
                                        <p>Train/Coach/Seat No: {record.train_no}/{record.coach_no}/{record.seat_no}</p>
                                        <p><b className={record.order_status}>Status: {record.order_status}</b></p>
                                    </p> 
                                    <br/>   */}
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

            </div>
        </>
    )    
}
