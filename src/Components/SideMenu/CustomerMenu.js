import React from "react";
import {Link} from "react-router-dom";

export default function CustomerMenu(props){

     return(
        <>
            <Link to="/dashboard">Dashboard</Link>
			<Link to="/order-food">Order Food</Link>
            <Link to="/order-food/cart">Cart</Link>
            <Link to="/order-history/cust">Order History</Link>
            <Link to="/profile">User Profile</Link>
		</>                
    )
}