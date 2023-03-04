import React, { useState, useEffect } from "react";
import {useContext} from "react";
import { Link, useNavigate} from "react-router-dom";
import { CartContext, emptyCart} from '../../Contexts/CartContext.js';
import {UserContext} from '../../Contexts/UserContext.js';
import './DisplayCart.css';

// =================================================================================================
// This component displays the Cart items to the user
// =================================================================================================
export default function DisplayCart(props) {
    
    const navigate = useNavigate();
    const [userContext, setUserContext] = useContext(UserContext);
    
    const [cart, setCart] = useContext(CartContext);
    const cartItems = cart.items;  

    // =======================
    // Sets the cart to empty
    // =======================
    const emptyTheCart = (event) => {
        setCart(emptyCart);     
    }

    // ======================================
    // Handles item deletes from the cart
    // ======================================
    const handleDeleteItem = (event) => {
            return; //This code is not written
    }

    // ======================================
    // Handles checkout
    // ======================================
    const handleCheckOut = (event) => {
        event.preventDefault();  
        if (cartItems.length === 0)  {
            alert("Cannot checkout as your cart is empty.");
        } else {
            navigate("/order-conf-page");
        }

    }

	// *******************************************************************
    // *********          RETURN RESPOSNE                         ********
    // *******************************************************************
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <br/>
                    <div className="col-sm-8">
                        <b>Your Cart:</b>
                    </div>
                    <div className="col-sm-4">
                        <Link to="#" role="button" style={{padding: 0}} onClick={emptyTheCart}>Empty Cart</Link>
                    </div>
                </div>
                <br/>.
                <hr className="horizontal-line"/>             
                <div className="col-sm-12">
                    <br/>
                    {cartItems.length === 0 ? (
                        <div className="row">
                            <div className="col-sm-12">
                                <div >
                                <p>Cart is empty</p>
                                </div>
                            </div>
                        </div>
                    ) : (cartItems.map(record => (
                        <div className="col-sm-12"    style={{ padding: 0}}>
                            <div className="col-sm-7" style={{ padding: 0 }}>                                    
                                {record.item_name}
                            </div>
                            <div className="col-sm-2" style={{ padding: 0 }}>                                    
                                {record.item_quantity} 
                            </div>
                            <div className="col-sm-2" style={{ padding: 0 }}>                                    
                                {record.item_price}
                            </div>
                            <div className="col-sm-1" style={{ padding: 0 }}>
                                <div >                            
                                    {record.item_name === "No item in cart" ? (
                                        <Link to="#" style={{ padding: 0 }} onClick={handleDeleteItem}></Link>
                                    ): (
                                        <Link to="#" style={{ padding: 0 }} onClick={handleDeleteItem}>Del</Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        ))
                    )} 
                    <span className="white-color-text">.</span>  
                    <hr className="horizontal-line"/>
                    <div className="col-sm-12" style={{padding: 0 }}>
                        <div className="col-sm-9"> Total Amount:</div>
                        <div className="col-sm-3"> {cart.totalPrice}</div>
                    </div>   
                    <div className="col-sm-12" style={{padding: 0 }}>
                        <div className="col-sm-9"> Discount:</div>
                        <div className="col-sm-3"> {cart.discount}</div>
                    </div>   
                    <div className="col-sm-12" style={{padding: 0 }}>
                        <div className="col-sm-9"> Taxes:</div>
                        <div className="col-sm-3"> {cart.taxes}</div>
                    </div>   
                    <div className="col-sm-12" style={{padding: 0 }}>
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
                    .<dr/>
                    <dr/>
                    <dr/>
                </div>
            </div>
        </div>
    )
}
