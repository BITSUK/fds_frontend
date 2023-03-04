import React, { useState, useEffect } from "react";
import {useContext} from "react";
import {UserContext} from '../../Contexts/UserContext.js';
import Order from './Order.js';
import './ActiveOrders.css';

export default function ActiveOrders(){

    const [userContext, setUserContext] = useContext(UserContext);
    const [query, setQuery] = useState("");
    const [ordersData, setOrdersData] = useState([{
        "order_id": "",
        "rest_id": "",
        "order_date": "",
        "delivery_date": "",
        "user_id": "",
        "station_code": "",
        "train_no": "",
        "coach_no": "",
        "seat_no": 0,
        "order_status": "",
        "contact_no": "",				
        "item_count": 0,
        "total_amount": "",
        "total_discount": "",
        "tax": "",
        "net_amount": ""
    }]);

    // -------------------------
    // Fetch orders
    // -------------------------
    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch('http://127.0.0.1:8000/fds/rest/api/orders/');
        const data = await response.json();
        console.log("API Response:" + data.results);
        setOrdersData(data.results);
        };

        fetchData();
    }, []);

    // Order filtering
    var users_active_orders = "";
    if (userContext.role == "restaurant") {
        users_active_orders = ordersData.filter(e => (e.rest_id == userContext.uid) && ((e.order_status == "0")||(e.order_status == "2")||(e.order_status == "3")||(e.order_status == "4")));
    } else {
        users_active_orders = ordersData.filter(e => (e.user_id == userContext.uid) && ((e.order_status == "0")||(e.order_status == "2")||(e.order_status == "3")||(e.order_status == "4")));
    }
    users_active_orders = users_active_orders.filter(e => (e.order_id.toLowerCase().includes(query.toLowerCase())))

    // *******************************************************************
    // *********          RETURN RESPOSNE                         ********
    // *******************************************************************
    return(
        <>
            <div>
                <br/>
                <label> Search Order No:</label>
                <input type="text" className="form-control" id="Search" placeholder="Search Menu..." onChange={e => setQuery(e.target.value)} />
            </div> 
            <div> 
                {users_active_orders.length === 0 ? (
                    <div>
                        <p className="order"><b>No Active Orders</b></p>
                    </div>
                ) : (   users_active_orders.map(record => (
                            <div >  
                                <br/>                             
                                <div className="order">
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
