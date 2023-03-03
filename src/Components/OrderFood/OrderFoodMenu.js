import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import Restaurants from '../../Data/Restaurants.json';
import './OrderFoodMenu.css';
import {useContext} from "react";
import { useParams, useSearchParams  } from "react-router-dom";
import { CartContext, emptyCart} from '../../Contexts/CartContext.js';
import { Button } from "react-bootstrap";
import Alert from "../Alert/Alert.js";
import {UserContext} from '../../Contexts/UserContext.js';

export default function OrderFoodMenu() {
    const [userContext, setUserContext] = useContext(UserContext);
    const inpParms = useParams();
    const [inpSearchParms,setInpSearchParms] = useSearchParams();
    const [query, setQuery] = useState("");
    const [vegFilter, setVegFilter] = useState("Veg");
    const [nonVegFilter, setNonVegFilter] = useState("Non-Veg");
    const [cart, setCart] = useContext(CartContext);
    const navigate = useNavigate();

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

    //fetch menu items
    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch('http://127.0.0.1:8000/fds/rest/api/menuitems/');
        const data = await response.json();
        //console.log("API Response:" + data.results);
        setRestMenu(data.results);
        };

        fetchData();
    }, []);

    //Search Restaurant JSON 
    const filteredRestaurants = Restaurants.filter(e => (e.rest_id.toLowerCase().includes(inpParms["rest_id"].toLowerCase())));
    // const restMenuItems = filteredRestaurants[0].menu_item;

    //Get Restaurant Menu List
    const restMenuItems = restMenu;
    const filteredMenuItems0 = restMenuItems.filter(e => (e.rest_id.toLowerCase().includes(inpParms["rest_id"].toLowerCase())));
    const filteredMenuItems1 = filteredMenuItems0.filter(e => (e.item_name.toLowerCase().includes(query.toLowerCase())))
    const filteredMenuItems2 = filteredMenuItems1.filter(e => (applyVegFilter(e)));

    //update restaurant details in user context
    var updatedUserContext = userContext;
    updatedUserContext.rest = inpParms["rest_id"];
    updatedUserContext.restName = filteredRestaurants[0].rest_name;
    setUserContext(updatedUserContext);

    //set filter states
    const processCheckBox = () => {
        var inpV = document.getElementById("btnVeg").checked == true ? "Veg" : "$";
        var inpNV = document.getElementById("btnNonVeg").checked == true ? "Non-Veg" : "$";
        setVegFilter(inpV);
        setNonVegFilter(inpNV);
    }  

    //set select based on filter criteria
    function applyVegFilter(item){
        if (vegFilter === "Veg" && item.item_type == "0") {
            return item;
        } else if (nonVegFilter === "Non-Veg" && item.item_type == "1") {
            return item;
        }
    }
    
    //add item to cart using function
    const addToCart = (id, name, price, event) => {
        // alert ("clicked " + id + " " + name + " " + price);
        var tempCartItem = cart.items;

        tempCartItem[tempCartItem.length] = {
                item_id : id.toString(),
                item_name : name,
                item_price : price.toString(),
                item_quantity : "1"
        }
        
        var updatedCart = cart;
        updatedCart.items       = tempCartItem;
        // updatedCart.totalPrice  = Number(updatedCart.totalPrice) + Number(price);
        // updatedCart.netprice    = Number(updatedCart.netprice) + Number(price);
        // updatedCart.taxes       = Number(updatedCart.taxes) + Number(price)*0.10;
        updatedCart.totalPrice  = Number(updatedCart.totalPrice) + Number(price);
        updatedCart.taxes       = Number(updatedCart.totalPrice)*0.10;
        updatedCart.taxes = parseInt(updatedCart.taxes.toFixed())
        updatedCart.netprice    = updatedCart.totalPrice + updatedCart.taxes;
        setCart(updatedCart);

    }

    // //add to cart using url 
    // if ((inpSearchParms.get("action") != null) && (inpSearchParms.get("action") === 'add')){
    //     // addToCart(inpParms["menu_id"],inpSearchParms.get("menuName"),inpSearchParms.get("menuPrice"));
        
    //     var tempCartItem = cart.items;
    //     var tempPrice = 0;

    //     // code is complex as we are facing an issue
    //     if (tempCartItem.length > 0) {
    //         if (tempCartItem[tempCartItem.length - 1].item_id != inpParms["menu_id"] ) {
    //             tempCartItem[tempCartItem.length] = {
    //                 item_id : inpParms["menu_id"],
    //                 item_name : inpSearchParms.get("menuName"),
    //                 item_price : inpSearchParms.get("menuPrice"),
    //                 item_quantity : "1"
    //             }
    //             tempPrice = inpSearchParms.get("menuPrice");

    //         }            
    //     } else {
    //         tempCartItem[tempCartItem.length] = {
    //             item_id : inpParms["menu_id"],
    //             item_name : inpSearchParms.get("menuName"),
    //             item_price : inpSearchParms.get("menuPrice"),
    //             item_quantity : "1"
    //         }
    //         tempPrice = inpSearchParms.get("menuPrice");
    //     }

    //     var updatedCart = cart;
    //     updatedCart.items = tempCartItem;
    //     updatedCart.totalPrice = Number(updatedCart.totalPrice) + Number(tempPrice);
    //     updatedCart.netprice = Number(updatedCart.netprice) + Number(tempPrice);
    //     updatedCart.taxes = Number(updatedCart.taxes) + Number(tempPrice)*0.10;

    //     setCart(updatedCart);
    //     var url = "/order-food/restaurant/" + userContext.restaurant;
    //     navigate(url);

    //     // alert("Item added successfully");
    // }

    //**************** RETURN RESPONSE ***************
    return (
        <>
            <Alert />
        
            <div className="container-fluid">
                <div className="row content">
                    <div>Menu Items of <b>{updatedUserContext.restaurantName}</b></div>
                    <br/>
                    <div className="col-sm-12">
                        <div >
                            <input type="text" className="form-control" id="Search" placeholder="Search Menu..." onChange={e => setQuery(e.target.value)} />
                        </div>  
                        <br/>
                            <div>
                                <span>Apply Filter: </span>&nbsp;&nbsp;
                                <input type="checkbox" id="btnVeg" name="menu-type" value="Veg" defaultChecked onClick={processCheckBox}/> &nbsp;
                                <label htmlFor="btnVeg">Veg</label>	&nbsp;
                                <input type="checkbox" id="btnNonVeg" name="menu-type" value="Non-Veg" defaultChecked onClick={processCheckBox}/> &nbsp;
                                <label htmlFor="btnNonVeg">Non-Veg</label>			
                                <hr />
                            </div> 
                        <br/>
                        {filteredMenuItems2.length === 0 ? (
                            <div className="row">
                            <div className="col-sm-8">
                                <br />
                                <div >
                                <p>No item found</p>
                                </div>
                            </div>
                            </div>
                        ) : (filteredMenuItems2.map(record => (
                            <div className="table-row">
                                <div className="col-sm-6">                                    
                                    {record.item_name}
                                </div>
                                <div className="col-sm-1">                                    
                                    {record.item_rate} 
                                </div>
                                <div className="col-sm-2">                                    
                                    {record.item_type}
                                </div>
                                <div className="col-sm-2">
                                    <div >                            
                                    {/* <Link to={`/order-food/restaurant/${userContext.restaurant}/${record.menu_id}?action=add&menuName=${record.menu_name}&menuPrice=${record.menu_price}`} key={record.menu_id}>Add</Link> */}
                                    {/* <Link to="#" key={record.menu_id} id={record.menu_id} name={record.menu_name}  price={record.menu_price} onClick={addToCart}>Add</Link> */}
                                    <Link to="#" key={record.menu_id} onClick={(e) => addToCart(record.menu_id,record.item_name,record.item_rate,e)}>Add</Link>
                                    </div>
                                </div>
                            </div>
                            ))
                        )}
                    
                    </div>
                    .<br/>
                    <br/>
                </div>
            </div>
        </>
    );
}
