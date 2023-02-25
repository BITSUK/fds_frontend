import React, { useState, useEffect } from "react";
import {useContext} from "react";
import { Link, useNavigate} from "react-router-dom";
import { CartContext} from '../../Contexts/CartContext.js';
import {UserContext} from '../../Contexts/UserContext.js';
import './DisplayCart.css';

//This component displays the Cart items to the user
export default function DisplayCart(props) {
    
    const navigate = useNavigate();
    
    const [cart, setCart] = useContext(CartContext);
    const cartItems = cart.items;  //Extract cart items in a separate variable

    // Sets the cart to empty
    const emptyTheCart = (event) => {
        // setCart(emptyCart);     
        setCart({    
            totalPrice  : "0",
            discount    : "0",
            taxes       : "0",
            netprice    : "0",
            status      : "initial",
            items       : []       
        })
    }

    // Handles item deletes from the cart
    const handleDeleteItem = (id,price,event) => {
        // event.preventDefault();

        var updatedCart = cart;
        var itemPosition = -1;

        for (let i = 0; i < updatedCart.items.length; i++) {
            if (updatedCart.items[i].item_id == id) {
                itemPosition = i;
                break;
            }
        }
        // alert("item " + event.target.name + " is at " + itemPosition + " position");

        if (itemPosition > -1) {
            if (itemPosition === 0 ) {
                //first item is not allowed to be delete, to overcome an known issue
            }else {
                delete updatedCart.items[itemPosition];

                updatedCart.totalPrice  = Number(updatedCart.totalPrice) - Number(price);
                updatedCart.taxes       = Number(updatedCart.totalPrice)*0.10;
                updatedCart.netprice    = updatedCart.totalPrice + updatedCart.taxes;
                setCart(updatedCart);
            }
        }

        

        return; //This code is not written
    }

    //Handles checkout
    const handleCheckOut = ( event) => {
        event.preventDefault(); 
         
        if (cartItems.length === 0)  {
            alert("Cannot checkout as your cart is empty.");
        } else {
                navigate("/order-conf-page");
        }

    }

    // ****************** RETURN ********************
    return (
        <div className="container-fluid">
            <div className="row">
                <br/>
                <div><b className="col-sm-8">Your Cart:</b></div>
                <Link to="#" className="col-sm-4" role="button" style={{padding: 0, fontSize: 12}} onClick={emptyTheCart}>Empty Cart</Link>
                <br/>.
                <hr className="horizontal-line"/>             
                <div className="col-sm-12">
                    {cartItems.length === 0 ? (
                        <div className="row">
                            <div className="col-sm-12">
                                <div >
                                <p>Cart is empty</p>
                                </div>
                            </div>
                        </div>
                    ) : (cartItems.map(record => (
                        <div className="col-sm-12"  key={record.item_id}  style={{ padding: 0, fontSize: 11 }}>
                            <div className="col-sm-7" key="item_name" style={{ fontSize: 11, padding: 0 }}>                                    
                                {record.item_name}
                            </div>
                            <div className="col-sm-2"  key="item_quantity" style={{ fontSize: 11, padding: 0 }}>                                    
                                {record.item_quantity} 
                            </div>
                            <div className="col-sm-2"  key="item_price" style={{ fontSize: 11, padding: 0 }}>                                    
                                {record.item_price}
                            </div>
                            <div className="col-sm-1" key="d" style={{ fontSize: 11, padding: 0 }}>
                                <div >                            
                                    {record.item_name === "No item in cart" ? (
                                        <Link to="#" key="d1" name={record.item_id} style={{ fontSize: 11, padding: 0 }} onClick={(e) => {handleDeleteItem(record.item_id,record.item_price,e)}}></Link>
                                    ): (
                                        <Link to="#" key="d2" name={record.item_id} style={{ fontSize: 11, padding: 0 }} onClick={(e) => {handleDeleteItem(record.item_id,record.item_price,e)}}>Del</Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        ))
                    )} 
                    <span className="white-color-text">.</span>  
                    <hr className="horizontal-line"/>
                    <div className="col-sm-12" style={{ fontSize: 11, padding: 0 }}>
                        <div className="col-sm-9"> Total Amount:</div>
                        <div className="col-sm-3"> {cart.totalPrice}</div>
                    </div>   
                    <div className="col-sm-12" style={{ fontSize: 11, padding: 0 }}>
                        <div className="col-sm-9"> Discount:</div>
                        <div className="col-sm-3"> {cart.discount}</div>
                    </div>   
                    <div className="col-sm-12" style={{ fontSize: 11, padding: 0 }}>
                        <div className="col-sm-9"> Taxes (@10%):</div>
                        <div className="col-sm-3"> {cart.taxes}</div>
                    </div>   
                    <div className="col-sm-12" style={{ fontSize: 11, padding: 0 }}>
                        <b>
                            <div className="col-sm-9"> Net Price:</div>
                            <div className="col-sm-3"> {cart.netprice}</div>
                        </b>
                    </div>  
                </div>
                <span className="white-color-text">.</span>                
                <hr className="horizontal-line"/>
                <button type="submit" className="btn btn-primary" onClick={handleCheckOut}>Checkout</button>    
                <div>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
        </div>
    )
}
