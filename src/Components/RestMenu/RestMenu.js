import React, { useState, useEffect, useContext } from "react";
import {UserContext} from '../../Contexts/UserContext.js';
import './RestMenu.css';
import Restaurants from '../../Data/Restaurants.json';
import {Link} from "react-router-dom";
import Alert from "../Alert/Alert.js";

function MenuItem(props) {

    // Handles Update 
    const handleItemUpdate = (event) => {
        event.preventDefault(); 

        //Item Name
        var fld = document.getElementById(props.itm_id + "-nm").value;
        if (fld === ""){
            alert("Item name not mentioned.");
            document.getElementById(props.itm_id + "-nm").focus();
            return;  
        }

        //Item Price
        fld = document.getElementById(props.itm_id + "-ty").value;
        if ((fld != "Veg") && (fld != "Non-Veg")){
            alert("Invalid value.");
            document.getElementById(props.itm_id + "-ty").focus();
            return;  
        }

        //Item Price
        fld = document.getElementById(props.itm_id + "-pr").value;
        if ((fld.match("[0-9]") === null) || (fld.match("[%@#$]") != null) || (fld.match("[A-Z]") != null)|| (fld.match("[a-z]") != null)) {
            alert("Item price invalid.");
            document.getElementById(props.itm_id + "-pr").focus();
            return;  
        }


        // Backend server call
        var baseURL     = "http://127.0.0.1:8000/fds/";
        var specificURL = "rest/api/menuitems/" ;
        var queryString = "?menu_id=" + event.target.name;

        var url = baseURL + specificURL + queryString; 

        fetch(url)
        .then(response => {
                if(response.status === 200)  {
                    return response.json();     
                } 
                // else some error has happened
                return response.json().then(response => {
                    throw new Error(response.error)
                })
            }
        )
        .then(function(data) {
            var payload = data.results[0];
            
            var url = baseURL + specificURL + payload.id; 

            payload.item_name = document.getElementById(props.itm_id + "-nm").value;
            payload.item_type = (document.getElementById(props.itm_id + "-ty").value === "Veg")? "0" : "1";
            payload.item_rate = document.getElementById(props.itm_id + "-pr").value;
            delete payload.id;
            
            var requestOptions = {
                method: 'PUT',
                headers: {
                    'Accept'        : 'application/json',
                    'Content-Type'  : 'application/json',
                },
                body: JSON.stringify(payload),
            }
            // ====
            fetch(url, requestOptions)
            .then(response => {
                    if(response.status === 200)  {
                        alert("Item updated.");
                        return response.json();     
                    } 
                    // else some error has happened
                    return response.json().then(response => {
                        throw new Error(response.error)
                    })
                }
            )
            .then(function(data) {
                return;
            })
            .catch(error => {
                console.log("Error Updating:" + error);
                alert ("Update unsuccessful, please try after some time.");
                return;
            });
            // ====
            return;
        })
        .catch(error => {
            console.log("Error Fetching:" + error);
            alert ("System faced some issue, please try after some time.");
            return;
        });
        return;
    }


    // Handles Delete 
    const handleItemDelete = (event) => {
        event.preventDefault(); 

        // Backend server call
        var baseURL     = "http://127.0.0.1:8000/fds/";
        var specificURL = "rest/api/menuitems/" ;
        var queryString = "?menu_id=" + event.target.name;

        var url = baseURL + specificURL + queryString; 

        fetch(url)
        .then(response => {
                if(response.status === 200)  {
                    return response.json(); 
                } 
                // else some error has happened
                return response.json().then(response => {
                    throw new Error(response.error)
                })
            }
        )
        .then(function(data) {
            var payload = data.results[0];
            
            var url = baseURL + specificURL + payload.id; 

            var requestOptions = {
                method: 'DELETE',
                headers: {
                    'Accept'        : 'application/json',
                    'Content-Type'  : 'application/json',
                },
                body: JSON.stringify(payload),
            }
            // ====
            fetch(url, requestOptions)
            .then(response => {
                    if(response.status === 204)  {
                        alert("Item deleted. Refresh manually");
                        return;     
                    } 
                    // else some error has happened
                    return response.json().then(response => {
                        throw new Error(response.error)
                    })
                }
            )
            .catch(error => {
                console.log("Error Updating:" + error);
                alert ("Update unsuccessful, please try after some time.");
                return;
            });
            // ====
            return;
        })
        .catch(error => {
            console.log("Error Fetching:" + error);
            alert ("System faced some issue, please try after some time.");
            return;
        });
        return;
    }

    var i_type = "";
    if (props.itm_type === "0") {
        i_type = "Veg";
    } else  {
        i_type = "Non-Veg";
    }

    return (
        <>
            <tr>
                {/* <td id={props.itm_id + "-id"}>{props.itm_id}</td> */}
                <td><input type="text" id={props.itm_id + "-nm"} defaultValue= {props.itm_name} /> </td>
                <td><input type="text" id={props.itm_id + "-ty"} defaultValue= {i_type} /> </td>
                <td><input type="text" id={props.itm_id + "-pr"} defaultValue= {props.itm_price} /> </td>
                {/* <td><input type="text" id={props.itm_disc + "-pd"} defaultValue= {props.itm_disc} /> </td> */}
                {/* <td><input type="text" id={props.itm_rating + "-pi"} defaultValue= {props.itm_rating} /> </td> */}
                <td scope="row">
                    <Link to="#" onClick={handleItemUpdate} name={props.itm_id} > Update </Link> /
                    <Link to="#" onClick={handleItemDelete} name={props.itm_id} > Delete </Link>
                </td>
            </tr>            
        </>
    );
}

