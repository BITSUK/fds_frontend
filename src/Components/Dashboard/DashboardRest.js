import React from "react";
import ActiveOrders from './ActiveOrders.js';
import Alert from "../Alert/Alert.js";
import './Dashboard.css';


export default function Dashboard(){

    return(
        <>
            <Alert />
            <h2 className="no-margin">Restaurant Dashboard</h2>
            <hr className="horizontal-line"/>
            <ActiveOrders/>
        </>
    )    
}
