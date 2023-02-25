import React from "react";
import './RestMenu.css';
import Restaurants from '../../Data/Restaurants.json';
import {Link} from "react-router-dom";
import { useContext, useState } from "react";
import {UserContext} from '../../Contexts/UserContext.js';
import Alert from "../Alert/Alert.js";

function MenuItem(props) {

    // Handles Update 
    const handleItemUpdate = (event) => {
        event.preventDefault(); 
        alert("Item Updated");
    }
    // Handles Delete 
    const handleItemDelete = (event) => {
        event.preventDefault(); 
        alert("Item Deleted (placeholder message)");
    }

    return (
        <>
            <tr>
                <td>{props.itm_id}</td>
                <td><input type="text" id={props.itm_id + "-nm"} value= {props.itm_name} /> </td>
                <td><input type="text" id={props.itm_id + "-ty"} value= {props.itm_type} /> </td>
                <td><input type="text" id={props.itm_id + "-pr"} value= {props.itm_price} /> </td>
                <td scope="row">
                    <Link to="#" onClick={handleItemUpdate}> Update </Link> /
                    <Link to="#" onClick={handleItemDelete}> Delete </Link>
                </td>
            </tr>            
        </>
    );
}

export default function RestMenu(){
    const [userContext, setUserContext] = useContext(UserContext);
    const [query, setQuery] = useState("");

    //Search in Stations JSON
    const RestaurantDetails = Restaurants.filter(e => (e.user_id.includes(userContext.uid)));
    const RestaurantDetailsMenu = RestaurantDetails[0].menu_item.filter(e => (e.menu_name.toLowerCase().includes(query.toLowerCase())))


    //************ RETURN RESPONSE ************
    return(
        <>
            <Alert />
            <div> 
				<div>                
				    <b>Restaurant : {RestaurantDetails[0].rest_name}</b>
                </div>
                <div>
                    <br/>
                    <input type="text" className="form-control" id="Search" placeholder="Search Menu..." onChange={e => setQuery(e.target.value)} />
                </div>
                <hr/>                
                <table class="table table-dark">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Menu Item</th>
                    <th scope="col">Type</th>
                    <th scope="col">Price</th>
                    <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {RestaurantDetailsMenu.length === 0 ? (
                        <div>
                            <p className="table-row"><b>"No menu item found"</b></p>
                        </div>
                    ) : ( RestaurantDetailsMenu.map(record => ( 
                            <MenuItem 
                                itm_id={record.menu_id} 
                                itm_name={record.menu_name} 
                                itm_type={record.menu_type}
                                itm_price={record.menu_price}  
                            />
                        ))
                    )}
                </tbody>
                </table>   
			</div>
        </>
    )    
}
