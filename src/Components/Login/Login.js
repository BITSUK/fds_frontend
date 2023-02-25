import React from 'react';
import './Login.css';
import {Link, useNavigate } from "react-router-dom";
import {useContext} from "react";
import { UserContext } from '../../Contexts/UserContext.js';
import { AlertContext } from '../../Contexts/AlertContext.js';
import { CartContext, emptyCart} from '../../Contexts/CartContext.js';
import Alert from "../Alert/Alert.js";



export default function Login(props) {
    
    const [userContext, setUserContext] = useContext(UserContext);	
    const [cart, setCart] = useContext(CartContext);

    // Obtain alert context and define a local alert object
    const [alertMessage, setAlert] = useContext(AlertContext);
    const a = { alertType: "default", alertMessage: "" }     
    
    const navigate = useNavigate();

    // Handles Login 
    const handleLogin = (event) => {

        event.preventDefault();               

        // Obtain the userid and password entered by user on screen
        var inputUserId = document.getElementById("loginFormUserId").value;        
        var inputPassword = document.getElementById("loginFormPassword").value;
        var inputRole = document.getElementById("radioCustomer").checked == true ? "customer" : "restaurant";
        
        //Validate the user id and password
        if (inputUserId === "" || inputPassword === "") {
            a.alertMessage = "Userid or password not entered";
            a.alertType = "error";
            setAlert(a);

        } else if ((inputUserId.length == 6) &&  (inputPassword.length >=8) && (inputUserId.substr(0,3) == 'UID')) {
            var uidN =  inputUserId.substr(3,3);
            let loginURL = "http://localhost:3004/users/" + uidN;
            
            // API call to jason-server 
            fetch(loginURL)                         // returns Promise object
            .then(response => response.json())      // convert response to json
            .then(function(data) {                  // process response
                console.log('API Response: ');
                console.log(data);                

                if ((data.id === uidN) && ((data.userRoles[0] == inputRole) || (data.userRoles[1] == inputRole))) {
                    setUserContext({
                        uid: data.userId,
                        name: data.userName,
                        mobile: "9965532235",
                        email: "xyz@gmail.com",
                        address: "Delhi",
                        role: inputRole,
                        isLoggedIn: true,
                        train: "",
                        trainName : "",
                        station: "",
                        stationName: "",
                        jdate: "",
                        restaurant : "",
                        restaurantName: ""

                    })
                    
                    a.alertMessage = "";
                    a.alertType = "default";
                    setAlert(a);                    
                    
                    alert("Login Successful");

                    // (cart.totalPrice === "0") ? navigate('/dashboard') : navigate('/order-conf-page'); 
                    navigate('/dashboard');
                } else {
                    a.alertMessage = "Userid or password not valid, please try again.";
                    a.alertType = "error";
                    setAlert(a); 
                }
               
            })
            .catch(error => {
                 console.log ("Error calling /login endpoint: " + error);
            });

        } else {
            a.alertMessage = "Userid or password not valid, try again.";
            a.alertType = "error";
            setAlert(a);
        }
    }    

    //*********************** RETURN ******************************
    return (
    <div className="no-margin">
        <Alert />
        <div className="login-form-container">   
            <br/>
            .    
            <div className="login-form-components">
				<input type="radio" id="radioCustomer" name="role-type" value="customer" defaultChecked/> &nbsp;
                <label htmlFor="radioCustomer">Customer</label>	&nbsp;
				<input type="radio" id="radioRestaurant" name="role-type" value="restaurant"/> &nbsp;
                <label htmlFor="radioRestaurant">Restaurant</label>			
			</div>                 
            <div className="login-form-components">
                <label htmlFor="loginFormUserId" className="form-label">User Id</label>
                <input type="text" className="form-control" id="loginFormUserId" placeholder="userid"/>
            </div>
            <div className="login-form-components">
                <label htmlFor="loginFormPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="loginFormPassword" placeholder="password"/>
            </div>
            
            <div className="login-form-components">
                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
                &nbsp;&nbsp;                
                <Link to="/forgot-password" className="btn btn-info" role="button">Forgot Password</Link>
            </div>
            <br />
            <div>Click <Link to="/register"><b>here</b></Link> to register.</div>
            <br />
            <br />
            <br />
            <br />
        </div>
    </div>
  )

 
}
