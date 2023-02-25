import React from "react";
import {Link} from "react-router-dom";

export default function RestaurantMenu(props){

    return(
        <>
			<Link to="/dashboard">Dashboard</Link>
            <Link to="/rest-menu">Rest. Menu Items</Link>
            <Link to="/order-history/rest">Orders History</Link>
            <Link to="/rest-settings">Rest. Settings</Link>
            <Link to="/profile">User Profile</Link>
		</>        
    )
}