export default function RestMenu(){
    const [userContext, setUserContext] = useContext(UserContext);
    const [query, setQuery] = useState("");
    var RestaurantDetailsMenu = [];

    //fetch restaurant name and update context
    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch('http://127.0.0.1:8000/fds/rest/api/restaurants/?rest_id=' + userContext.rest);
        const data = await response.json();
        // console.log(data.results);
        if (data.results.length > 0 ) {
            var updatedUserContext = userContext;
            updatedUserContext.restName =data.results[0].rest_name;
            setUserContext(updatedUserContext);
        }
        };

        fetchData();
    }, []);

    const [restMenu, setRestMenu] = useState([{
        "id": 0,
        "menu_id": "",
        "rest_id": "",
        "item_name": "",
        "item_desc": "",
        "item_type": "",
        "item_rate": "0.00",
        "item_discount": "0.00",
        "item_rating": 2,
        "item_status": ""
    }]);

    //fetch trains
    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch('http://127.0.0.1:8000/fds/rest/api/menuitems/');
        const data = await response.json();
        //console.log("API Response:" + data.results);
        setRestMenu(data.results);
        };

        fetchData();
    }, []);


    //Search in Stations JSON
    const RestaurantDetails = restMenu.filter(e => (e.rest_id.includes(userContext.uid)));
    // const RestaurantDetails = Restaurants.filter(e => (e.rest_id.includes(userContext.uid)));
    
    if (RestaurantDetails.length > 0 ) {
        RestaurantDetailsMenu = RestaurantDetails;
    //    RestaurantDetailsMenu = RestaurantDetails[0].filter(e => (e.item_name.toLowerCase().includes(query.toLowerCase())))
    }


    //************ RETURN RESPONSE ************
    return(
        <>
            <Alert />
            <div> 
				<div>                
				    {/* <b>Restaurant : {RestaurantDetails[0].rest_name}</b> */}
                    <b>Restaurant : {userContext.restName}</b>
                    
                </div>
                {/* <div>
                    <br/>
                    <input type="text" className="form-control" id="Search" placeholder="Search Menu..." onChange={e => setQuery(e.target.value)} />
                </div> */}
                <hr/>                
                <table className="table table-dark">
                <thead>
                    <tr>
                    {/* <th scope="col">Id</th> */}
                    <th scope="col">Menu Item</th>
                    <th scope="col">Type</th>
                    <th scope="col">Price</th>
                    {/* <th scope="col">Discount</th> */}
                    {/* <th scope="col">Rating</th> */}
                    <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {RestaurantDetailsMenu.length === 0 ? (
                        <div>
                            <p className="table-row"><b>No menu item found.</b></p>
                        </div>
                    ) : ( RestaurantDetailsMenu.map(record => ( 
                            <MenuItem 
                                itm_id={record.menu_id} 
                                itm_name={record.item_name} 
                                itm_desc={record.item_desc} 
                                itm_type={record.item_type}
                                itm_price={record.item_rate}  
                                itm_disc={record.item_discount}  
                                itm_rating={record.item_rating}  
                            />
                        ))
                    )}
                </tbody>
                </table>   
			</div>
        </>
    )    
}
