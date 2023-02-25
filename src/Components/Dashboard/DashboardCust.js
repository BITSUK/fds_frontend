import React from "react";
import Alert from "../Alert/Alert.js";
import ActiveOrders from './ActiveOrders.js';
import './Dashboard.css';


export default function DashboardCust(){

    return(
        <>
            <Alert />
            <h2 className="no-margin">Customer Dashboard</h2>
            <hr className="horizontal-line"/>
            <ActiveOrders/>
        </>
    )    
}
